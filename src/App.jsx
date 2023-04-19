import './App.css';
import React, { useEffect, useState } from 'react';
import { gameSubject } from './components/Game';
import Board from './components/Board';

function App() {

  const [board, setBoard] = useState([])

  useEffect(() => {
    const subscribe = gameSubject.subscribe(game => setBoard(game.board))
    return () => subscribe.unsubscribe()
  }, [])
  return (
    <div className="container">
      <div className="board-container">
        <Board board={board}/>
      </div>
    </div>
  );
}

export default App;
