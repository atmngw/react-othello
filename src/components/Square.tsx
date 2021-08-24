import React from 'react';
import {Color, toDisplay} from 'components/Stone';
import {Position} from 'components/Board';

type State = {}

type Props = {
  position: Position;
  value: Color;
  onClick: () => void;
}

export const Square = (props: Props, state: State) => {
  const getStoneValue = (): string => {
    return toDisplay(props.value);
  }

  return (
    <td className="square"
        data-index={props.position}
        onClick={() => props.onClick()}>
      {getStoneValue()}
    </td>
  );
}

export type Squares = Color[];
