import React from 'react';

import Stone from './Stone';

interface IState {
}

interface IPos {
  position: number;
  value: (null | number);
  onClick: () => void;
}

class Square extends React.Component<IPos, IState> {
  getStoneValue(): string|null {
    if (this.props.value !== null) {
      return Stone.toDisplay(this.props.value);
    }
    return null;
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

export default Square;