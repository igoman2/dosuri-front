import { GetUserAuth } from "./types";
import { IHospitalInfoResponse } from "@/mock/hospitals";
import api from "./axiosConfig";

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

interface IGetHospitalImagesParam {
  uuid: string;
}
export const getHospitalImages = async () => {
  const response = await api.get<IHospitalInfoResponse>(
    "/hospital/v1/hospitals",
    {
      params: {
        hospital: [
          "56aa2a71e0df41b3a7abbe2114b043ac",
          "fab6e7eafddc494b97b14925a4cd7c69",
        ],
      },
    }
  );
  return response.data;
};

export interface IHospitalOperationTimeResponse {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      uuid: string;
      hospital: string;
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
      created_at: string;
    }
  ];
}

export const getHospitalOperationTime = async (uuid: string) => {
  const response = await api.get<IHospitalOperationTimeResponse>(
    "/hospital/v1/hospital-calendars",
    {
      params: {
        hospital: uuid,
      },
    }
  );
  return response.data;
};

interface IHospitalTreatmentsResponse {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      uuid: string;
      name: string;
      hospital: string;
      price: number;
      price_per_hour: number;
      description: string;
      created_at: string;
    }
  ];
}

export const getHospitalTreatments = async (uuid: string) => {
  const response = await api.get<IHospitalTreatmentsResponse>(
    "/hospital/v1/hospital-treatments",
    {
      params: {
        hospital: uuid,
      },
    }
  );
  return response.data;
};
