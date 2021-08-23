import React from 'react';
import {Stone, Color} from 'components/Stone';
import {Squares} from 'components/Square';

type Props = {
  currently_color: number;
  squares: Squares;
}

type TCount = number;

export const Information: React.FC<Props> = (props: any) => {

  const countColor = (color: Color): TCount => {
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