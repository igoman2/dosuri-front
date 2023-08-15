import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useLayoutEffect } from "react";

const Error404 = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    router.replace("/");
  }, []);

  return;
};

export default Error404;
