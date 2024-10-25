import { Square } from "./Square";
import { updateBoard } from '../utils';

export const BoardGame = ({ board, turn, winner, setBoard, setTurn, setWinner }) => {
  return (          
    board.map((square, index)=>(
      <Square 
        key={ index } 
        index={ index }
        updateBoard={ () => updateBoard(board, turn, winner, index, setBoard, setTurn, setWinner) }
      >{square}</Square>
    ))
  );
};
