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
    large_area: string;
    small_area: string;
  };
  sex: string;
  pain_areas: {
    name: string;
  }[];
};

export type UserFullInfo = UserInfo & {
  refreshToken: string;
  accessToken: string;
};
