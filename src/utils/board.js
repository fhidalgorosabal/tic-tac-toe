import { WINNER_COMBOS } from "./constants";7

export const checkWinnerFrom = (boardToCheck) => {
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

export const checkEndGame = (newBoard) => newBoard.every((square) => square !== null);  