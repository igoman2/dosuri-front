import { global } from "@/styles/global";
import theme from "@/styles/theme";
import { Global, ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Suspense, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

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
/**
 * withAuth(MyApp)을 사용하면 HOC 패턴으로 권한 체크를 하고
 * 그렇지 않으면 인증이 필요한 컴포넌트 각각에 HOF 패턴으로 권한 체크를 하게 된다.
 */
export default MyApp;
