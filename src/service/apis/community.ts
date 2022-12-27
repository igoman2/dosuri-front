import {
  ICommunityPostDetailResponse,
  IHospitalReviewsResponse,
  IHotCommunityResponse,
} from "../types";

import api from "../axiosConfig";

export const getHotCommunity = async () => {
  const response = await api.get<IHotCommunityResponse>(
    `/community/v1/community/hot-articles`
  );
  return response.data;
};

export const getCommunityList = async () => {
  const response = await api.get<IHotCommunityResponse>(
    `/community/v1/community/articles`
  );
  return response.data;
};

export const getCommunityPostDetail = async (uuid: string) => {
  const response = await api.get<ICommunityPostDetailResponse>(
    `/community/v1/community/articles/${uuid}`
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
