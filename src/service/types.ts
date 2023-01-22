import { ArticleThread, Attach, Comments } from "@/types/community";

import { User } from "@/types/user";

export interface GetUserAuthParams {
  token: string;
  type: string;
}
export interface GetUserAuthResponse {
  user_uuid: string;
  access_token: string;
  refresh_token: string;
  is_new: boolean;
}
export interface IGetHospitalListParams {
  hospital_address_assoc__address?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
  search?: string;
  latitude?: number;
  longitude?: number;
}

export interface IGetFilteredHospitalListParams {
  ordering?: string;
  page?: number;
  page_size?: number;
}

export interface IGetCommunityListParams {
  article_type?: string;
  hospital?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
  user?: string;
}

export interface IGetHospitalReviewsParams {
  uuid: string;
  ordering: string;
}

export interface IGetRecentHospitalSearchListParams {
  ordering?: string;
  page?: number;
  page_size?: number;
}

export interface IGetHospitalInfo {
  uuid: string;
  address: string;
  name: string;
  introduction: string;
  area: string;
  phone_no: string;
  attachments: { signed_path: string }[];
  calendar: {
    monday: string | null;
    tuesday: string | null;
    wednesday: string | null;
    thursday: string | null;
    friday: string | null;
    saturday: string | null;
    sunday: string | null;
  };
  keywords: {
    keyword: string;
  }[];
  is_up: boolean;
}

export interface IHospitalTreatmentResult {
  uuid: string;
  name: string;
  hospital: string;
  price: number | string;
  price_per_hour: number;
  description: string;
  created_at: string;
}

export interface IHospitalTreatmentsResponse {
  count: number;
  next: string;
  previous: string;
  price_per_hour: number;
  results: IHospitalTreatmentResult[];
}

export interface IHospitalReviewsResult {
  uuid: string;
  user: {
    uuid: string;
    nickname: string;
  };
  comment_count: number;
  article_type: string;
  up_count: number;
  view_count: number;
  created_at: string;
  is_like: boolean;
  hospital: string;
  content: string;
  article_attachment_assoc: Attach[];
}

export interface IHospitalReviewsResponse {
  count: number;
  next: string;
  previous: string;
  results: IHospitalReviewsResult[];
}

export interface IGetDoctorListResult {
  uuid: string;
  hospital: string;
  attachments: {
    signed_path: string;
  }[];
  name: string;
  title: string;
  subtitle: string;
  position: string;
  descriptions: [
    {
      description: string;
    }
  ];
  keywords: [
    {
      keyword: string;
    }
  ];
}
export interface IGetDoctorList {
  count: number;
  next: string;
  previous: string;
  results: IGetDoctorListResult[];
}

export interface IToggleHospitalThumbup {
  hospital: string;
  is_up: boolean;
  uuid: string;
}

export interface IHospitalInfoResult {
  uuid: string;
  address: string;
  name: string;
  area: string;
  up_count: number;
  view_count: number;
  article_count: number;
  latest_article: string;
  latest_article_created_at: string;
  opened_at: string;
  distance: null;
  attachments: {
    signed_path: string;
  }[];
}

export interface IHospitalInfoHomeResponse {
  top_hospitals: IHospitalInfoResult[];
  new_hospitals: IHospitalInfoResult[];
  good_price_hospitals: IHospitalInfoResult[];
  good_review_hospitals: IHospitalInfoResult[];
}

export interface IHospitalInfoResponse {
  count: number;
  next: string;
  previous: string;
  results: IHospitalInfoResult[];
}

export interface IRecentHospitalSearchListResult {
  uuid: string;
  word: string;
}

export interface IRecentHospitalSearchListResponse {
  count: number;
  next: string;
  previous: string;
  results: IRecentHospitalSearchListResult[];
}

export interface IHotCommunityResponse {
  count: number;
  next: string;
  previous: string;
  results: IHospitalReviewsResult[];
}

export interface ICommunityPostDetailResponse {
  uuid: string;
  user: User;
  article_type: string;
  up_count: number;
  view_count: number;
  created_at: string;
  hospital: string;
  is_like: boolean;
  content: string;
  article_attachment_assoc: Attach[];
  article_comment: Comments[];
}

export interface IApplyInsuranceResponse {
  uuid: string;
  insurance: string;
  user: string;
}

export interface IGetMyPointHistoryResponse {
  count: number;
  next: string;
  previous: string;
  results: IGetMyPointHistoryResult[];
}

export interface IGetMyPointHistoryResult {
  modify_point: number;
  total_point: number;
  content: string;
  created_at: string;
}

export interface IRegisterCommentResult {
  uuid: string;
  user: {
    uuid: string;
    nickname: string;
  };
  up_count: number;
  view_count: number;
  content: string;
  article_thread: ArticleThread[];
  created_at: string;
}

export interface IGetMyCurrentPointResponse {
  total_point: number;
}

export interface IResignResponse {
  content: string;
  created_at: string;
  reason: string;
}
