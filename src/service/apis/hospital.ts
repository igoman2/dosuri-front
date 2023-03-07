import {
  IGetDoctorList,
  IGetFilteredHospitalListParams,
  IGetHospitalInfo,
  IGetHospitalListParams,
  IGetRecentHospitalSearchListParams,
  IHospitalInfoHomeResponse,
  IHospitalInfoResponse,
  IHospitalTreatmentsResponse,
  IRecentHospitalSearchListResponse,
  ITempHospitalResult,
  IToggleHospitalThumbup,
} from "../types";

import api from "../axiosConfig";

export const getHospitalList = async (params?: IGetHospitalListParams) => {
  const response = await api.get<IHospitalInfoResponse>(
    "/hospital/v1/hospitals",
    {
      params,
    }
  );
  return response.data;
};

export const getHospitalListByKeyword = async (
  params?: IGetHospitalListParams
) => {
  const response = await api.get<IHospitalInfoResponse>(
    "/hospital/v1/hospitals/names",
    {
      params,
    }
  );
  return response.data;
};

export const getFilteredHospitalList = async (
  params?: IGetFilteredHospitalListParams
) => {
  const response = await api.get<IHospitalInfoResponse>(
    "/hospital/v1/hospitals-address-filtered",
    {
      params,
    }
  );
  return response.data;
};

export const getRecentHospitalSearchList = async (
  params?: IGetRecentHospitalSearchListParams
) => {
  const response = await api.get<IRecentHospitalSearchListResponse>(
    "hospital/v1/hospital-searches",
    {
      params,
    }
  );
  return response.data;
};

export const deleteSearchHistory = async (uuid: string) => {
  const response = await api.delete(`hospital/v1/hospital-searches/${uuid}`);
  return response;
};

export const deleteSearchHistoryAll = async () => {
  const response = await api.delete(`hospital/v1/hospital-searches`);
  return response;
};

export const createSearchHistory = async (word: string) => {
  const response = await api.post(`hospital/v1/hospital-searches`, {
    word,
  });
  return response;
};

export const getHospitalInfo = async (uuid: string) => {
  const response = await api.post<IGetHospitalInfo>(
    `/hospital/v1/hospitals/${uuid}`
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

export const createTempHospital = async (data: { name: string }) => {
  const response = await api.post<ITempHospitalResult>(
    `hospital/v1/temp-hospitals`,
    data
  );
  return response.data;
};
