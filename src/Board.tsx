import Stone from './Stone'
import React from "react";
import Square from "./Square";
import {getPosition} from './Rule';

interface IPos {
  currently_color: number;
  squares: (number | null)[];
  histories: any[];
  squareClick: (position: number) => void;
}

interface IState {
}

class Board extends React.Component<IPos, IState> {
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
    console.log(this.props.currently_color === Stone.BLACK ? 'Black' : 'White');
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
      <div>
        <table className="table">
          {rows}
        </table>
      </div>
    );
  }
}

export default Board;
