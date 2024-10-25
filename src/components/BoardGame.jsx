import { PropTypes } from 'prop-types';
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

BoardGame.propTypes = {
  board: PropTypes.isRequired,
  turn: PropTypes.isRequired, 
  winner: PropTypes.isRequired, 
  setBoard: PropTypes.isRequired, 
  setTurn: PropTypes.isRequired, 
  setWinner: PropTypes.isRequired
};