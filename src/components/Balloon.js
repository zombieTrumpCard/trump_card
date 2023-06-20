import React, { useState } from "react";
import "../styles/components/Balloon.scss";

export default function Balloon() {
  const [isVisible, setIsVisible] = useState(true);

  // const handleHideBalloon = () => {
  //   setIsVisible(false);
  // };

  return (
    <div className={`balloon ${isVisible ? "visible" : "hidden"}`}>
      <p style={{ fontFamily: '궁서체', fontWeight: 'bold' }} >골라보시게💀</p>
      {/* <button onClick={handleHideBalloon}>닫기</button> */}
    </div>
  );
}
