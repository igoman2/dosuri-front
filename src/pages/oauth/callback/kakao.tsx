import * as Sentry from "@sentry/nextjs";

import React, { useEffect } from "react";

import { GetServerSideProps } from "next";
import Spinner from "@/components/Spinner/Spinner";
import { getUserAuth } from "@/service/apis/user";
import { setTokenInCookie } from "@/util/setToken";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/service/useUser";
import { userInfoState } from "@/store/user";

interface IKakaoProps {
  uuid: string;
  accessToken: string;
  refreshToken: string;
  isNew: boolean;
}

const Kakao = ({ uuid, accessToken, refreshToken, isNew }: IKakaoProps) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const { user } = useUser(accessToken);

  useEffect(() => {
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

    const redirect = window.localStorage.getItem("redirectURL");
    window.localStorage.setItem("redirectURL", "");

    if (isNew) {
      router.push("/register");
    } else if (!!redirect) {
      setTokenInCookie("refresh", refreshToken);
      setTokenInCookie("access", accessToken);
      router.push(redirect);
    } else {
      setTokenInCookie("refresh", refreshToken);
      setTokenInCookie("access", accessToken);
      router.push("/");
    }
  }, []);

  return <Spinner />;
};

export default Kakao;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { code },
  } = context;

  try {
    const resp = await getUserAuth({
      token: code as string,
      type: "kakao",
    });

    const {
      user_uuid: uuid,
      access_token: accessToken,
      refresh_token: refreshToken,
      is_new: isNew,
    } = resp;

    return {
      props: {
        uuid,
        accessToken,
        refreshToken,
        isNew,
      },
    };
  } catch (e) {
    Sentry.setTag("api", "kakao-login");
    Sentry.captureException(e);
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
};
