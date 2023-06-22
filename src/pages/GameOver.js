import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function GameOver() {
  const navigate = useNavigate();
  const location = useLocation();

    // 스코어, 포인트, 레벨을 서버로 보내는 설정
  const postSP = async (score, level, point) => {
    try {
      const response = await axios.post("/userScores/mkscore", {
        score,
        level,
        point,
      });
    } catch (error) {
      alert(error);
    }
  };

  // 스코어, 포인트, 레벨을 가져오고, 보내기
  // 3초 후 다음 페이지로 이동
  const navigateToGameEnd = () => {
    navigate("/gameend", {
      state: {
        score: location.state.totalScore,
        point: location.state.totalPoint
      }
    });
  };
  
  useEffect(() => {
    const score = location.state.totalScore;
    const point = location.state.totalPoint;
    const level = location.state.nowLevel;
    postSP(score, level, point);
  
    const timer = setTimeout(() => {
      navigateToGameEnd();
    }, 3000);
  
    return () => clearTimeout(timer);
  }, [navigateToGameEnd]);

  return (
    <div className="bgGameOver">
      <h1 className="youDied">You Died</h1>
    </div>
  );
}
