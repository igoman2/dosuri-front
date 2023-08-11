import { atom } from "recoil";
import { v4 } from "uuid";

export const rankViewState = atom({
  key: `enableRanking${v4()}`,
  default: {
    viewRanking: false,
    nearSiteLatitude: 0,
    nearSiteLongitude: 0,
  },
});
