import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import PropTypes from 'prop-types';

export default function GameOver() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/gameend');
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
  }, [navigate]);

  // const postScore = async () => {
  //   try {
  //     const response = await axios.post("/userScores/mkscore", {totalScore, level:"hard"} );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     alert(error);
      
  //   }
  // };
  // useEffect(() => {
  //   postScore();
  // }, []);

  return (
    <div className='bgGameOver'>
      <h1 className='youDied'>You Died</h1>
    </div>
  );
}

GameOver.propTypes = {
  totalScore: PropTypes.number.isRequired,
};