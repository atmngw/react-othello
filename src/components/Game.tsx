import React, {useEffect, useState} from 'react';
import {Board, Position} from 'components/Board';
import {Color, STONES} from 'utils/Stone';
import {Pass} from 'components/Pass';
import {Histories, History} from 'components/Histories';
import {Information} from 'components/Information';
import {countColors, Squares} from 'components/Square';
import {memorizedFlip, canPut} from 'utils/Rule';

const initialSquares = (): Squares => {
  const squares = Array(64).fill(STONES.EMPTY)

  squares[27] = STONES.WHITE
  squares[28] = STONES.BLACK
  squares[35] = STONES.BLACK
  squares[36] = STONES.WHITE
  return squares
}

export const Game: React.FC = () => {
  const [currentlyColor, setCurrentlyColor] = useState<Color>(STONES.BLACK)
  const [squares, setSquares] = useState<Squares>(initialSquares())
  const [histories, setHistories] = useState<History[]>([{squares: initialSquares(), color: STONES.BLACK}])

  const flipStone = (position: Position): Squares => {
    // 反転した石の設置箇所
    let flippedSquares: Squares = squares.slice();

    // 現在石があるか
    if (squares[position] !== STONES.EMPTY) {
      return flippedSquares;
    }

    // 設置後のボードで反転処理を行う
    // 左斜め上
    flippedSquares = memorizedFlip(currentlyColor, position, -9, flippedSquares);

    // 真上
    flippedSquares = memorizedFlip(currentlyColor, position, -8, flippedSquares);

    // 右斜上
    flippedSquares = memorizedFlip(currentlyColor, position, -7, flippedSquares);

    // 右
    flippedSquares = memorizedFlip(currentlyColor, position, 1, flippedSquares);

    // 右斜下
    flippedSquares = memorizedFlip(currentlyColor, position, 9, flippedSquares);

    // 真下
    flippedSquares = memorizedFlip(currentlyColor, position, 8, flippedSquares);

    // 左斜下
    flippedSquares = memorizedFlip(currentlyColor, position, 7, flippedSquares);

    // 左
    flippedSquares = memorizedFlip(currentlyColor, position, -1, flippedSquares);

    return flippedSquares;
  }

  const isEmpty = (position: Position): Boolean => {
    return squares[position] === STONES.EMPTY;
  }

  const getNetxtColor = (): Color => {
    return currentlyColor === STONES.BLACK ? STONES.WHITE : STONES.BLACK;
  }

  const changeTurn = (): void => {
    setCurrentlyColor(getNetxtColor())
  }

  const squareClick = (position: Position) => {
    if (!isEmpty(position)) return;

    let flippedSquares = flipStone(position);

    // 差分があればターンチェンジ
    if (flippedSquares.toString() === squares.toString()) return;

    flippedSquares[position] = currentlyColor;
    setSquares(flippedSquares);
    setHistories(
      histories.concat([{
        squares: flippedSquares,
        color: currentlyColor
      }])
    );

    changeTurn();
  }

  /**
   * 全てのマスに石を置いた
   */
  const isPutAll = (): boolean => {
    return squares.filter((color: Color) => STONES.EMPTY === color).length === 0;
  }

  /**
   * どちらかの石が設置可能である
   */
  const canPutEither = (): boolean => {
    let current_squares: Squares = squares.slice();

    // 次の石が設置可能か
    const canPutNextColor: boolean = canPut(current_squares, getNetxtColor());

    return canPut(current_squares, currentlyColor) || canPutNextColor
  }

  /**
   * ゲーム終了判定
   */
  const isFinished = (): boolean => {
    // 全てのマスが埋まった or どちらも設置不可の場合
    return isPutAll() || !canPutEither();
  }

  useEffect(() => {
    if (isFinished()) alert('Finished')
  })

  return (
    <div>

      <Information
        currentlyColor={currentlyColor}
        squares={squares.slice()}
        isFinished={isFinished()}
        countColors={countColors(squares)}
      />

      <Pass
        possibleToPass={!canPut(squares.slice(), currentlyColor) && !isFinished()}
        pass={changeTurn}
      />

      <Board
        squares={squares.slice()}
        squareClick={squareClick}
      />

      <Histories histories={histories}/>
    </div>
  );
}