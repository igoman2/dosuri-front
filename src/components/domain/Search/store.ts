import { atom } from "recoil";
import { v4 } from "uuid";

const MAX_PRICE = 2000000;
const MAX_YEAR = 80;

export const searchModalState = atom({
  key: `addressModalState${v4()}`,
  default: false,
});

export const price = atom({
  key: `filterPrice${v4()}`,
  default: MAX_PRICE,
});

export const year = atom({
  key: `filterYear${v4()}`,
  default: MAX_YEAR,
});
