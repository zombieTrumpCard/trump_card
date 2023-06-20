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
      <div className="background">
        <h1 className="RestartTitle">Restart?</h1>
        <button onClick={clickY} className="clickY" />
        <button onClick={clickN} className="clickN" />
        <p className="SP1">Score : {totalScore}</p>
        <p className="SP2">point : {totalPoint}</p>
        <div className="rabbitIcon" />
      </div>
    </>
  );
}

