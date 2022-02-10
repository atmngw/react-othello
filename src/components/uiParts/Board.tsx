import React from 'react';
import {Square} from 'components/Square';
import {getPosition, Squares} from 'components/Squares';
import {Color} from "utils/Constants";

type Props = {
  squares: Squares;
  squareClick: (position: number) => void;
}

export const Board: React.FC<Props> = ({squares, squareClick}) => {
  const renderSquare = (position: number): any => {

    return (
      <Square
        key={position}
        position={position}
        value={squares.getStone(position)}
        onClick={() => squareClick(position)}/>
    );
  }

  const makeTable = (): JSX.Element[] => {
    let rows = []
    for (let row = 1; row <= 8; row++) {
      let cols: Color[] = []
      for (let col = 1; col <= 8; col++) {
        const position = getPosition(row, col);
        cols.push(renderSquare(position))
      }

      rows.push(<tr className="line" key={row} data-row={row}>{cols}</tr>)
    }
    return rows
  }

  return (
    <div className='board'>
      <table className="table">
        <tbody>{makeTable()}</tbody>
      </table>
    </div>
  );
}

export type Position = number;
export type Row = number;
export type Col = number;
