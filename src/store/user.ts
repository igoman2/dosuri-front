import { UserInfo } from "@/types/user";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userInfoState = atom<UserInfo>({
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
    pain_areas: [
      {
        name: "",
      },
      {
        name: "",
      },
    ],
  },
  effects_UNSTABLE: [persistAtom],
});
