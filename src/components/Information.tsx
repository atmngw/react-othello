import React from 'react';
import {STONES, Color, toDisplay} from 'utils/Stone';
import {Squares} from 'components/Square';

type Props = {
  currentlyColor: number;
  squares: Squares;
}

export const Information: React.FC<Props> = ({currentlyColor, squares}) => {

  const countColor = (color: Color): number => {
    return squares.filter((value: Color) => value === color).length;
  }

  return (
    <div className='information'>
      <div className='stats'>
        <div className={`score ${currentlyColor === STONES.BLACK ? 'active' : 'inactive'}`}>
          <div className='count'>
            {toDisplay(STONES.BLACK)} &#058; {countColor(STONES.BLACK)}
          </div>
        </div>

        <div className={`score ${currentlyColor === STONES.WHITE ? 'active' : 'inactive'}`}>
          <div className='count'>
            {toDisplay(STONES.WHITE)} &#058; {countColor(STONES.WHITE)}
          </div>
        </div>
      </div>
    </div>
  );
}