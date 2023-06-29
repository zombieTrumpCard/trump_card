import axios from "axios";
import React, { useEffect, useState } from "react";
import Word from "./Word";
import socket from "../../util/socket";

export default function WaitingRoom() {
  const [myNickname, setMyNickname] = useState("");

  // TaeKyeong Page
  const [username, setUsername] = useState("");
  const [players, setPlayers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [num, setNum] = useState(0);
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

  // 방리스트 가져오기
  const getRooms = async () => {
    try {
      const response = await axios.get("/word/getRooms");
      console.log(response.data);
      const roomData = response.data.map((item) => ({
        room_id: item.room_id,
        room_name: item.room_name,
        title: item.title,
      }));
      setRooms(roomData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 닉네임 가져오기+소켓 연결
    getNickname();

    // 방 리스트 가져오기
    getRooms();

    return () => {
      // 컴포넌트가 언마운트될 때 소켓 연결 해제
      // socket.disconnect(myNickname);
    };
  }, []);

  useEffect(() => {
    // 방 입장 소켓 연결
    socket.joinRoom({
      userNick: myNickname,
      room: roomName,
    });

    // 컴포넌트가 언마운트 될 때 방 퇴장
    return () => {
      socket.leaveRoom({
        userNick: myNickname,
        room: roomName,
      });
    };
  }, [roomName, isInGameScreen]);

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
      setRoomName(newRoom);
      setIsInGameScreen(true);
      console.log(response);
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
      {isInGameScreen ? (
        <button type="button" onClick={() => setIsInGameScreen(false)}>
          로비 화면으로
        </button>
      ) : null}
      {isInGameScreen ? null : (
        <div className="TaeKyeong">
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
                    {/* {rooms.map((room, index) => (
                      <li key={index}>{room}</li>
                    ))} */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isInGameScreen ? (
        <Word myNickname={myNickname} roomName={roomName} />
      ) : null}
    </div>
  );
}
