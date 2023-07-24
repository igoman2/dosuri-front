import { MAP_SELECT_LIST, MapListItem } from "@/mock/searchCategory";
import { atom } from "recoil";
import { v4 } from "uuid";

export const mapFilterState = atom<MapListItem>({
  key: `mapFilter${v4()}`,
  default: {
    title: MAP_SELECT_LIST[0].title,
    key: MAP_SELECT_LIST[0].key,
  },
});
