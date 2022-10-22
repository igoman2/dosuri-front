import { atom } from "recoil";
import { v4 } from "uuid";

export const menuState = atom({
  key: `menuState${v4()}`,
  default: "/home",
});

export const modalState = atom({
  key: `modalState${v4()}`,
  default: false,
});
