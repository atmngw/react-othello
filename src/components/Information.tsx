import React from 'react';
import {STONES, toDisplay} from 'utils/Stone';
import {Squares} from 'components/Square';

type Props = {
  currentlyColor: number;
  squares: Squares;
  isFinished: boolean;
  countColors: { [key: number]: number };
}

export const Information: React.FC<Props> = ({currentlyColor, squares, isFinished, countColors}) => {
  const black_state = !isFinished && currentlyColor === STONES.BLACK ? 'active' : 'inactive'
  const class_white = !isFinished && currentlyColor === STONES.WHITE ? 'active' : 'inactive'

  /**
   * 勝敗の表示
   * @constructor
   */
  const GameResult: React.FC<{}> = () => {
    const blackCount = countColors[STONES.BLACK]
    const whiteCount = countColors[STONES.WHITE]

    let tag;
    if (blackCount === whiteCount) {
      tag = <div className={'game-end'}>引き分け</div>
    } else if (blackCount > whiteCount) {
      tag = <div className={'game-end'}>BLACKの勝ち</div>
    } else {
      tag = <div className={'game-end'}>WHITEの勝ち</div>
    }

    return (
      tag
    );
  }

  let gameResult = null
  if (isFinished) {
    gameResult = <GameResult />
  }

  return (
    <div className='information'>

      {gameResult}

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