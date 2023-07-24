import { atom } from "recoil";
import { v4 } from "uuid";

export const scrollState = atom<number>({
  key: `scroll${v4()}`,
  default: 0,
});

export const searchFilterState = atom<{
  title: string;
  key: string;
}>({
  key: `searchFilter${v4()}`,
  default: {
    title: "치료비 낮은순",
    key: "avg_price_per_hour",
  },
});
