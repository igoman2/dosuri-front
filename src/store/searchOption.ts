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
  key: `scroll${v4()}`,
  default: {
    title: "인기순",
    key: "-view_count",
  },
});
