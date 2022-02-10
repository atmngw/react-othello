import {STONES} from "../utils/Stone";
import {Color} from "utils/Constants";
import {memorizedFlip} from "../utils/FlipStone";
import {Col, Position, Row} from "./uiParts/Board";

export class Squares {
  private readonly squares: Color[];

  constructor(squares: Color[]) {
    this.squares = squares
  }

  static initialize(): Squares {
    let squares = Array(64).fill(STONES.EMPTY)

    squares[27] = STONES.WHITE
    squares[28] = STONES.BLACK
    squares[35] = STONES.BLACK
    squares[36] = STONES.WHITE
     return new Squares(squares)
  }

  getStone(position: Position): Color {
    return this.squares[position]
  }

  setStone(position: Position, color: Color): void {
    this.squares[position] = color
  }

  values(): Color[] {
    return this.squares.slice()
  }

  toString(): string {
    return this.squares.toString()
  }

  /**
   * 全てのマスに石を置いた
   */
  isFilled(): boolean {
    return this.squares.filter((color: Color) => STONES.EMPTY === color).length === 0;
  }

  /**
   * 未配置のマスに配置可能か検査
   * @param currentlyColor
   * @return boolean
   */
  canPut(currentlyColor: Color): boolean {
    let squares = new Squares(this.squares)

    const checkCanPut = function (value: number, position: Position): boolean {
      if (squares.getStone(position) === STONES.EMPTY) {
        // 全方向への設置
        const diffList = [-9, -8, -7, 1, 9, 8, 7, -1];
        for (let i = 0; i < diffList.length; i++) {
          const diff = diffList[i];
          const flippedSquares: Color[] = memorizedFlip(currentlyColor, position, diff, squares.values());
          if (flippedSquares.toString() !== squares.toString()) {
            return true;
          }
        }
      }

      return false;
    }

    return this.squares.some(checkCanPut);
  }

  /**
   * どちらかの石が設置可能である
   */
  canPutEither(currentlyColor: Color, nextColor: Color): boolean {
    // 次の石が設置可能か
    const canPutNextColor: boolean = this.canPut(nextColor);

    return this.canPut(currentlyColor) || canPutNextColor
  }

  /**
   * ゲーム終了判定
   */
  isFinished(currentlyColor: Color, nextColor: Color): boolean {
    // 全てのマスが埋まった or どちらも設置不可の場合
    return this.isFilled() || !this.canPutEither(currentlyColor, nextColor);
  }

  countColors (): {[key: number]: number } {
    const result: {[key:number]: number} = {}

    result[STONES.BLACK] = this.values().filter((color: Color) => STONES.BLACK === color).length
    result[STONES.WHITE] = this.values().filter((color: Color) => STONES.WHITE === color).length
    return result
  }
}

/**
 * 盤面の位置番号を取得
 *
 * @param row
 * @param col
 */
export function getPosition(row: Row, col: Col): Position {
  // 0から63までの位置を算出
  return (row - 1) * 8 + col - 1;
}