import axios from "axios";
import React, { useEffect, useState } from "react";
import isLogin from "../../util/isLogin";
import socket from "../../util/socket";

export default function GameWordWait() {
  const [rooms, setRooms] = useState([]);
  const [num, setNum] = useState(0);

  // 최초 1회 실행
  useEffect(() => {
    isLogin(); // 로그인 처리
    socket.connect("testUser1");

    // 메시지 전송 이벤트 테스트
    socket.sendMsg("안뇽~!", "방이름", "testUser1");
  }, []);

  const addRoom = async () => {
    const newRoom = "NewRoom";
    setNum((prevNum) => prevNum + 1);
    setRooms([...rooms, `${newRoom}${num}`]);

    // 방 생성 db에 넣기 요청
    try {
      const response = await axios.post("/word/createRoom", {
        room_name: rooms[rooms.length - 1],
      });
      console.log(response);

      // 소켓 연결 이벤트
      socket.joinRoom(rooms[rooms.length - 1]);
    } catch (error) {
      console.error(error);
    }
  };

  const joinRoom = async () => {
    try {
      const response = await axios.post("/word/joinroom", {
        room_name: rooms[rooms.length - 1],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>MAD TEA PARTY</h1>
      <div className="mainBox">
        <div className="userList"></div>
        <div className="gameBox">
          <div className="gameBoxNav">
            <h1>게임 목록</h1>
            <button type="button" className="makeRoomBtn" onClick={addRoom}>
              방 생성
            </button>
            <button type="button" className="returnBtn">
              새로고침
            </button>
          </div>
          <div className="gameList">
            <ul>
              {rooms.map((item, index) => (
                <li key={index} onClick={joinRoom}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
