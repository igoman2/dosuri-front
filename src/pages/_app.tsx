import { global } from "@/styles/global";
import theme from "@/styles/theme";
import { Global, ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: unknown; session: any }>) {
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
              <SessionProvider session={pageProps.session}>
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
              </SessionProvider>
            </ThemeProvider>
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
