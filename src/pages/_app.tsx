import { Global, ThemeProvider } from "@emotion/react";
import { Hydrate, QueryClientProvider } from "react-query";
import { Suspense } from "react";

import type { AppProps } from "next/app";
// import { ErrorBoundary } from "@sentry/react";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./fallback";
import Head from "next/head";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import Spinner from "@/components/UI/Spinner";
import { global } from "@/styles/global";
import theme from "@/styles/theme";
import withAuth from "./withauth";
import { queryClient } from "@/service/react-query/queryClient";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  dehydratedState: unknown;
  session: any;
}>) {
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
                <ErrorBoundary FallbackComponent={Fallback}>
                  <Suspense fallback={<Spinner />}>
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
