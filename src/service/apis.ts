import { IHospitalInfoResponse } from "@/mock/hospitals";
import api from "./axiosConfig";
import { GetUserAuth } from "./types";

// export const apis = {
//   getPosts: () => api.get("/api/posts"),
//   getMyInfo: () => api.get("/api/user/v1/users/me"),
//   getUserAuth: ({ token, type }: GetUserAuth) =>
//     api.post("/api/user/v1/auth", {
//       token,
//       type,
//     }),
// };

export const apis = {
  getMyInfo: () => api.get("/user/v1/users/me/"),
  getHospitalList: () => api.get("/hospital/v1/hospitals"),
  getHospitalKeyword: () => api.get("/hospital/v1/keywords/"),
  getUserAuth: ({ token, type }: GetUserAuth) =>
    api.post("/user/v1/auth/", {
      token,
      type,
    }),
};

export const getHospitalList = async () => {
  const response = await api.get<IHospitalInfoResponse>(
    "/hospital/v1/hospitals"
  );
  return response.data;
};
