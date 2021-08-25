import React from 'react';
import {Color, toDisplay} from 'components/Stone';
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

export type Squares = Color[];
