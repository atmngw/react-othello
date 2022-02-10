import React from 'react';
import {Color, STONES, toDisplay} from 'utils/Stone';
import {Squares} from 'components/Squares';
import {Position} from 'components/Board';

type Props = {
  position: Position;
  value: Color;
  onClick: () => void;
}

export const Square: React.FC<Props> = ({position, value, onClick}) => {
  const getStoneValue = (): string => {
    return toDisplay(value);
  }

  return (
    <td className="square"
        data-index={position}
        onClick={() => onClick()}>
      {getStoneValue()}
    </td>
  );
}

export const countColors = (squares: Squares): {[key: number]: number } => {
  const result: {[key:number]: number} = {}

  result[STONES.BLACK] = squares.filter((color: Color) => STONES.BLACK === color).length
  result[STONES.WHITE] = squares.filter((color: Color) => STONES.WHITE === color).length
  return result
}
