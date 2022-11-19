import Spinner from "@/components/UI/Spinner";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import * as Sentry from "@sentry/nextjs";

interface IKakaoProps {
  accessToken: string;
  refreshToken: string;
}

const Kakao = ({ accessToken, refreshToken }: IKakaoProps) => {
  const router = useRouter();

  useEffect(() => {
    document.cookie = `accessToken=${accessToken}; path=/;`;
    document.cookie = `refreshToken=${refreshToken}; path=/;`;

    router.push("/");
  }, []);

  return <Spinner />;
};

export default Kakao;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { code },
  } = context;

  console.log("@@");
  console.log(code);
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/v1/auth/`,
      {
        token: code,
        type: "kakao",
      }
    );

    const {
      data: { access_token: accessToken, refresh_token: refreshToken },
    } = resp;

    return {
      props: {
        accessToken,
        refreshToken,
      },
    };
  } catch (e) {
    Sentry.setTag("api", "kakao-login");
    Sentry.captureException(e);
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
};
