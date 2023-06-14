import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.scss';

export default function Header() {
  return (
    <div className="header">
      <div className="navbar">
        <Link to="/rank" className="btn">랭킹</Link>
        <Link to="/store" className="btn">상점</Link>
        <Link to="/mypage" className="btn">내정보</Link>
      </div>
    </div>
  );
}
