import { atom } from "recoil";
import { v4 } from "uuid";

export const SearchMapModalState = atom({
  key: `addressModalState${v4()}`,
  default: {
    isActive: false,
  },
});
