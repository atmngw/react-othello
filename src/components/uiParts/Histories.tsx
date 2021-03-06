import React from 'react';
import {Square} from 'components/Square';
import {Squares, getPosition} from 'components/Squares';
import {toDisplay} from 'utils/Stone';
import {Color} from "utils/Constants";

export type History = {
  squares: Squares,
  color: Color,
};

type Props = {
  histories: History[];
}

export const Histories: React.FC<Props> = ({histories}) => {
  histories = histories.slice().reverse();

  const makeHistories = (): JSX.Element[] => {
    let historiesTables = []

    for (let idx in histories) {
      let rows = []
      for (let row = 1; row <= 8; row++) {
        let cols = []
        for (let col = 1; col <= 8; col++) {
          const position = getPosition(row, col);
          cols.push(
            <Square key={position} position={position} value={histories[idx].squares.getStone(position)} onClick={() => null}/>
          )
        }

        rows.push(<tr className="line" key={row} data-row={row}>{cols}</tr>)
      }

      const title = (count: number, color: Color): string => {
        const isInitial = count === 0;

        const title = isInitial ? '開始' : `第${count}手`;
        const stoneColor = isInitial ? '' : ' ' + toDisplay(color);

        return title + stoneColor;
      }

      const count = histories.length - parseInt(idx) - 1;

      historiesTables.push(
        <div className="item" key={idx}>
          <h3>{title(count, histories[idx].color)}</h3>
          <table className="square">
            <tbody>{rows}</tbody>
          </table>
        </div>)
    }
    return historiesTables
  }

  return (
    <div className="histories">
      <h2>Histories</h2>
      <div className="list">
        {makeHistories()}
      </div>
    </div>
  );
}