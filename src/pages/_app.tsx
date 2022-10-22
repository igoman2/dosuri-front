import { global } from "@/styles/global";
import theme from "@/styles/theme";
import { Global, ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Dosuri</title>
        <meta name="description" content="도수 통증치료 병원정보는 도수리" />
      </Head>
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
    </>
  );
}
export default MyApp;
