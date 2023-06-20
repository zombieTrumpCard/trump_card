import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function GameEnd() {
  const navigate = useNavigate();
  const location = useLocation();

  const [totalScore, setTotalScore] = useState();
  const [totalPoint, setTotalPoint] = useState();

  // 스코어, 포인트 가져오기
  useEffect(() => {
    if (location.state) {
      setTotalScore(location.state.score);
      setTotalPoint(location.state.point);
    }
  }, [location.state]);

  const clickY = () => {
    navigate('/level');
    }

  const clickN = () => {
    navigate('/');
    }

  return (
    <>
      <div className="GameEnd">
        <h1 className="Restart">Restart?</h1>
        <button onClick={clickY} className="clickY" />
        <button onClick={clickN} className="clickN" />
        <p className="SP">Score : {totalScore}</p>
        <p className="SP">point : {totalPoint}</p>
      </div>
    </>
  );
}

