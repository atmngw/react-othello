import React from 'react';
import {STONES, toDisplay} from 'utils/Stone';

type GameResultProps = {
  countColors: { [key: number]: number };
  isFinished: boolean;
}

/**
 * 勝敗の表示
 * @constructor
 */
const GameResult: React.FC<GameResultProps> = ({countColors, isFinished}) => {
  const blackCount = countColors[STONES.BLACK]
  const whiteCount = countColors[STONES.WHITE]

  let tag = null;

  if (isFinished) {
    if (blackCount === whiteCount) {
      tag = <div className={'game-end'}>引き分け</div>
    } else if (blackCount > whiteCount) {
      tag = <div className={'game-end'}>BLACKの勝ち</div>
    } else {
      tag = <div className={'game-end'}>WHITEの勝ち</div>
    }
  }

  return (
    tag
  );
}

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