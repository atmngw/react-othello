import React, {useEffect, useState} from 'react';
import {Board, Position} from 'components/uiParts/Board';
import {STONES} from 'utils/Stone';
import {Color} from "utils/Constants";
import {Pass} from 'components/uiParts/Pass';
import {Histories, History} from 'components/uiParts/Histories';
import {Information} from 'components/uiParts/Information';
import {putStone} from 'utils/FlipStone';
import {Squares} from "./Squares";

export const Playground: React.FC = () => {
  const [currentlyColor, setCurrentlyColor] = useState<Color>(STONES.BLACK)
  const [squares, setSquares] = useState<Squares>(Squares.initialize())
  const [histories, setHistories] = useState<History[]>([{squares: Squares.initialize(), color: STONES.BLACK}])

  const isEmpty = (position: Position): Boolean => {
    return squares.getStone(position) === STONES.EMPTY;
  }

  const getNextColor = (): Color => {
    return currentlyColor === STONES.BLACK ? STONES.WHITE : STONES.BLACK;
  }

  const changeTurn = (): void => {
    setCurrentlyColor(getNextColor())
  }

  const squareClick = (position: Position) => {
    if (!isEmpty(position)) return;

    let flippedSquares = putStone(position, currentlyColor, squares);

    // 差分が無い場合は更新しない
    if (flippedSquares.toString() === squares.toString()) return;
    flippedSquares.setStone(position, currentlyColor)

    setSquares(flippedSquares);
    setHistories(
      histories.concat([{
        squares: flippedSquares,
        color: currentlyColor
      }])
    );

    changeTurn();
  }

  useEffect(() => {
    if (squares.isFinished(currentlyColor, getNextColor())) alert('Finished')
  })

  return (
    <div>

      <Information
        currentlyColor={currentlyColor}
        isFinished={squares.isFinished(currentlyColor, getNextColor())}
        countColors={squares.countColors()}
      />

      <Pass
        possibleToPass={!squares.canPut(currentlyColor) && !squares.isFinished(currentlyColor, getNextColor())}
        pass={changeTurn}
      />

      <Board
        squares={squares}
        squareClick={squareClick}
      />

      <Histories histories={histories}/>
    </div>
  );
}