import React from 'react';

export const Pass = (props: any) => {
  return (
    <div className='pass-button'>
      <button disabled={!props.possibleToPass} onClick={props.pass}>パスする</button>
    </div>
  );
}