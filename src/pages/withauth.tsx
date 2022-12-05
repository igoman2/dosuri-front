import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";

const freeRoute = ["/login", "oauth"];

/**
 * 클라이언트 측 권한 관리를 위한 코드
 * _app.tsx 에서
 * export default withAuth(MyApp)
 * 로 사용됨
 * useEffect에서 로그인 검사를 하는 동안 화면에 컨텐츠가 잠시 보이는 이슈로 인해 사용하지 않게 됨
 */
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
        setVerified(true);
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
