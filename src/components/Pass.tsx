import React from 'react';

const Pass = (props: any) => {
  return (
    <div className='pass-button'>
      <button disabled={!props.possibleToPass} onClick={props.pass}>パスする</button>
    </div>
  );
}

export default Pass