import { atom } from "recoil";
import { v4 } from "uuid";

export const menuState = atom({
  key: `menuState${v4()}`,
  default: "/",
});

export const mainPopupState = atom({
  key: `mainPopupState${v4()}`,
  default: true,
});
