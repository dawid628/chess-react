import React from 'react'
import Square from './Square'
import { move } from './Game'

// mozliwe figury do zmiany w promocji
const promotionPieces = ['r', 'n', 'b', 'q']
const Promote = ({ promotion: {from, to, color} }) => {

  return (
    <div className="board">
      {
        promotionPieces.map((piece, index) => (
            // wybor figury podczas promocji
            <div key={index} className="promote-square">
                <Square black={index % 3 === 0}>
                    <div className="piece-container" onClick={() => move(from, to, piece)}>
                        <img src={require(`./assets//${piece}_${color}.png`)} alt="" className="piece cursor-pointer"/>
                    </div>
                </Square>
            </div>
        ))
        }
    </div>
  )
}

export default Promote
