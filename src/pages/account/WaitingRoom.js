import React, { useState } from 'react';

function WaitingRoom() {
  const [username, setUsername] = useState('');
  const [players, setPlayers] = useState([]);
  const [rooms, setRooms] = useState([
    'Room 1',
    'Room 2',
    'Room 3',
    'Room 4',
    'Room 5',
    'Room 6',
  ]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim() !== '') {
      // addPlayer(username);
      setUsername('');
    }
  };

  // const addPlayer = (username) => {
  //   setPlayers((prevPlayers) => [...prevPlayers, username]);
  // };

  return (
    <div>
      <h2>끝말잇기 게임 - 대기실</h2>
      <div className="container">
        <div className="userList">
          <h2>사용자 목록</h2>
        </div>

        <div className="game-wrapper">
          <div className="box-wrap">
            <div className="gameList">게임목록</div>
            <div className="roomCreate">방 생성</div>
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
    </div>
  );
}

export default WaitingRoom;
