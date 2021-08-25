import React from 'react';
import {Square, Squares} from 'components/Square';
import {Color, toDisplay} from 'utils/Stone';
import {getPosition} from 'utils/Rule';

type Props = {
  histories: History[];
}

export type History = {
  squares: Squares,
  color: Color,
};

export const Histories: React.FC<Props> = ({histories}) => {
  let histories_tables = []
  histories = histories.slice().reverse();

  for (let idx in histories) {
    let rows = []
    for (let row = 1; row <= 8; row++) {
      let cols = []
      for (let col = 1; col <= 8; col++) {
        const position = getPosition(row, col);
        cols.push(
          <Square key={position} position={position} value={histories[idx].squares[position]} onClick={() => null}/>
        )
      }

      rows.push(<tr className="line" key={row} data-row={row}>{cols}</tr>)
    }

    const title = (count: number, color: Color): string => {
      const is_initial = count === 0;

      const title = is_initial ? '開始' : `第${count}手`;
      const stone_color = is_initial ? '' : ' ' + toDisplay(color);

      return title + stone_color;
    }

    const count = histories.length - parseInt(idx) - 1;

    histories_tables.push(
      <div className="item" key={idx}>
        <h3>{title(count, histories[idx].color)}</h3>
        <table className="square">
          <tbody>{rows}</tbody>
        </table>
      </div>)
  }

  return (
    <div className="histories">
      <h2>Histories</h2>
      <div className="list">
        {histories_tables}
      </div>
    </div>
  );
}