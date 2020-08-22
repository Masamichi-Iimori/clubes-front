import React from 'react'

const Count: React.FC<{ count: number }> = ({ count }) => {
  return (
    <h1>{count}</h1>
  )
}

export default Count;  