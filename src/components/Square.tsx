import React from 'react';
import Stone, {TColor, TDisplayColor} from 'components/Stone';
import {TPosition} from 'components/Board';

interface IState {
}

interface IPos {
  position: TPosition;
  value: TColor;
  onClick: () => void;
}

export class Square extends React.Component<IPos, IState> {
  getStoneValue(): TDisplayColor {
    return Stone.toDisplay(this.props.value);
  }

  render() {
    return (
      <td className="square"
          data-index={this.props.position}
          onClick={() => this.props.onClick()}>
        {this.getStoneValue()}
      </td>
    );
  }
}

export type TSquare = number;
export type TSquares = TSquare[];
