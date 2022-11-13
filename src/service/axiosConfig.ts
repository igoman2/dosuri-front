import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { getSession } from "next-auth/react";

type CustomResponseFormat<T = any> = {
  response: T;
  refreshedToken?: string;
};
interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<CustomResponseFormat>>;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T>(config: AxiosRequestConfig): Promise<T>;
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

const api: CustomInstance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "" : "http://localhost:3000",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

/**
 1. 요청 인터셉터
 2개의 콜백 함수를 받습니다.
 */
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session) {
      if (!config?.headers) {
        throw new Error(
          `Expected 'config' and 'config.headers' not to be undefined`
        );
      }
      const token = session.accessToken;
      config.headers = {
        Authorization: `Bearer ${token}`,
      };

      // config.headers?.Authorization = `Bearer ${token}`;
      return config;
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
      response: { status },
    } = error;
    if (status === 401) {
      const originalRequest = config;

      const resp = await axios.get("/api/auth/session?update");
      const newAccessToken = resp.data.accessToken;

      axios.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
