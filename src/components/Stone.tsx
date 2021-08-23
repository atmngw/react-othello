export class Stone {
  static readonly EMPTY = 0;
  static readonly BLACK = 1;
  static readonly WHITE = 2;

  static toDisplay = (color: Color): DisplayColor => {
    if (color === Stone.BLACK) return '●';
    if (color === Stone.WHITE) return '◯';
    return '';
  }
}

export type Color = number;
export type DisplayColor = string;