import { useState } from 'react';
import { BoardGame } from './components/BoardGame';
import { Square } from './components/Square';
import { WinnerModal } from './components/WinnerModal';
import { resetGameStorage, TURNS } from './utils';

export const App = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {    
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  };
  
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>

      <button onClick={ resetGame }>Nuevo juego</button>

      <section className='game'>
        <BoardGame 
          board={ board } 
          turn={ turn } 
          winner={ winner } 
          setBoard={ setBoard } 
          setTurn={ setTurn } 
          setWinner={ setWinner }
        ></BoardGame>
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal 
        winner={ winner } 
        resetGame={ resetGame }
      ></WinnerModal>

    </main>
  )
};
