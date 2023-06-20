import React, { useState,useEffect } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const [activeSkin, setActiveSkin] = useState('default')

  const changeSkin = async () => {
    try {
      const response = await axios.get("/userSkins/useSkin", {});
      setActiveSkin(response.data?.skin || 'nomal');
    } catch (error) {
      alert(error);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  useEffect(() => {
    changeSkin();
  }, []);

  return (
    <div>
      <div className="card">
        <div className={flipped ? 'flipped' : ''}>
          <img className="front" src={card.src} alt="card front" />
          <img
            className="back"
            src={`./Skin/${activeSkin}.png`}
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
