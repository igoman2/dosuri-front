import { global } from "@/styles/global";
import theme from "@/styles/theme";
import { Global, ThemeProvider } from "@emotion/react";
import { getCookie } from "cookies-next";
import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  dehydratedState: unknown;
  session: any;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Dosuri</title>
        <meta name="description" content="도수 통증치료 병원정보는 도수리" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <ThemeProvider theme={theme}>
              <Global styles={global} />
              <div
                css={{
                  margin: "0 auto",
                  minWidth: "32rem",
                  maxWidth: "40rem",
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Component {...pageProps} />
              </div>
            </ThemeProvider>
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
// export default withAuth(MyApp);
MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps = { ...pageProps };

  const { req, res, pathname } = ctx;

  if (
    pathname === "/" ||
    pathname === "/500" ||
    pathname === "/404" ||
    pathname === "/login" ||
    pathname === "oauth"
  ) {
    return { pageProps };
  }

  const accessToken = getCookie("accessToken", { req, res });

  if (!accessToken) {
    console.log("redirect");
    window.location.replace("/login");
  }

  return { pageProps };
};

export default MyApp;
