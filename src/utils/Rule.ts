import {Squares} from "components/Square";
import {Stone, Color} from 'components/Stone';
import {Position, Col, Row} from "components/Board";

/**
 * 石の反転処理
 *
 * @param currently_color
 * @param putPosition
 * @param diff
 * @param squares
 *
 * @return [] 変更後の配置または、反転不可の場合は変更前の配列を返却
 */
export function flip(currently_color: Color, putPosition: Position, diff: number, squares: Squares): Squares {
  const before_squares: Squares = squares.slice();
  let after_squares: Squares = squares.slice();
  let flipped_count = 0;


  let base_row: number;
  let check_row: number;
  let left = 0
  let right = 63

  let check_position: Position = putPosition;

  while (true) {
    base_row = (Math.floor(check_position / 8) + 1)
    check_position += diff;

    // ボード上に存在しない座標なら終了
    if (0 > check_position || 63 < check_position) {
      break;
    }

    // 検査対象行の両端を算出
    check_row = (Math.floor(check_position / 8) + 1)

    // 真横以外の検査では設置行と検査行が隣接している場合のみ許容する
    if ([-9, -8, -7, 7, 8, 9].includes(diff)) {
      if (Math.abs(base_row - check_row) !== 1) break;
    }

    // -1/1は設置行と検査行が同じ場合のみ許容する
    if ([-1, 1].includes(diff)) {
      if (base_row !== check_row) break;
    }

    right = check_row * 8 - 1
    left = (check_row - 1) * 8

    // 両端の超えていたら終了
    if (check_position < left || check_position > right) {
      break;
    }

    // 空いていたら終了
    if (after_squares[check_position] === Stone.EMPTY) {
      break;
    }

    // 同じ色なら反転終了
    if (currently_color === after_squares[check_position]) {
      if (flipped_count >= 1) {
        return after_squares;
      }

      break;
    }

    after_squares[check_position] = currently_color;
    flipped_count++;
  }

  return before_squares;
}

/**
 * 配置可能か検査
 * @param squares
 * @param currently_color
 * @return boolean
 */
export function canPut(squares: Squares, currently_color: Color): boolean {
  const checkCanPut = function (value: number, position: Position): boolean {
    if (squares[position] === Stone.EMPTY) {
      // 全方向への設置
      const diff_list = [-9, -8, -7, 1, 9, 8, 7, -1];
      for (let i = 0; i < diff_list.length; i++) {
        const diff = diff_list[i];
        const flipped_squares: Squares = flip(currently_color, position, diff, squares);
        if (flipped_squares.toString() !== squares.toString()) {
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