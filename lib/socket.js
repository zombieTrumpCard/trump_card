const SocketIO = require("socket.io");

// module.exports = (io) => {
//   io.on("connection", (socket) => {
//     console.log("socket is communicating");

//     // socket.emit 개별에게
//     socket.emit("message", "Hello World~개별에게");

//     // io.emit 연결된 모두에게
//     io.emit("message", "Hello World~모두에게");

//     socket.on("formSubmit", (data) => {
//       console.log(data);
//       io.emit("message", data); // 클라이언트에게 메시지 전송
//     });

//     socket.on("disconnect", () => {
//       console.log("Client disconnected socket");
//     });
//   });

//   // 네임스페이스 생성
//   const chatNamespace = io.of("/chat");
//   chatNamespace.on("connection", (socket) => {
//     socket.on("message", (data) => io.emit("message", data));

//     // 룸 생성
//     socket.on("joinRoom", (roomName) => {
//       socket.join(roomName); // 클라이언트를 특정 룸에 입장시킴
//       console.log(`클라이언트가 ${roomName} 룸에 입장했습니다.`);

//       socket.on("message", (data) => {
//         console.log(`클라이언트로부터 받은 메시지: ${data}`);
//         chatNamespace.to(roomName).emit("message", data); // 해당 룸에 속한 클라이언트에게 메시지 전송
//       });

//       // 룸 퇴장
//       socket.on("leaveRoom", () => {
//         socket.leave(roomName); // 클라이언트를 룸에서 퇴장시킴
//         console.log(`클라이언트가 ${roomName} 룸에서 퇴장했습니다.`);
//       });
//     });
//   });
// };

// // aa

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
    socket.on("signin", ({ username }) => {
      console.log(`@@ (+) 사용자 연결: ${username} (${socket.id})`);

      socket.on("join", async (room) => {
        console.log(`@@ 방 입장 (${username}) to (${room})`);
        socket.join(room);

        const message = `${username}님이 입장하셨습니다.`;
        io.to(room).emit("sendMessage", message, room, "admin");
      });

      socket.on("user list", async (room) => {
        console.log("user list:", room);
        socket.broadcast.emit("users", {
          title: room.title,
          users: room.users,
        });
      });

      socket.on("sendMessage", async (message, sentRoom, sender) => {
        console.log(`@@ 메시지 전송 (${sender}): ${message} (${sentRoom})`);
        // const result = await userRepository.addMessage(username, sentRoom, {
        //   sender,
        //   message,
        // });
        // console.log(result);

        // const room = await roomRepository.getRoom(sentRoom);
        // const usersInRoom = room.users;
        // usersInRoom.forEach((user) => {
        //   if (user !== username) {
        //     userRepository.addMessage(user, sentRoom, { sender, message });
        //   }
        // });

        // 메시지를 보낸 클라이언트에게만 해당 메시지를 전달
        socket.emit("message", { sender, message, sentRoom });

        // 메시지를 보낸 클라이언트를 제외한 모든 클라이언트에게 해당 메시지를 전달
        socket.broadcast.emit("message", { sender, message, sentRoom });
      });

      socket.on("leave", (room) => {
        console.log(`@@ 채팅방 퇴장 (${username}) from (${room})`);
        socket.leave(room);

        const message = `${username}님이 퇴장하셨습니다.`;
        socket.to(room).emit("adminMessage", { message });
      });
    });

    socket.on("disconnect", ({ username }) => {
      console.log(`@@ (-) 사용자 연결 해제: ${username} (${socket.id})`);
    });
  });
};
