export type User = {
  uuid: string;
  nickname: string;
};

export type UserInfo = {
  uuid: string;
  nickname: string;
  name?: string;
  username?: string;
  birthday: string;
  phone_no: string;
  address: {
    name: string;
    uuid: string;
    address: string;
    address_type: AddressType;
    latitude: number;
    longitude: number;
  };
  sex: string;
  unread_notice: boolean;
  pain_areas: {
    name: string;
  }[];
};

export type UserSettingInfo = {
  setting: {
    agree_marketing_personal_info: boolean;
    agree_general_push: boolean;
    agree_marketing_push: boolean;
    agree_marketing_email: boolean;
    agree_marketing_sms: boolean;
  };
};

export type UserFullInfo = UserInfo &
  UserSettingInfo & {
    refreshToken: string;
    accessToken: string;
  };

export type TSmallArea = {
  value: string;
  label: string;
};

export type AddressType = "home" | "office" | "etc" | "";
