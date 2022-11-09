import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";

const freeRoute = ["/login", "oauth"];

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    let isProtected = false;

    for (let i = 0; i < freeRoute.length; i++) {
      if (router.pathname.includes(freeRoute[i])) {
        isProtected = true;
        break;
      }
    }

    useEffect(() => {
      if (
        router.asPath === "/" ||
        router.asPath === "/500" ||
        router.asPath === "/404"
      ) {
        setVerified(true);
        return;
      }
      if (isProtected) {
        setVerified(true);
        return;
      }

      const accessToken = getCookie("accessToken");

      if (!accessToken) {
        window.location.replace("/login");
      } else {
        const isTokenVerified = async () => {
          try {
            await axios.post("/user/v1/token/verify", {
              token: accessToken,
            });
            setVerified(true);
          } catch (e) {
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            window.location.replace("/login");
          }
        };
        isTokenVerified();
      }
    }, [router]);

    if (verified) {
      return <WrappedComponent {...props} />;
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
