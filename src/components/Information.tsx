import React from 'react';
import {Stone, Color} from 'components/Stone';
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
        <div className={`score ${props.currently_color === Stone.BLACK ? 'active' : 'inactive'}`}>
          <div className='count'>
            {Stone.toDisplay(Stone.BLACK)} &#058; {countColor(Stone.BLACK)}
          </div>
        </div>

        <div className={`score ${props.currently_color === Stone.WHITE ? 'active' : 'inactive'}`}>
          <div className='count'>
            {Stone.toDisplay(Stone.WHITE)} &#058; {countColor(Stone.WHITE)}
          </div>
        </div>
      </div>
    </div>
  );
}