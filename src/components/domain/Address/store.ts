import { SelectedMyAddress } from "@/types/location";
import { atom } from "recoil";
import { v4 } from "uuid";

export const addressModalState = atom({
  key: `addressModalState${v4()}`,
  default: {
    isActive: false,
    // action: () => {},
  },
});

export const addressModalContentState = atom({
  key: `addressModalContentState${v4()}`,
  default: {
    title: "",
    content: "",
    actionCancel: { text: "", action: () => {} },
    actionWarn: { text: "", action: () => {} },
    actionConfirm: { text: "", action: () => {} },
    // actionString: "",
  },
});

export const addressModeState = atom<number[]>({
  key: `addressModeState${v4()}`,
  default: [0],
});

export const addressObject = atom({
  key: `addressObject${v4()}`,
  default: {
    address_name: "",
    address: "",
  },
});

// export const selectedAddressObject = atom({
//   key: `selectedAddressObject${v4()}`,
//   default: {
//     uuid: "",
//     name: "",
//     address: "",
//     address_type: "",
//     latitude: 0,
//     longitude: 0,
//   },
// });

export const selectedAddressObject = atom<SelectedMyAddress>({
  key: `selectedAddressObject${v4()}`,
  default: {
    uuid: "",
    name: "",
    alias: "",
    address: "",
    address_type: "",
    latitude: 0,
    longitude: 0,
    is_main: false,
  },
});

export const isNewAddress = atom<boolean>({
  key: `isNewAddress${v4()}`,
  default: false,
});

export const defaultAddressType = atom<string>({
  key: `defaultAddressType${v4()}`,
  default: "",
});

export const locationState = atom({
  key: `locationState${v4()}`,
  default: {
    latitude: 0,
    longitude: 0,
  },
});
