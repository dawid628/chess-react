import './App.css';
import React, { useEffect, useState } from 'react';
import { gameSubject, initGame, resetGame, undoMove, saveGame, loadGame } from './components/Game';
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
      <div className="btn-container">
        <button className="new-game-btn" onClick={resetGame}><span>Nowa gra</span></button>
        <button className="new-game-btn" onClick={undoMove}>Cofnij ruch</button>
        <button className="new-game-btn" onClick={saveGame}>Zapisz grę</button>
        <button className="new-game-btn" onClick={loadGame}>Wczytaj grę</button>
      </div>
      
      {
        isGameOver && (
          <h2 className="vertical-text">
            GAME OVER
        </h2>
      )}
      <div className="board-container">
        {board &&
          <Board board={board}/>
        }
      </div>
      {result && <p className="vertical-text">{result}</p>}
    </div>
  );
}

export default App;
