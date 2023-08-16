import { ReactNode } from "react";

export const DIRECTION = {
  Up: "UP",
  Down: "Down",
} as const;
export type DIRECTION = typeof DIRECTION[keyof typeof DIRECTION]; // 'UP' | DOWN'

export type ModalContent = {
  title: string;
  content: ReactNode;
  actionCancel: { text: ReactNode; action: () => void };
  actionWarn: { text: ReactNode; action: () => void };
  actionConfirm: { text: ReactNode; action: () => void };
};
