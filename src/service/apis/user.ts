import {
  GetUserAuthParams,
  GetUserAuthResponse,
  ICommunityPostDetailResponse,
} from "../types";

import api from "../axiosConfig";

export const getUserAuth = async (params: GetUserAuthParams) => {
  const response = await api.post<GetUserAuthResponse>("/user/v1/auth", {
    token: params.token,
    type: params.type,
  });
  return response.data;
};

export const checkNicknameDuplication = async (nickname: string) => {
  const response = await api.get<ICommunityPostDetailResponse>(
    `/user/v1/users/nickname`,
    {
      params: {
        nickname,
      },
    }
  );
  return response;
};
