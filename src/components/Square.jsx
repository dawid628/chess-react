import React from 'react'

function Square({ children, black }) {

    const isBlack = black ? 'square-black' : 'square-white'

  return (
    <div className={`${isBlack} board-square`}>
      {children}
    </div>
  )
}

export default Square