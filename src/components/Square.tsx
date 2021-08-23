import React from 'react';
import {Stone, Color, DisplayColor} from 'components/Stone';
import {Position} from 'components/Board';

type State = {}

type Props = {
  position: Position;
  value: Color;
  onClick: () => void;
}

export class Square extends React.Component<Props, State> {
  getStoneValue(): DisplayColor {
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

export type Squares = Color[];
