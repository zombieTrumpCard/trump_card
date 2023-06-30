const SocketIO = require("socket.io");
const logger = require("./logger");
const { getRoomUsersByRoomId } = require("../service/wordService");

// module.exports = (server, app, sessionMiddleware) => {
//   const io = SocketIO(server, { path: "/socket.io" });
//   app.set("io", io);
//   const room = io.of("/room");
//   const chat = io.of("/chat");

//   const wrap = (middleware) => (socket, next) =>
//     middleware(socket.request, {}, next);
//   chat.use(wrap(sessionMiddleware));

//   room.on("connection", (socket) => {
//     console.log("room 네임스페이스에 접속");
//     socket.on("disconnect", () => {
//       console.log("room 네임스페이스 접속 해제");
//     });
//   });

//   chat.on("connection", (socket) => {
//     console.log("chat 네임스페이스에 접속");

//     socket.on("join", (data) => {
//       socket.join(data);
//       socket.to(data).emit("join", {
//         user: "system",
//         chat: `${socket.request.session.color}님이 입장하셨습니다.`,
//       });
//     });

//     socket.on("disconnect", async () => {
//       console.log("chat 네임스페이스 접속 해제");
//       const { referer } = socket.request.headers; // 브라우저 주소가 들어있음
//       const roomId = new URL(referer).pathname.split("/").at(-1);
//       const currentRoom = chat.adapter.rooms.get(roomId);
//       const userCount = currentRoom?.size || 0;
//       if (userCount === 0) {
//         // 유저가 0명이면 방 삭제
//         await removeRoom(roomId); // 컨트롤러 대신 서비스를 사용
//         room.emit("removeRoom", roomId);
//         console.log("방 제거 요청 성공");
//       } else {
//         socket.to(roomId).emit("exit", {
//           user: "system",
//           chat: `${socket.request.session.color}님이 퇴장하셨습니다.`,
//         });
//       }
//     });
//   });
// };

// bb

module.exports = (io) => {
  io.on("connect", (socket) => {

    // waiting room 접속
    socket.on("signin", (userNick) => {
      logger.info(`@@ (+) 사용자 연결: ${userNick} (${socket.id})`);
    });

    // 게임방 접속
    socket.on("join", async (data) => {
      const params = {
        userNick: data.userNick,
        room: data.room,
        room_id: data.room_id
      };
      
      // 방 입장 소켓 연결 이전에 최대 리스너 수 설정
      socket.setMaxListeners(6);
      
      logger.info(`@@ 게임방 입장 (${params.userNick}) to (${params.room})`);
      socket.join(params.room);
      
      const message = `${params.userNick}님이 입장하셨습니다.`;
      io.to(params.room).emit("adminMessage", { message });
      
      // 룸 아이디로 사용자 리스트 조회
      try {
        const result = await getRoomUsersByRoomId(params.room_id);
        // console.log('->->->result:',result);
        // console.log(result);
        
        const userList = result.map((user) => user['UserInfo.nickname']);

        // 사용자 리스트 제공 이벤트
        io.to(params.room).emit("userList", userList);
        console.log("->->->userList", userList);
      } catch (error) {
        console.log(`getRoomUsersByRoomId(error):${error}`);
      }
    });

    // 게임 메세지 전송
    socket.on("sendMessage", async (data) => {
      const params = {
        message: data.message,
        sender: data.sender,
        room: data.room,
      };
      logger.info(
        `@@ 메시지 전송 (${params.sender}): ${params.message} (${params.room})`
      );

      // 메시지를 보낸 클라이언트에게만 해당 메시지를 전달
      // socket.emit("message", { sender, message, sentRoom });

      // 메시지를 보낸 클라이언트를 제외한 모든 클라이언트에게 해당 메시지를 전달
      // socket.broadcast.emit("message", { sender, message, sentRoom });

      io.to(params.room).emit("message", params);
    });

    // notification 메세지
    socket.on("sendNoti", async (data) => {
      const params = {
        room: data.room,
        noti: data.noti,
      };
      console.log("noti", params.noti);
      io.to(params.room).emit("listenNoti", params);
    });

    // 타이핑 중인 메세지 전송
    socket.on("typingMessage", async (data) => {
      const params = {
        message: data.message,
        sender: data.sender,
        room: data.room,
      };
      logger.info(
        `@@ 타이핑 중 ... (${params.sender}): ${params.message} (${params.room})`
      );
      // socket.broadcast.to(params.room).emit("typingMessage", params);
      io.to(params.room).emit("typingMessage", params);
    });

    // 게임 시작
    socket.on("startGame", (data) => {
      const params = {
        room: data.room,
        words: data.words,
      };
      console.log("게임 시작 버튼 눌렀나봐", params.words);
      io.to(params.room).emit("startGame" , params);
    })

    // 다음 제시어로 이동
    socket.on("sendNextStep", (data) => {      
      const params = {
        room: data.room,
        word: data.word,
        index: data.index,
        suggest: data.suggest,
        player: data.player,
        round: data.round,
      };
      console.log("다음 제시어로 이동", params.word);
      io.to(params.room).emit("timeout" , params);
    })

    // 게임 종료 이벤트
    socket.on("sendEndGame", (data) => {
      console.log("게임이 종료됐당");
      const params = {
        room: data.room,
      };
      io.to(params.room).emit("listenEndGame" , params);
    })

    // 게임방 퇴장
    socket.on("leave", (data) => {
      const params = {
        userNick: data.userNick,
        room: data.room,
      };
      logger.info(`@@ 게임방 퇴장 (${params.userNick}) from (${params.room})`);
      socket.leave(params.room);

      const message = `${params.userNick}님이 퇴장하셨습니다.`;
      socket.to(params.room).emit("adminMessage", { message });
    });

    // waiting room 퇴장
    socket.on("disconnect", (userNick) => {
      logger.info(`@@ (-) 사용자 연결 해제: ${userNick} (${socket.id})`);
    });
  });
};
