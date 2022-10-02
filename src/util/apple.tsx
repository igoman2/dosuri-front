import { GetServerSideProps } from "next";
import Head from "next/head";
import Script from "next/script";
import React from "react";

/**
 * Todo: meta 정보 기입
 */
const AppleLogin = () => {
  return (
    <>
      <Head>
        <meta name="appleid-signin-client-id" content="[CLIENT_ID]" />
        <meta name="appleid-signin-scope" content="[SCOPES]" />
        <meta name="appleid-signin-redirect-uri" content="[REDIRECT_URI]" />
        <meta name="appleid-signin-state" content="[STATE]" />
      </Head>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
      ></Script>
    </>
  );
};

export default AppleLogin;
