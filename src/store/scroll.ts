import { atom } from "recoil";
import { v4 } from "uuid";

export const scrollState = atom<number>({
  key: `scroll${v4()}`,
  default: 0,
});
