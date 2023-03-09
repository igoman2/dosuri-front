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
