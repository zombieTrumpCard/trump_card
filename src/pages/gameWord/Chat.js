import React, { useEffect, useState } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import io from "socket.io-client";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Socket.IO 클라이언트 소켓 생성 및 서버에 연결
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    // 서버로부터 'chat message' 이벤트 수신 시 메시지를 messages 배열에 추가
    if (socket) {
      socket.on("chat message", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }
  }, [socket]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 'chat message' 이벤트를 서버로 전송
    socket.emit("chat message", {
      username,
      message,
    });
    setMessage("");
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.username}:</strong> {msg.message}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
        />
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
