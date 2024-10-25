import { TURNS, WINNER_COMBOS } from "./constants";
import { saveGameToStorage } from "./storage";
import confetti from "canvas-confetti";

export const updateBoard = (board, turn, winner, index, setBoard, setTurn, setWinner) => {
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

const checkWinnerFrom = (boardToCheck) => {
    for(const combo of WINNER_COMBOS ) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) return boardToCheck[a];
    }
    return null;
};

const checkEndGame = (newBoard) => newBoard.every((square) => square !== null);  