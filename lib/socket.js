const SocketIO = require("socket.io");
const logger = require("./logger");

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
  // const io = SocketIO(server, { path: '/socket.io' });
  // app.set('io', io);

  // const chat = io.of('/chat'); // chat namespace
  // const game = io.of('/game'); // game namespace

  io.on("connection", (socket) => {
    // waiting room 접속
    socket.on("signin", (userNick) => {
      logger.info(`@@ (+) 사용자 연결: ${userNick} (${socket.id})`);
    });

    // 게임방 접속
    socket.on("join", async (data) => {
      const params = {
        userNick: data.userNick,
        room: data.room,
      };

      // 방 입장 소켓 연결 이전에 최대 리스너 수 설정
      socket.setMaxListeners(6);

      console.log(`@@ 게임방 입장 (${params.userNick}) to (${params.room})`);
      socket.join(params.room);

      const message = `${params.userNick}님이 입장하셨습니다.`;
      io.to(params.room).emit("adminMessage", { message });

      // 사용자 리스트 제공 이벤트
      // socket.on("user list", async (room) => {
      //   console.log("user list:", room);
      //   socket.broadcast.emit("users", {
      //     title: room.title,
      //     users: room.users,
      //   });
      // });
    });

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
