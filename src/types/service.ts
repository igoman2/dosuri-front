import { ArticleThread, Attach, Comments } from "@/types/community";

import { User } from "@/types/user";
import { Address, RoadAddress } from "./location";

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

export interface IGetTreatmentKeywordsParams {
  page?: number;
  page_size?: number;
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
  parking_info: string;
  is_ad: boolean;
  is_up: boolean;
  latitude: number;
  longitude: number;
  is_partner: boolean;
  is_contract: boolean;
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
  hospital_rank: IHospitalRankResult;
}

export interface IHospitalRankResult {
  near_site: string;
  near_site_latitude: number;
  near_site_longitude: number;
  rank: number;
  total_count: number;
  avg_price_per_hour: number;
}

export interface IHospitalReviewsResult {
  uuid: string;
  user: User;
  comment_count: number;
  article_type: string;
  up_count: number;
  view_count: number;
  created_at: string;
  is_like: boolean;
  hospital: string;
  hospital_uuid: string;
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
  hospital_name?: string;
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
  distance: number;
  attachments: {
    signed_path: string;
  }[];
}

export interface ITreatmentKeywordsResult {
  uuid: string;
  keyword: string;
}

export interface ITreatmentKeywordsResponse {
  count: number;
  next: string;
  previous: string;
  results: ITreatmentKeywordsResult[];
}

export interface IGoodPriceHospitals {
  area: string;
  attachments: {
    signed_path: string;
  }[];
  avg_price_per_hour: number;
  name: string;
  up_count: number;
  uuid: string;
  view_count: number;
  article_count: number;
}

export interface IHospitalInfoHomeResponse {
  top_hospitals: IHospitalInfoResult[];
  new_hospitals: IHospitalInfoResult[];
  new_review_hospitals: IHospitalInfoResult[];
  many_review_hospitals: IHospitalInfoResult[];
  good_price_hospitals: IGoodPriceHospitals[];
  good_review_hospitals: IHospitalInfoResult[];
  address?: string;
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
  hospital_uuid: string;
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

export interface IImageUploadResponse {
  attachment_uuid: string;
}

export interface IRegisterReviewBody {
  article_type: string;
  hospital?: string;
  content?: string;
  article_attachment_assoc?: {
    attachment: string;
  }[];
  article_keyword_assoc?: {
    treatment_keyword: string;
  }[];
  article_detail?: {
    treatment_effect: number;
    doctor_kindness: number;
    therapist_kindness: number;
    staff_kindness: number;
    clean_score: number;
    cost: number;
    treat_count: number;
  };
  article_auth?: {
    sensitive_agreement: boolean;
    personal_agreement: boolean;
    auth_attachment_assoc: {
      attachment: string;
    }[];
  };
  article_doctor_assoc?: {
    doctor: string;
  }[];
}

export interface IRegisterReviewResult {
  uuid: string;
  user: {
    uuid: string;
    nickname: string;
  };
  article_type: string;
  up_count: number;
  view_count: number;
  created_at: string;
  content: string;
  is_like: boolean;
}

export interface ITempHospitalResult {
  uuid: string;
  name: string;
}

export interface IGetLocationByKeywordParams {
  query: string;
}

export interface IGetLocationByAddressParams {
  query: string;
  analyzeType?: "similar" | "exact";
}

export interface IGetLocationByCoordinateParams {
  longitude: number;
  latitude: number;
}

export interface registerMyAddressResponse {
  uuid: string;
  name: string;
  address: string;
  address_type: string;
  is_main: boolean;
  latitude: string;
  longitude: string;
}

export interface MyAddressListResult {
  uuid: string;
  name: string;
  address: string;
  address_type: string;
  is_main: boolean;
  latitude: number;
  longitude: number;
}

export interface MyAddressListResponse {
  count: number;
  next: string;
  previous: string;
  results: MyAddressListResult[];
}

export type LocationType = {
  documents: Document[];
};

export type Document = {
  address: Address;
  road_address: RoadAddress;
};

export type KakaoMapViewLocation = {
  address: Address;
  road_address: RoadAddress;
  longitude: number;
  latitude: number;
};

export interface ChangePersonalInfoConsentResponse {
  uuid: string;
  agree_marketing_sms: boolean;
  agree_marketing_email: boolean;
  agree_marketing_push: boolean;
  agree_general_push: boolean;
  agree_marketing_personal_info: boolean;
}

export interface ReservationResponse {
  uuid: string;
  hospital: string;
  user: string;
}

export interface IGetMapHospitalsParams {
  latitude: number;
  longitude: number;
  distance_range: number;
  map_type: "price" | "review";
  price_range_from: number;
  price_range_to: number;
  opened_at_range_from: string;
  opened_at_range_to: string;
}

export interface IGetMapHospitals {
  uuid: string;
  name: string;
  area: string;
  up_count: number;
  view_count: number;
  article_count: number;
  avg_price_per_hour: number;
  is_partner: boolean;
  attachments: {
    signed_path: string;
  }[];
  latitude: string;
  longitude: string;
  latest_article: string;
}
