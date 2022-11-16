import Image from "next/image";
import React from "react";
import Logo from "@/public/assets/logo2.png";
import { css, useTheme } from "@emotion/react";
import AppleLogin from "@/util/apple";
import Kakao from "@/components/Oauth/Kakao";
import Google from "@/components/Oauth/Google";

const Login = () => {
  const theme = useTheme();

  const mainLayout = css`
    position: relative;
    flex: 1 1 0%;
    overflow-y: auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const logoTitle = css`
    font-weight: 700;
    font-size: ${theme.fontSizes.xxxl};
    line-height: ${theme.lineHeights.xxxl};
    min-width: 32rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  `;

  const buttonSection = css`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  `;

  return (
    <main css={mainLayout}>
      <AppleLogin />
      <Image src={Logo} alt="로고" width={110} height={140} />

      <p css={logoTitle}>
        <span>도수 통증치료 병원정보는</span>
        <span>도수리</span>
      </p>

      <div css={buttonSection}>
        <Kakao />

        <div
          id="appleid-signin"
          data-mode="center-align"
          data-type="sign-in"
          data-color="black"
          data-border="false"
          data-border-radius="5"
          data-height="50"
        ></div>

        <Google />
      </div>
    </main>
  );
};

export default Login;
