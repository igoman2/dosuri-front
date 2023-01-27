import {
  ICommunityPostDetailResponse,
  IGetCommunityListParams,
  IGetHospitalReviewsParams,
  IGetTreatmentKeywordsParams,
  IHospitalReviewsResponse,
  IHotCommunityResponse,
  IRegisterCommentResult,
  IRegisterReviewBody,
  IRegisterReviewResult,
  ITreatmentKeywordsResponse,
} from "../types";

import api from "../axiosConfig";

export const getHotCommunity = async () => {
  const response = await api.get<IHotCommunityResponse>(
    `/community/v1/community/hot-articles`
  );
  return response.data;
};

export const getCommunityList = async (params?: IGetCommunityListParams) => {
  const response = await api.get<IHotCommunityResponse>(
    `/community/v1/community/articles`,
    { params: { ...params } }
  );
  return response.data;
};

export const getCommunityPostDetail = async (uuid: string) => {
  const response = await api.get<ICommunityPostDetailResponse>(
    `/community/v1/community/articles/${uuid}`
  );
  return response.data;
};

export const getHospitalReviews = async (
  params?: IGetHospitalReviewsParams
) => {
  const response = await api.get<IHospitalReviewsResponse>(
    "/community/v1/community/articles",
    {
      params: {
        hospital: params?.uuid,
        ordering: params?.ordering,
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
  mention_user,
}: {
  content: string;
  article: string;
  mention_user: string;
}) => {
  const response = await api.post<IRegisterCommentResult>(
    "community/v1/community/article_thread",
    { content: content, article_comment: article, mention_user }
  );

  return response.data;
};

export const likePost = async (articleId: string) => {
  const response = await api.post<IRegisterCommentResult>(
    "community/v1/community/articles-like",
    {
      article: articleId,
    }
  );

  return response.data;
};

export const registerReview = async (data: IRegisterReviewBody) => {
  const response = await api.post<IRegisterReviewResult>(
    "community/v1/community/articles",
    data
  );

  return response.data;
};

export const getTreatmentKeywords = async (
  params: IGetTreatmentKeywordsParams
) => {
  const response = await api.get<ITreatmentKeywordsResponse>(
    "/community/v1/community/treatment-keywords",
    {
      params,
    }
  );
  return response.data;
};
