import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useTheme } from "@emotion/react";
import { getUser, getUserAuth } from "@/service/apis/user";
import { userInfoState } from "@/store/user";
import Icon from "@/util/Icon";
import { setTokenInCookie } from "@/util/setToken";
import styled from "@emotion/styled";

import Button from "../Button";
import Spinner from "../Spinner/Spinner";
import theme from "@/styles/theme";

declare global {
  interface Window {
    AppleID: any;
  }
}

const Apple = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
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

      if (!userInfo.setting) {
        setUserInfo((prev) => ({
          ...prev,
          setting: {
            agree_marketing_personal_info: false,
            agree_general_push: false,
            agree_marketing_push: false,
            agree_marketing_email: false,
            agree_marketing_sms: false,
          },
        }));
      }

      if (isNew) {
        router.push("/register");
      } else {
        setTokenInCookie("refresh", refreshToken);
        setTokenInCookie("access", accessToken);
        router.push("/");
      }
    } catch (error: any) {
      setLoading(false);
      alert("로그인에 실패 했습니다. 다시 시도해주세요");
    }
  };

  return (
    <>
      <Button
        onClick={loginWithApple}
        width="100%"
        text={
          <AppleButton>
            <Icon name={"appleIcon"} fill={"#ffffff"} />
            <span>Sign in with Apple</span>
          </AppleButton>
        }
        color={theme.colors.black}
        backgroundColor="#000"
      />
      {loading && (
        <LoadingContainer
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999,
            width: "100%",
          }}
        >
          <Spinner />
        </LoadingContainer>
      )}
    </>
  );
};

export default Apple;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
`;

const AppleButton = styled.div`
  padding: 2px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  span {
    font-size: ${theme.fontSizes.lg};
    line-height: ${theme.lineHeights.lg};
    font-weight: 600;
    padding-top: 0.5rem;
    color: ${theme.colors.white};
    letter-spacing: 1.5px;
  }
`;
