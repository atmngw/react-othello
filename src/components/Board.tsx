import React from 'react';
import {Square, Squares} from 'components/Square';
import {getPosition} from 'utils/Rule';

type Props = {
  squares: Squares;
  squareClick: (position: number) => void;
}

export const Board: React.FC<Props> = ({squares, squareClick}) => {
  const renderSquare = (position: number): any => {
    squares = squares.slice();

    return (
      <Square
        key={position}
        position={position}
        value={squares[position]}
        onClick={() => squareClick(position)}/>
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
