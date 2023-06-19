import React from 'react';
import PropTypes from 'prop-types';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div>
      <div className="card">
        <div className={flipped ? 'flipped' : ''}>
          <img className="front" src={card.src} alt="card front" />
          <img
            className="back"
            src="./Skin/SkinDS.jpg"
            onClick={handleClick}
            alt="card back"
          />
        </div>
      </div>
    </div>
  );
}

SingleCard.propTypes = {
  card: PropTypes.shape({
    src: PropTypes.string.isRequired,
    matched: PropTypes.bool.isRequired,
  }).isRequired,
  handleChoice: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};
