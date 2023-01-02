import {
  ICommunityPostDetailResponse,
  IHospitalReviewsResponse,
  IHotCommunityResponse,
  IRegisterCommentResult,
} from "../types";

import api from "../axiosConfig";

export const getHotCommunity = async () => {
  const response = await api.get<IHotCommunityResponse>(
    `/community/v1/community/hot-articles`
  );
  return response.data;
};

export const getCommunityList = async (articleType?: string) => {
  const response = await api.get<IHotCommunityResponse>(
    `/community/v1/community/articles`,
    {
      params: {
        article_type: articleType,
      },
    }
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

export const registerComment = async (data: {
  content: string;
  article: string;
}) => {
  const response = await api.post<IRegisterCommentResult>(
    "community/v1/community/article-comment",
    data
  );

  return response.data;
};

export const registerThreadComment = async ({
  content,
  article,
}: {
  content: string;
  article: string;
}) => {
  const response = await api.post<IRegisterCommentResult>(
    "community/v1/community/article_thread",
    { content: content, article_comment: article }
  );

  return response.data;
};
