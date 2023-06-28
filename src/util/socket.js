import io from "socket.io-client";

const socket = io(`${process.env.REACT_APP_SERVER_DASEUL_URL}`);

export default class {
  // 클라이언트에서 소켓 연결 설정
  // 소켓 연결 이벤트
  static connect(userNick) {
    // console.log(`Connect user name is ,`, userNick);
    socket.emit("signin", userNick);
  }

  // 방 입장 이벤트
  static joinRoom(roomName) {
    socket.emit("join", roomName);
  }

  // 메시지 수신 이벤트
  static receiveMsg(setConversations) {
    socket.on("message", (data) => {
      const { sender, message, sendRoom } = data;
      // setConversations((prevConversations) => {
      //   const newConversations = [...prevConversations];
      //   newConversations.push(`${sender}: ${message}`);
      // });
      setConversations((prevConversations) => [
        ...prevConversations,
        `${sender}: ${message}`,
      ]);
    });
  }

  // admin 메시지 수신 이벤트
  static receiveAminMsg(setAdminMsg) {
    socket.on("adminMessage", (data) => {
      // console.log("1", data);
      setAdminMsg((prevAdminMsg) => [...prevAdminMsg, data.message]);
    });
  }

  // 메시지 전송 이벤트
  static sendMsg(msg, userNick) {
    socket.emit("sendMessage", msg, userNick);
  }

  // 사용자 리스트 제공 이벤트
  static sendUserList(title, userList) {
    socket.emit("user list", { title, users: userList });
  }

  // 채팅방 퇴장 이벤트
  static leaveRoom(roomName) {
    socket.emit("leave", roomName);
  }

  // 소켓 연결 해제 이벤트
  static disconnect() {
    socket.disconnect();
  }

  static start(initializeGame) {
    socket.on("startGame", (data) => {
      console.log(data);
      initializeGame();
    });
  }
}
