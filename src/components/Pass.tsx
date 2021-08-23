import React from 'react';

type Props = {
  possibleToPass: boolean,
  pass: () => void
}

export const Pass = (props: Props) => {
  return (
    <div className='pass-button'>
      <button disabled={!props.possibleToPass} onClick={props.pass}>パスする</button>
    </div>
  );
}