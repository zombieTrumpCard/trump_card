import React, { useState,useEffect } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const [activeSkin, setActiveSkin] = useState('default')

  useEffect(() => {
    // 새로고침 시 로그인 상태를 복원
    const getCookie = cookies.get("accessToken");
    if (!!getCookie === true) {
      // token이 빈 값이 아니라면
      axios.defaults.headers.common.Authorization = `Bearer ${getCookie}`;
    }
  }, []);

  const changeSkin = async () => {
  try {
    const response = await axios.get("/userSkins/useSkin", {});
    const skin = response.data && response.data.Skin ? response.data.Skin.skin : 'nomal';
    setActiveSkin(skin);
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
            src={`./skin/${activeSkin}.png`}
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
