import {Squares} from 'components/Squares';
import {STONES, Color} from 'utils/Stone';
import {Position, Col, Row} from "components/uiParts/Board";

let flippedCache: { [key: string]: Squares } = {}

/**
 * flipの実行結果を返す
 *
 * @param currentlyColor
 * @param putPosition
 * @param diff
 * @param squares
 */
export const memorizedFlip = (currentlyColor: Color, putPosition: Position, diff: number, squares: Squares) => {
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
 * @return Squares 変更後の配置または、反転不可の場合は変更前の配列を返却
 */
const flip = (currentlyColor: Color, putPosition: Position, diff: number, squares: Squares): Squares => {
  const beforeSquares: Squares = squares.slice();
  let afterSquares: Squares = squares.slice();
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
 * 未配置のマスに配置可能か検査
 * @param squares
 * @param currentlyColor
 * @return boolean
 */
export function canPut(squares: Squares, currentlyColor: Color): boolean {
  const checkCanPut = function (value: number, position: Position): boolean {
    if (squares[position] === STONES.EMPTY) {
      // 全方向への設置
      const diffList = [-9, -8, -7, 1, 9, 8, 7, -1];
      for (let i = 0; i < diffList.length; i++) {
        const diff = diffList[i];
        const flippedSquares: Squares = memorizedFlip(currentlyColor, position, diff, squares);
        if (flippedSquares.toString() !== squares.toString()) {
          return true;
        }
      }
    }

    return false;
  }

  return squares.some(checkCanPut);
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