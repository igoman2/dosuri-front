import Spinner from "@/components/UI/Spinner";
import { apis } from "@/service/api";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import api from "@/service/axiosConfig";

const Kakao = () => {
  const router = useRouter();

  const { mutate } = useMutation(apis.getUserAuth, {
    onSuccess: (resp) => {
      const { access_token: accessToken, refresh_token: refreshToken } =
        resp.data;
      api.defaults.headers.Authorization = "Bearer " + accessToken;

      const expires = new Date();
      expires.setDate(Date.now() + 1000 * 60 * 60 * 24);
      document.cookie = `accessToken=${accessToken}; path=/;`;
      document.cookie = `refreshToken=${refreshToken}; path=/;`;

      router.push("/");
    },
  });

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code") || "";
    mutate({
      username: "igoman2@naver.com",
      token: code,
      type: "kakao",
    });
  }, [mutate]);

  return <Spinner />;
};

export default Kakao;
