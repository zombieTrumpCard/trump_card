import axios from "axios";
import React, { useEffect, useState } from "react";
import Word from "./Word";
import socket from "../../util/socket";

export default function WaitingRoom() {
  const [myNickname, setMyNickname] = useState("");
  const [userList, setUserList] = useState([]);
  const [isInGameScreen, setIsInGameScreen] = useState(false);

  // TaeKyeong Page
  const [username, setUsername] = useState("");
  const [players, setPlayers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");

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

  // 방 리스트 가져오기
  const getRooms = async () => {
    try {
      const response = await axios.get("/word/getRooms");
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

  // 유저 리스트 가져오기
  const getUserList = async() => {
    try {
      const response = await axios.get("/word/getRoomUsers");
      const newUserList = response.data.map((item) =>(
        item["UserInfo.nickname"]
      ));
      setUserList(newUserList);
    
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 닉네임 가져오기+소켓 연결
    getNickname();

    return () => {
      // 컴포넌트가 언마운트될 때 소켓 연결 해제
      // socket.disconnect(myNickname);
    };
  }, []);

  useEffect(() => {
    // 방 리스트 가져오기
    getRooms();

    // 유저 리스트 가져오기
    getUserList();

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

  // 방 생성
  const createRoom = async (newRoom) => {
    try {
      const response = await axios.post("/word/createRoom", {
        room_name: newRoom,
      });
      // console.log("11223",response.data);
      const roomId = response.data.room_id;
      setRoomName(newRoom);
      setIsInGameScreen(true);

      // 방 입장 소켓 연결
      socket.joinRoom({
        userNick: myNickname,
        room: newRoom,
        // room_id : roomId
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 방 생성 버튼 클릭
  const handleCreateBtnClick = () => {
    const timestamp = Date.now();
    const newRoom = `Room${timestamp}`;

    createRoom(newRoom);
    return newRoom;
  };

  // 방 참여
  const joinRoom = async (room_id, room_name) => {
    try {
      const response = await axios.post("/word/joinroom", { room_id });
      setRoomName(room_name);
      setIsInGameScreen(true);

      // 방 입장 소켓 연결
      socket.joinRoom({
        userNick: myNickname,
        room: room_name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 방 참여 버튼 클릭
  const handleJoinBtnClick = async (room_id, room_name) => {
    joinRoom(room_id, room_name);
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
                <div
                  className="roomCreate"
                  onClick={() => {
                    handleCreateBtnClick();
                  }}
                >
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
                    {rooms.length === 0 ? (
                      <li>생성된 방이 없습니다. 새로 만들어보세요!</li>
                    ) : (
                      rooms.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            handleJoinBtnClick(item.room_id, item.room_name);
                          }}
                        >
                          {item.title}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isInGameScreen ? (
        <Word myNickname={myNickname} roomName={roomName} userList={userList} />
      ) : null}
    </div>
  );
}
