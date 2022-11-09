import Spinner from "@/components/UI/Spinner";
import { apis } from "@/service/api";
import React, { useEffect } from "react";
import { useMutation } from "react-query";

const Kakao = () => {
  const { mutate } = useMutation(apis.updateToken, {
    onSuccess: () => {
      console.log("@@");
    },
  });
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code") || "";
    mutate({ requestCode: code });
  }, []);

  return <Spinner />;
};

export default Kakao;
