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
            content="https://dosuri-image.dosuri.site/common/favicon-16x16.png"
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
            content="https://dosuri-image.dosuri.site/common/favicon-16x16.png"
          />

          <meta property="og:title" content="도수리" />
          <meta
            property="og:description"
            content="도수 통증치료 병원정보는 도수리"
          />
          <meta property="og:url" content="https://www.dosuri.site" />
          <meta
            property="og:image"
            content="https://dosuri-image.dosuri.site/common/favicon-16x16.png"
          />
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
