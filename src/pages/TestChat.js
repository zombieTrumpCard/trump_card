import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const chatSocket = io(`${process.env.REACT_APP_SERVER_DASEUL_URL}/chat`);

export default function Test() {
  const [serverMsg, setServerMsg] = useState("");
  const [clientMsg, setClientMsg] = useState("");
  const [inputValue, setInputValue] = useState("");

  // 클라이언트에서 소켓 연결 설정

  useEffect(() => {
    chatSocket.on("connect", () => {
      console.log("chat 네임스페이스에 연결되었습니다.");

      chatSocket.emit("joinRoom", "room1"); // room1 룸에 입장

      chatSocket.on("message", (data) => {
        console.log(`서버로부터 받은 메시지: ${data}`);
        setServerMsg(data);
      });

      chatSocket.emit("message", "안녕하세요!"); // 현재 속한 룸에 메시지 전송

      // chatSocket.emit('leaveRoom'); // 현재 속한 룸에서 퇴장
    });

    return () => {
      chatSocket.disconnect();
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault(); // 새로고침 막기

    chatSocket.emit("message", inputValue, (result) => {
      console.log(result);
    });

    // 폼 비우기
    setInputValue("");
  };

  return (
    <div>
      <h1>chat 네임스페이스</h1>
      <form>
        <input
          type="text"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          value={inputValue}
          placeholder="서버에 보낼 메세지"
        />
        <button type="submit" onClick={handleFormSubmit}>
          서버에 보내기
        </button>
      </form>
      <span>{serverMsg}</span>
    </div>
  );
}
