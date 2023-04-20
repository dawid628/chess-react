import './App.css';
import React, { useEffect, useState } from 'react';
import { gameSubject, initGame, resetGame } from './components/Game';
import Board from './components/Board';

function App() {

  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()

  useEffect(() => {
    initGame()
    const subscribe = gameSubject.subscribe(game => {
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
    })
    return () => subscribe.unsubscribe()
  }, [])

  return (
    <div className="container">
      {
        isGameOver && (
          <h2 className="vertical-text">
            GAME OVER
            <button onClick={resetGame}><span>NEW GAME</span></button>
        </h2>
      )}
      <div className="board-container">
        <Board board={board}/>
      </div>
      {result && <p className="vertical-text">{result}</p>}
    </div>
  );
}

export default App;
