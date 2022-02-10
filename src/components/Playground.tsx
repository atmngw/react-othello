import React, {useEffect, useState} from 'react';
import {Board, Position} from 'components/uiParts/Board';
import {Color, STONES} from 'utils/Stone';
import {Pass} from 'components/uiParts/Pass';
import {Histories, History} from 'components/uiParts/Histories';
import {Information} from 'components/uiParts/Information';
import {countColors} from 'components/Square';
import {Squares} from 'components/Squares';
import {canPut, putStone} from 'utils/Rule';

const initialSquares = (): Squares => {
  const squares = Array(64).fill(STONES.EMPTY)

  squares[27] = STONES.WHITE
  squares[28] = STONES.BLACK
  squares[35] = STONES.BLACK
  squares[36] = STONES.WHITE
  return squares
}

export const Playground: React.FC = () => {
  const [currentlyColor, setCurrentlyColor] = useState<Color>(STONES.BLACK)
  const [squares, setSquares] = useState<Squares>(initialSquares())
  const [histories, setHistories] = useState<History[]>([{squares: initialSquares(), color: STONES.BLACK}])

  const isEmpty = (position: Position): Boolean => {
    return squares[position] === STONES.EMPTY;
  }

  const getNextColor = (): Color => {
    return currentlyColor === STONES.BLACK ? STONES.WHITE : STONES.BLACK;
  }

  const changeTurn = (): void => {
    setCurrentlyColor(getNextColor())
  }

  const squareClick = (position: Position) => {
    if (!isEmpty(position)) return;

    let flippedSquares = putStone(position, currentlyColor, squares.slice());

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
    const canPutNextColor: boolean = canPut(current_squares, getNextColor());

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