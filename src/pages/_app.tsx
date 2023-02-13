import * as fbq from "../lib/fpixel";
import * as gtag from "../lib/gtag";

import { Global, ThemeProvider } from "@emotion/react";
import { Hydrate, QueryClientProvider } from "react-query";
import { Suspense, useEffect } from "react";

import type { AppProps } from "next/app";
import DEFAULT_SEO from "@/lib/seo/seo.config";
import { DefaultSeo } from "next-seo";
// import { ErrorBoundary } from "@sentry/react";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./fallback";
import Head from "next/head";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import Script from "next/script";
import Spinner from "@/components/UI/Spinner";
import { global } from "@/styles/global";
import { queryClient } from "@/service/react-query/queryClient";
import theme from "@/styles/theme";
import { useRouter } from "next/router";
import withAuth from "./withauth";

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

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="ico"
          href="https://dosuri-image.dosuri.site/common/favicon.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="https://dosuri-image.dosuri.site/common/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="https://dosuri-image.dosuri.site/common/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="https://dosuri-image.dosuri.site/common/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="https://dosuri-image.dosuri.site/common/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="https://dosuri-image.dosuri.site/common/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="https://dosuri-image.dosuri.site/common/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="https://dosuri-image.dosuri.site/common/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="https://dosuri-image.dosuri.site/common/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://dosuri-image.dosuri.site/common/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="https://dosuri-image.dosuri.site/common/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://dosuri-image.dosuri.site/common/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="https://dosuri-image.dosuri.site/common/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://dosuri-image.dosuri.site/common/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://dosuri-image.dosuri.site/common/favicon.ico"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="https://dosuri-image.dosuri.site/common/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
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
                    {/* <DefaultSeo {...SEO} /> */}
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
