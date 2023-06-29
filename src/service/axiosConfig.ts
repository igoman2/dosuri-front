import { deleteCookie, getCookie, setCookie } from "cookies-next";

import axios from "axios";
import { logout, resetLogin } from "@/pages/withauth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/**
 1. 요청 인터셉터
 2개의 콜백 함수를 받습니다.
 */
api.interceptors.request.use(
  (config) => {
    // HTTP Authorization 요청 헤더에 jwt-token을 넣음
    // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.
    const token = getCookie("accessToken");
    config!.headers = { ...config!.headers };
    try {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        // config.headers.Authorization = `Bearer 2s`;
      }

      return config;
    } catch (err) {
      console.error("[_axios.interceptors.request] config : " + err);
    }
    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

/**
 2. 응답 인터셉터
 2개의 콜백 함수를 받습니다.
 */
api.interceptors.response.use(
  (response) => {
    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다.
        .then() 으로 이어집니다.
    */

    return response;
  },

  async (error) => {
    const {
      config,
      response: { status, data },
    } = error;
    if (status === 401) {
      if (data.code === "user_not_found" || data.code === "token_not_valid") {
        const currentURL = window.location.pathname;
        localStorage.setItem("redirectURL", currentURL.toString());
        resetLogin();
        return;
      }
      const originalRequest = config;
      originalRequest!.headers = { ...originalRequest!.headers };

      const refreshToken = getCookie("refreshToken");
      try {
        const resp = await api.post("/user/v1/token/refresh", {
          refresh: refreshToken,
        });

        const newAccessToken = resp.data.access;

        axios.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        deleteCookie("accessToken");
        setCookie("accessToken", newAccessToken);

        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      } catch (e) {
        const currentURL = window.location.pathname;
        localStorage.setItem("redirectURL", currentURL.toString());
        resetLogin();
        return;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
