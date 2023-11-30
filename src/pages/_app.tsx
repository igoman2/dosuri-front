import * as fbq from "../lib/fpixel";
import * as gtag from "../lib/gtag";
import "react-spring-bottom-sheet/dist/style.css";
import "swiper/css";
import "swiper/css/pagination";
import { Global, ThemeProvider } from "@emotion/react";
import { Hydrate, QueryClientProvider } from "react-query";
import { Suspense, useEffect } from "react";

import type { AppProps } from "next/app";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./fallback";
import Head from "next/head";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import Script from "next/script";
import Spinner from "@/components/Spinner/Spinner";
import { global } from "@/styles/global";
import { queryClient } from "@/service/react-query/queryClient";
import theme from "@/styles/theme";
import { useRouter } from "next/router";
import withAuth from "./withauth";
import { Toaster } from "react-hot-toast";
import { DefaultSeo } from "next-seo";
import DEFAULT_SEO from "../lib/seo/seo.config";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
function MyApp({
  Component,
  pageProps,
}: AppProps<{
  dehydratedState: unknown;
  session: any;
}>) {
  const router = useRouter();

  useEffect(() => {
    fbq.pageview();

    const handleRouteChange = () => {
      fbq.pageview();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const firebaseConfig = JSON.parse(
        process.env.NEXT_PUBLIC_FIREBASE_CONFIG!
      );
      const app = initializeApp(firebaseConfig);
      getAnalytics(app);
    }
  }, []);

  return (
    <>
      <Head>
        <title>도수리</title>
        <meta name="description" content="도수 통증치료 병원정보는 도수리" />
      </Head>

      <DefaultSeo {...DEFAULT_SEO} />

      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
        }}
      />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6320493705036796"
        crossOrigin="anonymous"
      />

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 1000,
          style: {
            background: "transparent",
            boxShadow: "none",
            color: "#3D3DC1",
            fontSize: "14px",
            marginBottom: "6rem",
          },
        }}
      />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme}>
              <Global styles={global} />
              <div
                css={{
                  height: "100dvh",
                  margin: "0 auto",
                  minWidth: "32rem",
                  maxWidth: "40rem",
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
