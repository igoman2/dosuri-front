import { GetServerSidePropsResult, NextPageContext } from "next";
import { getCookie } from "cookies-next";

export type ServerProps<
  P extends { [key: string]: any } = { [key: string]: any }
> = (context: NextPageContext) => Promise<GetServerSidePropsResult<P>>;

export const withAuthentication =
  (fn: ServerProps) => async (context: NextPageContext) => {
    const { req, res } = context;
    const accessToken = getCookie("accessToken", { req, res });

    if (!accessToken) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    return await fn(context);
  };
