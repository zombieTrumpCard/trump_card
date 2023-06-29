import axios from "axios";
import React, { useEffect, useState } from "react";
import Word from "./Word"
import socket from "../../util/socket";

export default function WaitingRoom() {
  const [username, setUsername] = useState("");
  const [players, setPlayers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [num, setNum] = useState(0);
  const [isGameScreen, setIsGameScreen] = useState(false);

  useEffect(() => {
    socket.connect();
  },[]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim() !== "") {
      // addPlayer(username);
      setUsername("");
    }
  };

  const createRoom = async (newRoom) => {
    try {
      const response = await axios.post("/word/createRoom", {
        room_name: newRoom,
      });
      // console.log(response);
      setIsGameScreen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateBtnClick = () => {
    setNum((prevNum) => {
      const updatedNum = prevNum + 1;
      setRooms((prevRooms) => [...prevRooms, `Room${updatedNum}`]);
      createRoom(`Room${updatedNum}`);
      return updatedNum;
    });
  };

  // const addPlayer = (username) => {
  //   setPlayers((prevPlayers) => [...prevPlayers, username]);
  // };

  return (
    <div className="WaitingRoom">
      {isGameScreen ? null : (<div className="TaeKyeong">
        <h2>끝말잇기 게임 - 대기실</h2>
        <div className="container">
          <div className="userList">
            <h2>사용자 목록</h2>
          </div>

          <div className="game-wrapper">
            <div className="box-wrap">
              <div className="gameList">게임목록</div>
              <div className="roomCreate" onClick={handleCreateBtnClick}>
                방 생성
              </div>
              <div className="refreshRoom">새로고침</div>
            </div>

            <div className="gameScreen2">
              <form onSubmit={handleSubmit}></form>
              <div>
                <ul>
                  {players.map((player, index) => (
                    <li key={index}>{player}</li>
                  ))}
                </ul>
              </div>
              <div className="roomList"></div>
              <div>
                <h2>룸 목록:</h2>
                <ul>
                  {rooms.map((room, index) => (
                    <li key={index}>{room}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>)}
      {isGameScreen ? <Word /> : null}
    </div>
  );
}
