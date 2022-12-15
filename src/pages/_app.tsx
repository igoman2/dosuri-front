import { Global, ThemeProvider } from "@emotion/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Suspense, useState } from "react";

import type { AppProps } from "next/app";
import { ErrorBoundary } from "@sentry/react";
import Fallback from "./fallback";
import Head from "next/head";
import { ReactQueryDevtools } from "react-query/devtools";
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
            suspense: true,
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
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
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
                <ErrorBoundary fallback={Fallback}>
                  <Suspense fallback={<Progress />}>
                    <Component {...pageProps} />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </ThemeProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
export default withAuth(MyApp);
