import {STONES} from 'utils/Stone';
import {Color} from "./Constants";
import {Position} from "components/uiParts/Board";
import {Squares} from "../components/Squares";

let flippedCache: { [key: string]: Color[] } = {}

/**
 * flipの実行結果を返す
 *
 * @param currentlyColor
 * @param putPosition
 * @param diff
 * @param squares
 */
export const memorizedFlip = (currentlyColor: Color, putPosition: Position, diff: number, squares: Color[]) => {
  const key = currentlyColor + ':' + putPosition + ':' + diff + ':' + squares.join('')

  if (!flippedCache[key]) {
    flippedCache[key] = flip(currentlyColor, putPosition, diff, squares)
  }
  return flippedCache[key];
}

/**
 * 石の反転処理
 *
 * @param currentlyColor
 * @param putPosition
 * @param diff
 * @param squares
 *
 * @return Color[] 変更後の配置または、反転不可の場合は変更前の配列を返却
 */
const flip = (currentlyColor: Color, putPosition: Position, diff: number, squares: Color[]): Color[] => {
  const beforeSquares: Color[] = squares.slice();
  let afterSquares: Color[] = squares.slice();
  let flippedCount = 0;


  let baseRow: number;
  let checkRow: number;
  let left = 0
  let right = 63

  let checkPosition: Position = putPosition;

  while (true) {
    baseRow = (Math.floor(checkPosition / 8) + 1)
    checkPosition += diff;

    // ボード上に存在しない座標なら終了
    if (0 > checkPosition || 63 < checkPosition) {
      break;
    }

    // 検査対象行の両端を算出
    checkRow = (Math.floor(checkPosition / 8) + 1)

    // 真横以外の検査では設置行と検査行が隣接している場合のみ許容する
    if ([-9, -8, -7, 7, 8, 9].includes(diff)) {
      if (Math.abs(baseRow - checkRow) !== 1) break;
    }

    // -1/1は設置行と検査行が同じ場合のみ許容する
    if ([-1, 1].includes(diff)) {
      if (baseRow !== checkRow) break;
    }

    right = checkRow * 8 - 1
    left = (checkRow - 1) * 8

    // 両端の超えていたら終了
    if (checkPosition < left || checkPosition > right) {
      break;
    }

    // 空いていたら終了
    if (afterSquares[checkPosition] === STONES.EMPTY) {
      break;
    }

    // 同じ色なら反転終了
    if (currentlyColor === afterSquares[checkPosition]) {
      if (flippedCount >= 1) {
        return afterSquares;
      }

      break;
    }

    afterSquares[checkPosition] = currentlyColor;
    flippedCount++;
  }

  return beforeSquares;
}

/**
 * 石の配置
 *
 * @param putPosition
 * @param currentlyColor
 * @param squares
 */
export const putStone = (putPosition: Position, currentlyColor: Color, squares: Squares): Squares => {
  // 現在石があるか
  if (squares.getStone(putPosition) !== STONES.EMPTY) {
    return squares;
  }

  // 反転した石の設置箇所
  let flippedSquares: Color[] = squares.values();

  // 設置後のボードで反転処理を行う
  // 左斜め上
  flippedSquares = memorizedFlip(currentlyColor, putPosition, -9, flippedSquares);

  // 真上
  flippedSquares = memorizedFlip(currentlyColor, putPosition, -8, flippedSquares);

  // 右斜上
  flippedSquares = memorizedFlip(currentlyColor, putPosition, -7, flippedSquares);

  // 右
  flippedSquares = memorizedFlip(currentlyColor, putPosition, 1, flippedSquares);

  // 右斜下
  flippedSquares = memorizedFlip(currentlyColor, putPosition, 9, flippedSquares);

  // 真下
  flippedSquares = memorizedFlip(currentlyColor, putPosition, 8, flippedSquares);

  // 左斜下
  flippedSquares = memorizedFlip(currentlyColor, putPosition, 7, flippedSquares);

  // 左
  flippedSquares = memorizedFlip(currentlyColor, putPosition, -1, flippedSquares);

  return new Squares(flippedSquares.slice());
}