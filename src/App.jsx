import { useState } from 'react';
import { Square } from './components/Square';
import { WinnerModal } from './components/WinnerModal';
import { checkEndGame, checkWinnerFrom } from './utils/board';
import { saveGameToStorage, resetGameStorage } from './utils/storage';
import { TURNS } from './utils/constants';
import confetti from 'canvas-confetti';
import './App.css'

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

  const updateBoard = (index) => {
    if(board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    saveGameToStorage(newBoard, newTurn);
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

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
        {          
          board.map((square, index)=>(
            <Square 
              key={ index } 
              index={ index }
              updateBoard={ updateBoard }
            >{square}</Square>
          ))
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={ winner } resetGame={ resetGame }></WinnerModal>

    </main>
  )
};
