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

export interface IGetHospitalInfo {
  uuid: string;
  address: string;
  name: string;
  introduction: string;
  area: string;
  phone_no: string;
  images: { url: string }[];
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
    nickname: string;
    uuid: string;
  };
  article_type: string;
  up_count: number;
  view_count: number;
  created_at: string;
  hospital: string;
  content: string;
  article_attach: {
    uuid: string;
    path: string;
    created_at: string;
  }[];
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
  thumbnail_url: string;
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
  images: {
    url: string;
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
