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
export function flip(currently_color: number, putPosition: number, diff: number, squares: (number | null)[]): (number | null)[] {
  const before_squares: (number | null)[] = squares.slice();
  let after_squares: (number | null)[] = squares.slice();
  let flipped_count = 0;


  let row: number;
  let left = 0
  let right = 63

  const put_row = (Math.floor(putPosition / 8) + 1)
  let check_position: number = putPosition;

  while (true) {
    check_position += diff;

    // ボード上に存在しない座標なら終了
    if (0 > check_position || 63 < check_position) {
      break;
    }

    // 検査対象行の両端を算出
    row = (Math.floor(check_position / 8) + 1)

    // -9/-8/-7/7/8/9は設置行と検査行が同一の場合SKIPさせる
    if ([-9, -8, -7, 7, 8, 9].includes(diff)) {
      if (put_row === row) break;
    }

    // -1/1は設置行と検査行が違う場合SKIPさせる
    if ([-1, 1].includes(diff)) {
      if (put_row !== row) break;
    }

    right = row * 8 - 1
    left = (row - 1) * 8

    // 両端の超えていたら終了
    if (check_position < left || check_position > right) {
      break;
    }

    // 空いていたら終了
    if (after_squares[check_position] === null) {
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
 * 盤面の位置番号を取得
 *
 * @param row
 * @param col
 */
export function getPosition(row: number, col: number): number {
  // 0から63までの位置を算出
  return (row - 1) * 8 + col - 1;
}