import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Levelpage() {
  const navigate = useNavigate();

  const [bgImageEasy, setBgImageEasy] = useState(false);
  const [bgImageNormal, setBgImageNormal] = useState(false);
  const [bgImageHard, setBgImageHard] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  const handleSelectEasy = () => {
    setBgImageEasy(true);
    setBgImageNormal(false);
    setBgImageHard(false);
    setSelectedPage('levelEasy');
  };

  const handleSelectNormal = () => {
    setBgImageEasy(false);
    setBgImageNormal(true);
    setBgImageHard(false);
    setSelectedPage('levelNormal');
  };

  const handleSelectHard = () => {
    setBgImageEasy(false);
    setBgImageNormal(false);
    setBgImageHard(true);
    setSelectedPage('levelHard');
  };

  const clickStart = () => {
    let path;
    if (selectedPage === 'levelEasy') {
      path = '/gameeasy';
    } else if (selectedPage === 'levelNormal') {
      path = '/gamenormal';
    } else if (selectedPage === 'levelHard') {
      path = '/gamehard';
    }

    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="background">
      <Link to="/" className="homeBtn">
        HOME
      </Link>
      <div className="rabbitIcon" />
      <h1 className="levelTitle"> Level </h1>
      <button
        type="button"
        className="chooseLevelEasy"
        onClick={handleSelectEasy}
        style={{
          backgroundImage: `url(${
            bgImageEasy ? '/selectEasyBtn.png' : '/easyBtn.png'
          })`,
        }}
      />
      <button
        type="button"
        className="chooseLevelNormal"
        onClick={handleSelectNormal}
        style={{
          backgroundImage: `url(${
            bgImageNormal ? '/selectEasyBtn.png' : '/easyBtn.png'
          })`,
        }}
      />
      <button
        type="button"
        className="chooseLevelHard"
        onClick={handleSelectHard}
        style={{
          backgroundImage: `url(${
            bgImageHard ? '/selectEasyBtn.png' : '/easyBtn.png'
          })`,
        }}
      />
      <button className="startBtn" onClick={clickStart} />
    </div>
  );
}
