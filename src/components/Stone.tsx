export const STONES = {
  EMPTY: 0,
  BLACK: 1,
  WHITE: 2
} as const;

// export type STONES = typeof STONES[keyof typeof STONES];

export type Color = number;

export function toDisplay(color: Color): string {
  if (color === STONES.BLACK) return '●';
  if (color === STONES.WHITE) return '◯';
  return '';
}