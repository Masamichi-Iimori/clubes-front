// components/Increment.tsx  
import React, { Dispatch } from 'react';

const Increment: React.FC<{ count: number, setCount: Dispatch<number> }> = ({ count, setCount }) => {
  const clickEventHndler = () => {
    setCount(count + 1);
  }

  return (
    <button onClick={clickEventHndler}>INCREMENT</button>
  )
}

export default Increment; 