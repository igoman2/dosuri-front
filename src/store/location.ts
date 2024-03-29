import { atom } from "recoil";
import { v4 } from "uuid";

export interface Location {
  lat: number;
  lng: number;
  addressName?: string;
  address?: string;
}
export const locationState = atom<Location>({
  key: `location${v4()}`,
  default: { lat: 0, lng: 0 },
});
