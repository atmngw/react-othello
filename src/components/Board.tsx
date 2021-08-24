import React from 'react';
import {Square, Squares} from 'components/Square';
import {getPosition} from 'utils/Rule';

type Props = {
  currently_color: number;
  squares: Squares;
  histories: any[];
  squareClick: (position: number) => void;
}

type State = {}

export const Board = (props: Props, state: State) => {
  const renderSquare = (position: number): any => {
    const squares = props.squares.slice();

    return (
      <Square
        key={position}
        position={position}
        value={squares[position]}
        onClick={() => props.squareClick(position)}/>
    );
  }

  let rows = []
  for (let row = 1; row <= 8; row++) {
    let cols = []
    for (let col = 1; col <= 8; col++) {
      const position = getPosition(row, col);
      cols.push(renderSquare(position))
    }

    rows.push(<tr className="line" key={row} data-row={row}>{cols}</tr>)
  }

  return (
    <div className='board'>
      <table className="table">
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export type Position = number;
export type Row = number;
export type Col = number;
