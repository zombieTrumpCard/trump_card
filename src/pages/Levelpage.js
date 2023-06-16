import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Levelpage() {
  const [bgImageEasy, setBgImageEasy] = useState('url(../public/easyBtn.png)');
  const [bgImageNormal, setBgImageNormal] = useState('url(../public/easyBtn.png)');
  const [bgImageHard, setBgImageHard] = useState('url(../public/easyBtn.png)');
  const [selectedPage, setSelectedPage] = useState(null);

  const handleSelectEasy = () => {
    setBgImageEasy('url(../public/selectEasyBtn.png)');
    alert('easy');
    setSelectedPage('levelEasy');
  };
  const handleSelectNormal = () => {
    setBgImageNormal('url("../public/selectEasyBtn.png")');
    alert('normal');
    setSelectedPage('levelNormal');
  };
  const handleSelectHard = () => {
    setBgImageHard('url(../public/selectEasyBtn.png)');
    alert('hard');
    setSelectedPage('levelHard');
  };

  // const clickStart = () => {
  //   if (selectedPage === 'levelEasy') {
  //     history.push('/levelEasy');
  //   } else if (selectedPage === 'levelNormal') {
  //     history.push('/levelNormal');
  //   } else if (selectedPage === 'levelHard') {
  //     history.push('/levelHard');
  //   }
  // };

  return (
    <div className="background">
      <Link to="/" className="homeBtn"> HOME </Link>
      <div className="rabbitIcon" />
      <h1 className="levelTitle"> Level </h1>
      <button type="button" className="chooseLevelEasy" onClick={handleSelectEasy} style={{ bgImageEasy }}> </button>
      <button type="button" className="chooseLevelNormal" onClick={handleSelectNormal} style={{ bgImageNormal }}> </button>
      <button type="button" className="chooseLevelHard" onClick={handleSelectHard} style={{ bgImageHard }}> </button>
      {/* <Link to="/gameeagy" className="startBtn" onClick={clickStart} /> */}
    </div>
  );
}
