import {Color} from "./Constants";

export const STONES = {
  EMPTY: 0,
  BLACK: 1,
  WHITE: 2
} as const;

export function toDisplay(color: Color): string {
  if (color === STONES.BLACK) return '●';
  if (color === STONES.WHITE) return '◯';
  return '';
}