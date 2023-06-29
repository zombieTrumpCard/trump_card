import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://192.168.0.71:1788");

export default function Test() {
  const [serverMsg, setServerMsg] = useState([]);
  const [clientMsg, setClientMsg] = useState("");
  const [inputValue, setInputValue] = useState("");

  // 클라이언트에서 소켓 연결 설정

  useEffect(() => {
    // 사용자 연결 이벤트
    const username = "만두";
    socket.emit("signin", { username });

    // 방 입장 이벤트
    const room = "사과방";
    socket.emit("join", room);

    // 메시지 수신 이벤트
    socket.on("sendMessage", (data) => {
      // const newMsg = { data };
      console.log(data);
      // setServerMsg((prevMsg) => [...prevMsg, data]);
    });

    // admin 메시지 수신 이벤트
    socket.on("adminMessage", (data) => {
      setServerMsg((prevMsg) => [...prevMsg, data]);
    });

    // 사용자 리스트 제공 이벤트
    socket.emit("user list", { title: "사과방", users: ["만두", "물만두"] });

    // 메시지 전송 이벤트
    socket.emit("sendMessage", "안녕하세요~", "사과방", "만두");

    // 채팅방 퇴장 이벤트
    socket.emit("leave", "사과방");

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // 새로고침 막기
    try {
      const result = await socket.emit("formSubmit", inputValue);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
    // 폼 비우기
    setInputValue("");
  };

  return (
    <div>
      <h1>Socket.IO Example</h1>
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
      {serverMsg.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}
