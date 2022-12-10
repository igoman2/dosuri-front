import { GetUserAuth } from "./types";
import { IHospitalInfoResponse } from "@/mock/hospitals";
import api from "./axiosConfig";

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
  getMyInfo: () => api.get("/user/v1/users/me"),
  getHospitalList: () => api.get("/hospital/v1/hospitals"),
  getHospitalKeyword: () => api.get("/hospital/v1/keywords"),
  getUserAuth: ({ token, type }: GetUserAuth) =>
    api.post("/user/v1/auth", {
      token,
      type,
    }),
};

interface IGetHospitalListParams {
  hospital_address_assoc__address?: string;
  ordering?: string;
  page?: number;
  search?: string;
}
export const getHospitalList = async (params?: IGetHospitalListParams) => {
  const response = await api.get<IHospitalInfoResponse>(
    "/hospital/v1/hospitals",
    {
      params,
    }
  );
  return response.data;
};

export interface IGetHospitalInfo {
  uuid: string;
  address: string;
  name: string;
  introduction: string;
  area: string;
  phone_no: string;
  up_count: number;
  view_count: number;
  article_count: string;
  latest_article: string;
  is_partner: true;
  opened_at: string;
  created_at: string;
  code: string;
  latitude: number;
  longitude: number;
}
export const getHospitalInfo = async (uuid: number) => {
  const response = await api.get<IGetHospitalInfo>(
    `hospital/v1/hospitals/${uuid}`
  );
  return response.data;
};
