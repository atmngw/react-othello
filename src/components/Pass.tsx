import React from 'react';

type Props = {
  possibleToPass: boolean,
  pass: () => void
}

export const Pass: React.FC<Props> = ({possibleToPass, pass}) => {
  return (
    <div className='pass-button'>
      <button disabled={!possibleToPass} onClick={pass}>パスする</button>
    </div>
  );
}