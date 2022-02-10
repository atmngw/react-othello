import React from 'react';
import {STONES, toDisplay} from 'utils/Stone';
import {GameResult} from "./GameResult";

type InformationProps = {
  currentlyColor: number;
  isFinished: boolean;
  countColors: { [key: number]: number };
}

export const Information: React.FC<InformationProps> = ({currentlyColor, isFinished, countColors}) => {
  const black_state = !isFinished && currentlyColor === STONES.BLACK ? 'active' : 'inactive'
  const class_white = !isFinished && currentlyColor === STONES.WHITE ? 'active' : 'inactive'

  return (
    <div className='information'>

      <GameResult
        countColors={countColors}
        isFinished={isFinished}
      />

      <div className='stats'>
        <div className={`score ${black_state}`}>
          <div className='count'>
            {toDisplay(STONES.BLACK)} &#058; {countColors[STONES.BLACK]}
          </div>
        </div>
        <div className={`score ${class_white}`}>
          <div className='count'>
            {toDisplay(STONES.WHITE)} &#058; {countColors[STONES.WHITE]}
          </div>
        </div>
      </div>
    </div>
  );
}