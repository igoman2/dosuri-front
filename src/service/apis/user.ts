import { boolean } from "yup";

import { UserInfo, UserSettingInfo } from "@/types/user";

import {
  ChangePersonalInfoConsentResponse,
  GetUserAuthParams,
  GetUserAuthResponse,
  IApplyInsuranceResponse,
  IGetMyCurrentPointResponse,
  IGetMyPointHistoryResponse,
  IResignResponse,
  MyAddressListResponse,
  registerMyAddressResponse,
} from "../../types/service";
import api from "../axiosConfig";
export const getUserAuth = async (params: any) => {
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
  const response = await api.put<UserInfo & UserSettingInfo>(
    `/user/v1/users/me`,
    data,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  return response.data;
};

export const getUser = async (
  accessToken?: string
): Promise<(UserInfo & UserSettingInfo) | null> => {
  const { data } = await api.get<UserInfo & UserSettingInfo>(
    `/user/v1/users/me`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

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

export const getMyAddressList = async () => {
  const response = await api.get<MyAddressListResponse>(
    `/user/v1/users/me/addresses`
  );
  return response.data;
};

export const registerMyAddress = async (params: any) => {
  const response = await api.post<registerMyAddressResponse>(
    "/user/v1/users/me/addresses",
    {
      name: params.name,
      address: params.address,
      address_type: params.address_type,
      latitude: params.latitude,
      longitude: params.longitude,
    }
  );
  return response.data;
};

export const deleteMyAddress = async (uuid: string) => {
  const response = await api.delete(`/user/v1/users/me/addresses/${uuid}`);
  return response.data;
};

export const selectMyAddress = async (params: {
  uuid: string;
  isMain: boolean;
}) => {
  const response = await api.patch(
    `/user/v1/users/me/addresses/${params.uuid}`,
    {
      is_main: params.isMain,
    }
  );
  return response.data;
};

export const changePersonalInfoConsent = async (params: {
  agree_marketing_personal_info: boolean;
  agree_general_push: boolean;
  agree_marketing_push: boolean;
  agree_marketing_email: boolean;
  agree_marketing_sms: boolean;
  uuid: string;
}) => {
  const response = await api.put<ChangePersonalInfoConsentResponse>(
    "/user/v1/users/me/personal-info-agreement",
    {
      agree_marketing_personal_info: params.agree_marketing_personal_info,
      agree_general_push: params.agree_general_push,
      agree_marketing_push: params.agree_marketing_push,
      agree_marketing_email: params.agree_marketing_email,
      agree_marketing_sms: params.agree_marketing_sms,
      uuid: params.uuid,
    }
  );
  return response.data;
};
