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
      large_area: "",
      small_area: "",
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
    accessToken: "",
    refreshToken: "",
  },
  effects_UNSTABLE: [persistAtom],
});
