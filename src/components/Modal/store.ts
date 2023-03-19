import { atom } from "recoil";
import { v4 } from "uuid";

export const modalState = atom({
  key: `modalState${v4()}`,
  default: {
    isActive: false,
    // action: () => {},
  },
});

export const closeModalDirectionState = atom({
  key: `closeModalDirectionState${v4()}`,
  default: {
    direction: "UP",
  },
});

export const modalContentState = atom({
  key: `modalContentState${v4()}`,
  default: {
    title: "",
    content: "",
    actionLeft: { text: "", action: () => {} },
    actionRight: { text: "", action: () => {} },
    // actionString: "",
  },
});
