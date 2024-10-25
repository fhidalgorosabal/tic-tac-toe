import { PropTypes } from 'prop-types';
import { Square } from "./Square";

export const WinnerModal = ({ winner, resetGame }) => {
    if (winner === null) return null;

    const winnerText = winner === false ? 'Empate' : 'Ganó:';

    return (
      <section className='winner'>
        <div className='text'>
          <h2>{ winnerText }</h2>
  
          { winner &&  <div className='win'><Square>{ winner }</Square></div>}
  
          <button onClick={ resetGame }>Empesar de nuevo</button>
          
        </div>
      </section>
    );
};

WinnerModal.propTypes = {
  winner: PropTypes.isRequired,
  resetGame: PropTypes.isRequired
};
