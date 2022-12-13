import { atom } from "recoil";
import { v4 } from "uuid";

export const locationState = atom({
  key: `location${v4()}`,
  default: { lat: 0, lng: 0 },
});
