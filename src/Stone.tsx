export default class Stone {
  static readonly BLACK = 1;
  static readonly WHITE = 2;

  static toDisplay = (color: number): string => {
    return color === Stone.BLACK ? '●' : '◯'
  }
}