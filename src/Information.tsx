import React from "react";
import Stone from './Stone';

interface IPos {
  currently_color: number;
  squares: (number | null)[];
}


const Information: React.FC<IPos> = (props: any) => {

  const countColor = (color: number): number => {
    return props.squares.filter((value: null|number) => value !== null && value === color).length;
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