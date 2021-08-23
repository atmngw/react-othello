import React from 'react';
import {Square, TSquares} from 'components/Square';
import {getPosition} from 'utils/Rule';

type Props = {
  currently_color: number;
  squares: TSquares;
  histories: any[];
  squareClick: (position: number) => void;
}

type State = {
}

class Board extends React.Component<Props, State> {
  renderSquare(position: number): any {
    const squares = this.props.squares.slice();

    return (
      <Square
        key={position}
        position={position}
        value={squares[position]}
        onClick={() => this.props.squareClick(position)}/>
    );
  }

  render() {
    let rows = []
    for (let row = 1; row <= 8; row++) {
      let cols = []
      for (let col = 1; col <= 8; col++) {
        const position = getPosition(row, col);
        cols.push(this.renderSquare(position))
      }

      rows.push(<tr className="line" key={row} data-row={row}>{cols}</tr>)
    }

    return (
      <div className='board'>
        <table className="table">
          {rows}
        </table>
      </div>
    );
  }
}

export type TPosition = number;
export type TRow = number;
export type TCol = number;
export default Board;
