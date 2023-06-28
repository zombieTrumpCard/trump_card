const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");
const roomRepository = require("../lib/roomUtil");
const userRepository = require("../lib/socketUserUtil");
const wordService = require("../service/wordService");
const userInfoService = require("../service/userInfoService");
const { isLoggedIn } = require("../lib/middleware");
const tokenUtil = require("../lib/tokenUtil");
const socket = require("../lib/socket");

// 회원가입
router.post("/ddd", async (req, res) => {
  try {
    const params = {
      id: req.body.id,
      password: req.body.password,
      nickname: req.body.nickname,
      phonenum: req.body.phonenum,
      point: 0,
      totalscore: 0,
    };
    logger.info(`(word.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.id || !params.password || !params.nickname) {
      const err = new Error("Not allowed null (id,password,nickname)");
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비밀번호 암호화
    const hashedPassword = await hashUtil.makeHash(params.password);

    // 암호화된 비밀번호로 params 업데이트
    params.password = hashedPassword;
    const result = await wordService.reg(params);
    logger.info(`(word.reg.result) ${JSON.stringify(result)}`);
    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

router.get("/", (req, res) => {
  res.sendStatus(200);
});
router.get("/server", (req, res) => {
  res.status(200).json("Sever is running now!");
});

//GET 개설된 채팅방 리스트 불러오기
router.get("/lobby", async (req, res) => {
  console.log("get lobby data");
  try {
    console.log("get lobby data2");
    // logger.info(`(word.reg.params) ${JSON.stringify(params)}`);
    const result = await wordService.roomlist();
    // logger.info(`(word.reg.result) ${JSON.stringify(result)}`);
    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

//POST 새로운 게임방 생성
router.post("/createRoom", isLoggedIn, async (req, res) => {
  // 방주인 가져오기
  const tokenHeader = req.headers && req.headers.authorization;
  let token;
  if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
    // "Bearer " 스키마 제외
    token = tokenHeader.split(" ")[1];
  }
  const decoded = tokenUtil.verifyToken(token);
  const id = decoded.id;
  const user_id = decoded.user_id;
  try {
    // 닉네임 가져오기 로직
    const nickname = await wordService.findNickname(user_id);
    logger.info(`(userInfoService.reg.result) ${JSON.stringify(nickname)}`);

    // 방생성을 위한 params
    const params = {
      title: `${nickname}'s Room`,
      room_name: req.body.room_name,
      user_id: user_id,
    };
    logger.info(`(word.roomCreate.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    // 방 생성 로직
    const resultRoom = await wordService
      .roomCreate(params)
      .then(async (room) => {
        const joinParams = { room_id: room.room_id, user_id: user_id };
        logger.info(`(word.joinRoom.joinParams) ${JSON.stringify(joinParams)}`);
        const resultRoomUsers = await wordService.joinRoom(joinParams);
        logger.info(
          `(word.joinRoom.result) ${JSON.stringify(resultRoomUsers)}`
        );
        return room; // 생성된 방을 반환
      })
      // .then((room) => {
      //   // 소켓 라이브러리 호출
      //   socket.
      // })
      .catch((error) => {
        logger.error(`(word.roomCreate.error) ${error.toString()}`);
        return error;
      });
    logger.info(`(word.roomCreate.result) ${JSON.stringify(resultRoom)}`);

    // 방 생성유저 입장 로직
    // const resultRoomUsers = await wordService.joinRoom(params);

    // 최종 응답
    res.status(200).json({ message: `게임방 생성 ${params.title}` });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

//GET 사용자가 참여중인 방 목록 불러오기
router.get("/user/:id", async (req, res) => {
  const name = req.params.id;
  const user = await userRepository.getUser(name);

  res.status(200).json(user);
});

//GET 채팅방의 정보 불러오기
router.get("/chat/:roomtitle", async (req, res) => {
  const roomtitle = req.params.roomtitle;

  const room = await roomRepository.getRoom(roomtitle);

  res.status(201).json(room);
});

//GET 가입된 모든 유저 정보
router.get("/user", (req, res) => {
  const users = userRepository.getUsers();
  res.status(200).json(users);
});

//POST 사용자가 개설된 방에 참여
router.post("/joinroom", async (req, res) => {
  const user = req.body.username;
  const roomtitle = req.params.roomtitle;
  const result = await userRepository.joinRoom(user, roomtitle);
  const room = await roomRepository.addUserToRoom(user, roomtitle);

  res.status(200).json(room);
});

// POST 새로운 유저 가입
router.post("/signup", (req, res) => {
  const username = req.body.username;
  userRepository.signUp(username);
  res.status(201).json(username);
});

module.exports = router;
