import {
  GetUserAuthParams,
  GetUserAuthResponse,
  IGetDoctorList,
  IGetHospitalInfo,
  IGetHospitalListParams,
  IHospitalInfoHomeResponse,
  IHospitalInfoResponse,
  IHospitalReviewsResponse,
  IHospitalTreatmentsResponse,
  IToggleHospitalThumbup,
} from "./types";

import api from "./axiosConfig";

export const getUserAuth = async (params: GetUserAuthParams) => {
  const response = await api.post<GetUserAuthResponse>("/user/v1/auth", {
    token: params.token,
    type: params.type,
  });
  return response.data;
};

export const getHospitalList = async (params?: IGetHospitalListParams) => {
  const response = await api.get<IHospitalInfoResponse>(
    "/hospital/v1/hospitals",
    {
      params,
    }
  );
  return response.data;
};

export const getHospitalInfo = async (uuid: string) => {
  const response = await api.post<IGetHospitalInfo>(
    `hospital/v1/hospitals/${uuid}`
  );
  return response.data;
};

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

export const getHospitalReviews = async (uuid: string) => {
  const response = await api.get<IHospitalReviewsResponse>(
    "/community/v1/community/articles",
    {
      params: {
        hospital: uuid,
      },
    }
  );
  return response.data;
};

export const getDoctorList = async (uuid: string) => {
  const response = await api.get<IGetDoctorList>("/hospital/v1/doctors", {
    params: {
      hospital: uuid,
    },
  });
  return response.data;
};

export const toggleHospitalThumbup = async (data: {
  hospital?: string;
  is_up?: boolean;
}) => {
  const response = await api.post<IToggleHospitalThumbup>(
    "/hospital/v1/hospital-user-assocs",
    data
  );

  return response.data;
};

export const getHospitalInfoHome = async () => {
  const response = await api.get<IHospitalInfoHomeResponse>(
    `hospital/v1/hospitals/home`
  );
  return response.data;
};
