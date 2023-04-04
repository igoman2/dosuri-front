import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="kr">
        <Head>
          <meta name="robots" content="index,follow" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta charSet="UTF-8" />
          <meta
            name="facebook-domain-verification"
            content="24ov5jif5wf1d1ci5yv25w6qb5eos1"
          />
          <meta
            name="google-site-verification"
            content="nZSk2J4SaVkZwuucONktiqpBNgBIAxLqND64TrGGR0o"
          />
          <meta
            name="naver-site-verification"
            content="00988a9242f88ec4eea87b27eff618f6eedc2e19"
          />
          <meta property="og:url" content="https://www.dosuri.site" />
          <meta property="og:title" content="도수리" />
          <meta
            property="og:description"
            content="도수 통증치료 병원정보는 도수리"
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:image"
            content="https://dosuri-image.dosuri.site/common/logo.png"
          />
          <meta property="og:image:alt" content="" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content="en_GB" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="오터 로그" />
          <meta
            name="twitter:description"
            content="도수 통증치료 병원정보는 도수리"
          />
          <meta
            name="twitter:image"
            content="https://dosuri-image.dosuri.site/common/1200x600.png"
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
          <link
            rel="shortcut icon"
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
          <link rel="canonical" href="https://www.dosuri.site" />

          <meta property="product:brand" content="도수리" />
          <meta property="product:availability" content="in stock" />
          <meta property="product:condition" content="new" />
          <meta property="product:price:amount" content="10000" />
          <meta property="product:price:currency" content="KRW" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
