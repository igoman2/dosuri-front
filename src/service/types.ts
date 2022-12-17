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
  search?: string;
}

export interface IGetHospitalInfo {
  uuid: string;
  address: string;
  name: string;
  introduction: string;
  area: string;
  phone_no: string;
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

export interface IHospitalTreatmentsResponse {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      uuid: string;
      name: string;
      hospital: string;
      price: number;
      price_per_hour: number;
      description: string;
      created_at: string;
    }
  ];
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
