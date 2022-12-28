import {
  GetUserAuthParams,
  GetUserAuthResponse,
  IApplyInsuranceResponse,
} from "../types";
import api from "../axiosConfig";
import { UserInfo } from "@/types/user";

export const getUserAuth = async (params: GetUserAuthParams) => {
  const response = await api.post<GetUserAuthResponse>("/user/v1/auth", {
    token: params.token,
    type: params.type,
  });
  return response.data;
};

export const checkNicknameDuplication = async (nickname: string) => {
  const response = await api.get(`/user/v1/users/nickname`, {
    params: {
      nickname,
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

export const registerUser = async (data: UserInfo) => {
  const response = await api.post<UserInfo>(`/user/v1/users`, data);
  return response.data;
};
