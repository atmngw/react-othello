import React from 'react';
import {STONES, Color, toDisplay} from 'components/Stone';
import {Squares} from 'components/Square';

type Props = {
  currently_color: number;
  squares: Squares;
}

export const Information = (props: Props) => {

  const countColor = (color: Color): number => {
    return props.squares.filter((value: Color) => value === color).length;
  }

  return (
    <div className='information'>
      <div className='stats'>
        <div className={`score ${props.currently_color === STONES.BLACK ? 'active' : 'inactive'}`}>
          <div className='count'>
            {toDisplay(STONES.BLACK)} &#058; {countColor(STONES.BLACK)}
          </div>
        </div>

        <div className={`score ${props.currently_color === STONES.WHITE ? 'active' : 'inactive'}`}>
          <div className='count'>
            {toDisplay(STONES.WHITE)} &#058; {countColor(STONES.WHITE)}
          </div>
        </div>
      </div>
    </div>
  );
}