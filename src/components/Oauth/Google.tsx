import Button from "../Button";
import Image from "next/image";
import React, { useState } from "react";
import googleIcon from "@/public/assets/google.png";
import { useTheme } from "@emotion/react";
import { setTokenInCookie } from "@/util/setToken";
import { useRouter } from "next/router";
import { getUser, getUserAuth } from "@/service/apis/user";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/store/user";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Google = () => {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const data = await signInWithPopup(getAuth(), provider);
      console.log("data :>> ", data);

      const resp = await getUserAuth({
        token: data.user.uid,
        type: "google",
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
      console.log("error :>> ", error);
      setLoading(false);
      alert("로그인에 실패 했습니다. 다시 시도해주세요");
    }
  };

  return (
    <>
      <Button
        onClick={() => loginWithGoogle()}
        text={
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              fontSize: theme.fontSizes.lg,
              lineHeight: theme.lineHeights.lg,
              fontWeight: 700,
              "& .text": {
                fontSize: theme.fontSizes.lg,
                lineHeight: theme.lineHeights.lg,
                fontWeight: 700,
                paddingTop: "0.2rem",
              },
            }}
          >
            <Image src={googleIcon} alt="google-logo" width={20} height={20} />
            <div className="text"> 구글 계정으로 시작하기</div>
          </div>
        }
        color={theme.colors.black}
        backgroundColor={theme.colors.white}
        border={`0.1rem solid ${theme.colors.grey}`}
      />
    </>
  );
};

export default Google;
