import React from 'react'
import BoardSquare from './BoardSquare';

const Board = ({ board }) => {

  const getXY = (index) => {
    const x = index % 8
    const y = Math.abs(Math.floor(index / 8) - 7)
    return {x, y}
  }
  

  const isBlack = (index) => {
    const {x, y} = getXY(index)
    return ((x + y ) % 2 === 1)
  }
  
  const getPosition = (index) => {
    const {x, y} = getXY(index)
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x]
    return `${letter}${y + 1}`
  }
  

  return (
    <div className="board">
        {board.flat().map((piece, index) => {
            return (
              <div key={index} className="square">
                <BoardSquare piece={piece} black={isBlack(index)} position={getPosition(index)}/>
              </div>
            );
        })}
    </div>
  )
}

export default Board
