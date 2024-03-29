import { UserFullInfo } from "@/types/user";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userInfoState = atom<UserFullInfo>({
  key: `userInfo`,
  default: {
    uuid: "",
    nickname: "",
    name: "",
    birthday: "",
    phone_no: "",
    address: {
      name: "",
      uuid: "",
      address: "",
      address_type: "",
      latitude: 0,
      longitude: 0,
    },
    sex: "",
    unread_notice: false,
    pain_areas: [
      {
        name: "",
      },
      {
        name: "",
      },
    ],
    setting: {
      agree_marketing_personal_info: false,
      agree_general_push: false,
      agree_marketing_push: false,
      agree_marketing_email: false,
      agree_marketing_sms: false,
    },
    accessToken: "",
    refreshToken: "",
  },
  effects_UNSTABLE: [persistAtom],
});
