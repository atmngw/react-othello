import React from 'react';
import Stone, {TColor} from 'components/Stone';
import {TSquare, TSquares} from 'components/Square';

type Props = {
  currently_color: number;
  squares: TSquares;
}

type TCount = number;

const Information: React.FC<Props> = (props: any) => {

  const countColor = (color: TColor): TCount => {
    return props.squares.filter((value: TSquare) => value === color).length;
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

export default Information