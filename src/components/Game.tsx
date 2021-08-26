import React, {useState} from 'react';
import {Board, Position} from 'components/Board';
import {Color, STONES} from 'utils/Stone';
import {Pass} from 'components/Pass';
import {Histories, History} from 'components/Histories';
import {Information} from 'components/Information';
import {Squares} from 'components/Square';
import {flip, canPut} from 'utils/Rule';

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
    flippedSquares = flip(currentlyColor, position, -9, flippedSquares);

    // 真上
    flippedSquares = flip(currentlyColor, position, -8, flippedSquares);

    // 右斜上
    flippedSquares = flip(currentlyColor, position, -7, flippedSquares);

    // 右
    flippedSquares = flip(currentlyColor, position, 1, flippedSquares);

    // 右斜下
    flippedSquares = flip(currentlyColor, position, 9, flippedSquares);

    // 真下
    flippedSquares = flip(currentlyColor, position, 8, flippedSquares);

    // 左斜下
    flippedSquares = flip(currentlyColor, position, 7, flippedSquares);

    // 左
    flippedSquares = flip(currentlyColor, position, -1, flippedSquares);

    return flippedSquares;
  }

  const isEmpty = (position: Position): Boolean => {
    return squares[position] === STONES.EMPTY;
  }

  const changeTurn = (): void => {
    const nextColor: number = currentlyColor === STONES.BLACK ? STONES.WHITE : STONES.BLACK;
    setCurrentlyColor(nextColor)
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

  const possibleToPass = (): boolean => {
    return !canPut(squares.slice(), currentlyColor);
  }

  return (
    <div>
      <Information
        currentlyColor={currentlyColor}
        squares={squares.slice()}
      />

      <Pass
        possibleToPass={possibleToPass()}
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