import { Global, ThemeProvider } from "@emotion/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Suspense, useState } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { global } from "@/styles/global";
import theme from "@/styles/theme";
import withAuth from "./withauth";

function Progress() {
  return <h1>Loading...</h1>;
}

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  dehydratedState: unknown;
  session: any;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <title>Dosuri</title>
        <meta name="description" content="도수 통증치료 병원정보는 도수리" />
      </Head>
      <Suspense fallback={<Progress />}>
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
      </Suspense>
    </>
  );
}
export default withAuth(MyApp);
