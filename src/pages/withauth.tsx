import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";

const freeRoute = ["/login", "oauth"];

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    let isProtected = false;

    for (let i = 0; i < freeRoute.length; i++) {
      if (router.pathname.includes(freeRoute[i])) {
        isProtected = true;
        break;
      }
    }

    const checkAuth = () => {
      if (
        router.asPath === "/" ||
        router.asPath === "/500" ||
        router.asPath === "/404"
      ) {
        setVerified(true);
        setIsProcessing(false);

        return;
      }
      if (isProtected) {
        setVerified(true);
        setIsProcessing(false);

        return;
      }

      const accessToken = getCookie("accessToken");

      if (!accessToken) {
        window.location.replace("/login");
      } else {
        setVerified(true);
        setIsProcessing(false);
      }
    };

    useEffect(() => {
      setIsProcessing(true);
      checkAuth();
    }, [router]);

    if (verified) {
      return !isProcessing && <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;

export const logout = () => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  window.location.replace("/");
};
