import {
  GetUserAuthParams,
  GetUserAuthResponse,
  IApplyInsuranceResponse,
  IGetMyCurrentPointResponse,
  IGetMyPointHistoryResponse,
  IResignResponse,
} from "./../types";

import { UserInfo } from "@/types/user";
import api from "../axiosConfig";

export const getUserAuth = async (params: GetUserAuthParams) => {
  const response = await api.post<GetUserAuthResponse>("/user/v1/auth", {
    token: params.token,
    type: params.type,
  });
  return response.data;
};

export const checkNicknameDuplication = async (
  nickname: string,
  accessToken: string
) => {
  const response = await api.get(`/user/v1/users/nickname`, {
    params: {
      nickname,
    },
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  return response;
};

export const applyInsurance = async () => {
  const response = await api.post<IApplyInsuranceResponse>(
    `/user/v1/insurance-user-assocs`,
    {}
  );
  return response;
};

export const registerUser = async (data: UserInfo, accessToken?: string) => {
  const response = await api.put<UserInfo>(`/user/v1/users/me`, data, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  return response.data;
};

export const getUser = async (
  accessToken?: string
): Promise<UserInfo | null> => {
  const { data } = await api.get<UserInfo>(`/user/v1/users/me`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return data;
};

export const getMyPointHistory = async () => {
  const { data } = await api.get<IGetMyPointHistoryResponse>(
    `/user/v1/users/me/point-histories`
  );

  return data;
};

export const getMyCurrentPoint = async () => {
  const { data } = await api.get<IGetMyCurrentPointResponse>(
    "/user/v1/users/me/point"
  );

  return data;
};

export const resignUser = async (data: { reason: string }) => {
  const resp = await api.post<IResignResponse>(
    "/user/v1/users/me/resign",
    data
  );

  return resp.data;
};

export const updateNoticeReadingFlag = async () => {
  const resp = await api.put("/user/v1/users/notice");

  return resp.data;
};
