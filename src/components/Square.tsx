import React from 'react';
import {toDisplay} from 'utils/Stone';
import {Color} from "../utils/Constants";
import {Position} from 'components/uiParts/Board';

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