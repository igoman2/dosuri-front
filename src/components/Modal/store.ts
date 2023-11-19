import { ModalContent } from "@/types/common";
import { ReactNode } from "react";
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

export const modalContentState = atom<ModalContent>({
  key: `modalContentState${v4()}`,
  default: {
    title: "",
    content: "",
    actionCancel: { text: "", action: () => {} },
    actionWarn: { text: "", action: () => {} },
    actionConfirm: { text: "", action: () => {} },
  },
});
