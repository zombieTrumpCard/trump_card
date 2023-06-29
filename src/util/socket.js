import { io } from "socket.io-client";

const socket = io(`${process.env.REACT_APP_SERVER_DASEUL_URL}`);
// const socket = io(`${process.env.REACT_APP_SERVER_JIHYUN_URL}`);

export default class {
  // 클라이언트에서 소켓 연결 설정
  static initializeSocket() {
    socket.on("connect", () => {
      console.log("Now Socket connected...");
    });

    socket.on("disconnect", () => {
      console.log("Now Socket disconnected...");
    });
  }

  // 소켓 연결 이벤트
  static connect(userNick) {
    // console.log(`Connect user name is ,`, userNick);
    socket.emit("signin", userNick);
  }

  // 방 입장 이벤트
  static joinRoom(data) {
    const params = {
      userNick: data.userNick,
      room: data.room,
      room_id: data.room_id,
    };
    socket.emit("join", params);
  }

  // 메시지 수신 이벤트
  static receiveMsg(setConversations) {
    socket.on("message", (data) => {
      const { sender, message, room } = data;
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
  static sendMsg(data) {
    const params = {
      message: data.message,
      sender: data.sender,
      room: data.room,
    };
    socket.emit("sendMessage", params);
  }

  // 사용자 리스트 수신 이벤트
  static getplayerList(setPlayerList) {
    socket.on("userList", (data) => {
      const userList = data;
      // console.log("userlist", data);
      // console.log("이거몇번호출되나요");
      setPlayerList(userList);
    });
  }

  // 채팅방 퇴장 이벤트
  static leaveRoom(data) {
    const params = {
      userNick: data.userNick,
      room: data.room,
    };
    socket.emit("leave", params);
  }

  // 소켓 연결 해제 이벤트
  static disconnect(userNick) {
    socket.disconnect(userNick);
  }

  // 유저 리스트 업데이트 이벤트

  // 게임 시작 트리거 보내기 이벤트
  static start(data) {
    const params = {
      userNick: data.userNick,
      room: data.room,
    };
    socket.emit("startGame", params);
  }

  // 게임 시작 이벤트
  static sendStartMsg(initializeGame) {
    socket.on("startGame", (data) => {});
    initializeGame();
  }

  // 타이핑 전송 이벤트
  static sendTypingMsg(data) {
    const params = {
      message: data.message,
      sender: data.sender,
      room: data.room,
    };
    socket.emit("typingMessage", params);
  }

  // 타이핑 수신 이벤트
  static receiveTypingMsg(setTypingMsg) {
    socket.on("typingMessage", (data) => {
      const { sender, message, room } = data;
      console.log("은하철도999", message);
      setTypingMsg(message);
    });
  }
}

// export default class {
//   static socket;

//   // 소켓 연결 및 이벤트 핸들러 등록
//   static initializeSocket() {
//     this.socket = io(`${process.env.REACT_APP_SERVER_DASEUL_URL}`);
//     // this.socket = io(`${process.env.REACT_APP_SERVER_JIHYUN_URL}`);

//     this.socket.on("connect", () => {
//       console.log("Socket connected");
//     });

//     this.socket.on("disconnect", () => {
//       console.log("Socket disconnected");
//     });
//   }

//   // 클라이언트에서 소켓 연결 설정
//   static connect(userNick) {
//     this.socket.emit("signin", userNick);
//   }

//   // 방 입장 이벤트
//   static joinRoom(data) {
//     const params = {
//       userNick: data.userNick,
//       room: data.room,
//       room_id: data.room_id,
//     };
//     this.socket.emit("join", params);
//   }

//   // 메시지 수신 이벤트
//   static receiveMsg(setConversations) {
//     this.socket.on("message", (data) => {
//       const { sender, message, room } = data;
//       setConversations((prevConversations) => [
//         ...prevConversations,
//         `${sender}: ${message}`,
//       ]);
//     });
//   }

//   // admin 메시지 수신 이벤트
//   static receiveAminMsg(setAdminMsg) {
//     this.socket.on("adminMessage", (data) => {
//       setAdminMsg((prevAdminMsg) => [...prevAdminMsg, data.message]);
//     });
//   }

//   // 메시지 전송 이벤트
//   static sendMsg(data) {
//     const params = {
//       message: data.message,
//       sender: data.sender,
//       room: data.room,
//     };
//     this.socket.emit("sendMessage", params);
//   }

//   // 사용자 리스트 수신 이벤트
//   static getplayerList(setPlayerList) {
//     this.socket.on("userList", (data) => {
//       const userList = data;
//       console.log("userlist", data);
//       console.log("이거몇번호출되나요");
//       setPlayerList(userList);
//     });
//   }

//   // 채팅방 퇴장 이벤트
//   static leaveRoom(data) {
//     const params = {
//       userNick: data.userNick,
//       room: data.room,
//     };
//     this.socket.emit("leave", params);
//   }

//   // 소켓 연결 해제 이벤트
//   static disconnect() {
//     this.socket.disconnect();
//   }

//   // 게임 시작 트리거 보내기 이벤트
//   static start(data) {
//     const params = {
//       userNick: data.userNick,
//       room: data.room,
//     };
//     this.socket.emit("startGame", params);
//   }

//   // 게임 시작 이벤트
//   static sendStartMsg(initializeGame) {
//     this.socket.on("startGame", (data) => {
//       initializeGame();
//     });
//   }

//   // 타이핑 전송 이벤트
//   static sendTypingMsg(data) {
//     const params = {
//       message: data.message,
//       sender: data.sender,
//       room: data.room,
//     };
//     this.socket.emit("typingMessage", params);
//   }

//   // 타이핑 수신 이벤트
//   static receiveTypingMsg(setTypingMsg) {
//     this.socket.on("typingMessage", (data) => {
//       const { sender, message, room } = data;
//       console.log("은하철도999", message);
//       setTypingMsg(message);
//     });
//   }
// }
