import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}
const AppMiddleware = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [isLoggedIn]);
  return <div></div>;
};

export default AppMiddleware;
