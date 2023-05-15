import Button from "../Button";
import Image from "next/image";
import Link from "next/link";
import AppleIcon from "@/public/assets/AppleIcon.png";
import { useTheme } from "@emotion/react";
import Script from "next/script";
import { useEffect } from "react";
import { getUserAuth } from "@/service/apis/user";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;

declare global {
  interface Window {
    AppleID: any;
  }
}

const Apple = () => {
  const theme = useTheme();

  const loadScript = (url: string) => {
    const handleScript = () => {
      window.AppleID.auth.init(
        JSON.parse(process.env.NEXT_PUBLIC_APPLE_AUTH_CONFIG!)
      );
    };
    if (window) {
      let script = document.querySelector(`script[src="${url}"]`);
      if (!script) {
        script = document.createElement("script")!;
        script.setAttribute("type", "application/javascript");
        script.setAttribute("src", url);
        document.body.appendChild(script);
        script.addEventListener("load", handleScript);
        return script;
      }
      if (script) {
        return null;
      }
    } else return null;
  };

  useEffect(() => {
    loadScript(
      "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
    );
  }, []);

  const loginWithApple = async () => {
    try {
      const data = await window.AppleID.auth.signIn();
      console.log("data :>> ", data);
      const resp = await getUserAuth({
        token: data?.authorization?.id_token,
        type: "apple",
      });
      console.log("resp :>> ", resp);
    } catch (error: any) {
      console.log(error?.message ?? "");
    }
  };

  return (
    <Button
      onClick={loginWithApple}
      width="100%"
      text={
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            "& .text": {
              fontSize: theme.fontSizes.lg,
              lineHeight: theme.lineHeights.lg,
              fontWeight: 700,
              paddingTop: "0.2rem",
              color: theme.colors.white,
            },
          }}
        >
          <Image src={AppleIcon} alt="kakao-logo" width={17} height={21} />
          <div className="text">애플 계정으로 시작하기</div>
        </div>
      }
      color={theme.colors.black}
      backgroundColor="#000"
    />
  );
};

export default Apple;
