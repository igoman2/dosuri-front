
import { ReactNode } from "react";

export const DIRECTION = {
  Up: "UP",
  Down: "Down",
} as const;
export type DIRECTION = typeof DIRECTION[keyof typeof DIRECTION]; // 'UP' | DOWN'

export type ModalContent = {
  title: string;
  content: ReactNode;
  actionCancel: { text: string; action: () => void };
  actionWarn: { text: string; action: () => void };
  actionConfirm: { text: string; action: () => void };
  qr?: { text: string, qrValues: {value: string, size: number}}
};
