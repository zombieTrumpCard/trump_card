import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import isLogin from "../../util/isLogin";
import socket from "../../util/socket";

export default function HeaderNew() {
  const [myNickname, setMyNickname] = useState("");
  const [isInGameScreen, setIsInGameScreen] = useState(false);

  // 닉네임 가져오기+소켓 연결
  const getNickname = async () => {
    try {
      const result = await axios.get("/word/getNickname");
      setMyNickname(result.data);
      socket.connect(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 최초 1회 실행
  useEffect(() => {
    // 로그인 검증
    isLogin();

    // 닉네임 가져오기+소켓 연결
    getNickname();

    return () => {
      // 컴포넌트가 언마운트될 때 소켓 연결 해제
      socket.disconnect(myNickname);
    };
  }, []);  

  const handleBtnClick = () => {
    setIsInGameScreen(false);
  };

  return (
    <div className="headernew">
      <div>
        <img src="/logo.png" alt="logImage"></img>
        <Link to="/" className="heading">
          WonderLand
        </Link>
      </div>
      {isInGameScreen ? (
        <div className="navbar">
          <Link to="/WaitingRoom" className="nav-btn" onClick={()=>{handleBtnClick();}}>
            파티 나가기
          </Link>
        </div>
      ) : (
        <div className="navbar"></div>
      )}
    </div>
  );
}
