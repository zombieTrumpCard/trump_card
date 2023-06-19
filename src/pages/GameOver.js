import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export default function GameOver({ score }) {
  const navigate = useNavigate();

  useEffect(() => {
    // 새로고침 시 로그인 상태를 복원
    const getCookie = cookies.get("accessToken");
    if (!!getCookie === true) {
      // token이 빈 값이 아니라면
      axios.defaults.headers.common.Authorization = `Bearer ${getCookie}`;
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/gameend');
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
  }, [navigate]);

  const postScore = async () => {
    const response = await axios.post("/userScores/mkscore", { score, level:"hard" } );
    console.log('1: %o', response.data);
    try {
      console.log('2: %o', response.data);
    } catch (error) {
      console.error(`3. err: %o`, error);
      alert(error);
      
    }
  };
  useEffect(() => {
    postScore();
  }, []);

  return (
    <div className='bgGameOver'>
      <h1 className='youDied'>You Died</h1>
    </div>
  );
}

GameOver.propTypes = {
  score: PropTypes.number.isRequired,
};