import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useTheme } from "@emotion/react";

import AppleIcon from "@/public/assets/AppleIcon.png";
import { getUser, getUserAuth } from "@/service/apis/user";
import { userInfoState } from "@/store/user";
import Icon from "@/util/Icon";
import { setTokenInCookie } from "@/util/setToken";

import Button from "../Button";
import Spinner from "../Spinner/Spinner";

declare global {
  interface Window {
    AppleID: any;
  }
}

const Apple = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const router = useRouter();
  const [_, setUserInfo] = useRecoilState(userInfoState);
  const loadScript = (url: string) => {
    const handleScript = () => {
      window.AppleID.auth.init(
        JSON.parse(
          process.env.NEXT_PUBLIC_APPLE_AUTH_CONFIG!.replace(
            /:RTN_URL/gi,
            window.location.host
          )
        )
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
      setLoading(true);

      const data = await window.AppleID.auth.signIn();
      console.log("data :>> ", data);
      const resp = await getUserAuth({
        token: data?.authorization?.code,
        type: "apple",
      });

      const {
        user_uuid: uuid,
        access_token: accessToken,
        refresh_token: refreshToken,
        is_new: isNew,
      } = resp;

      const user = await getUser(accessToken);

      if (!user) {
        setLoading(false);
        return alert("로그인에 실패 했습니다. 다시 시도해주세요");
      }

      setUserInfo({ ...user, uuid, refreshToken, accessToken });

      if (isNew) {
        router.push("/register");
      } else {
        setTokenInCookie("refresh", refreshToken);
        setTokenInCookie("access", accessToken);
        router.push("/");
      }
    } catch (error: any) {
      setLoading(false);
      console.log("loginWithApple error :>> ", error);
      alert("로그인에 실패 했습니다. 다시 시도해주세요");
    }
  };

  return (
    <>
      <Button
        onClick={loginWithApple}
        width="100%"
        text={
          <div
            css={{
              padding: "2px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              "& .text": {
                fontSize: theme.fontSizes.lg,
                lineHeight: theme.lineHeights.lg,
                fontWeight: 600,
                paddingTop: "0.5rem",
                color: theme.colors.white,
                letterSpacing: "1.5px",
              },
            }}
          >
            <Icon name={"appleIcon"} fill={"#ffffff"} />
            <span className="text">Sign in with Apple</span>
          </div>
        }
        color={theme.colors.black}
        backgroundColor="#000"
      />
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999,
            width: "100%",
          }}
        >
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Apple;
