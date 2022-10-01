import { Global, ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { global } from "./global";
import theme from "./theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
