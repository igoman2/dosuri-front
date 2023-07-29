import { atom } from "recoil";
import { v4 } from "uuid";
import { MAX_PRICE, MAX_YEAR } from "@/constants/Filter";

export const searchModalState = atom({
  key: `addressModalState${v4()}`,
  default: false,
});

export const price = atom({
  key: `filterPrice${v4()}`,
  default: {
    max: MAX_PRICE,
    min: 0,
  },
});

export const year = atom({
  key: `filterYear${v4()}`,
  default: {
    max: MAX_YEAR,
    min: 0,
  },
});
