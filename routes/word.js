const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");
// const roomRepository = require("../lib/roomUtil");
// const userRepository = require("../lib/socketUserUtil");
const wordService = require("../service/wordService");
const userInfoService = require("../service/userInfoService");
const { isLoggedIn } = require("../lib/middleware");
const tokenUtil = require("../lib/tokenUtil");
const socket = require("../lib/socket");

//GET 개설된 채팅방 리스트 불러오기
router.get("/getRooms", async (req, res) => {
  try {
    // logger.info(`(word.reg.params) ${JSON.stringify(params)}`);
    const result = await wordService.roomlist();
    logger.info(`(wordService.roomlist.result) ${JSON.stringify(result)}`);
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
    logger.info(`(wordService.reg.result) ${JSON.stringify(nickname)}`);

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
        // 방 주인을 방을 이용하는 유저 리스트에 넣기
        const joinParams = { room_id: room.room_id, user_id: user_id };
        logger.info(`(word.joinRoom.joinParams) ${JSON.stringify(joinParams)}`);
        const resultRoomUsers = await wordService.joinRoom(joinParams);
        logger.info(
          `(word.joinRoom.result) ${JSON.stringify(resultRoomUsers)}`
        );
        return room; // 생성된 방을 반환
      })
      .catch((error) => {
        logger.error(`(word.roomCreate.error) ${error.toString()}`);
        return error;
      });
    logger.info(`(word.roomCreate.result) ${JSON.stringify(resultRoom)}`);

    // 최종 응답
    res.status(200).json({ message: `게임방 생성 ${params.title}` });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

//GET 닉네임 조회
router.get("/getNickname", isLoggedIn, async (req, res) => {
  const tokenHeader = req.headers && req.headers.authorization;
  let token;
  if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
    // "Bearer " 스키마 제외
    token = tokenHeader.split(" ")[1];
  }
  const decoded = tokenUtil.verifyToken(token);
  const user_id = decoded.user_id;
  try {
    const nickname = await wordService.findNickname(user_id);
    logger.info(
      `(wordService.findNickname.result) ${JSON.stringify(nickname)}`
    );
    res.status(200).send(nickname);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

//GET 방 생성 주인인지 유효성검사
router.get("/verification", isLoggedIn, async (req, res) => {
  const tokenHeader = req.headers && req.headers.authorization;
  let token;
  if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
    // "Bearer " 스키마 제외
    token = tokenHeader.split(" ")[1];
  }
  const decoded = tokenUtil.verifyToken(token);
  const user_id = decoded.user_id;
  try {
    const result = await wordService.findRoomOwner(user_id);
    logger.info(
      `(wordService.findRoomOwner.result) ${JSON.stringify(result)}`
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

//Delete 게임방 나가기
router.delete("/leaveRoom", isLoggedIn, async (req, res) => {
  const tokenHeader = req.headers && req.headers.authorization;
  let token;
  if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
    // "Bearer " 스키마 제외
    token = tokenHeader.split(" ")[1];
  }
  const decoded = tokenUtil.verifyToken(token);
  const user_id = decoded.user_id;

  try {
    // 비즈니스 로직 호출
    // 룸 나가기 로직
    const leaveRoom = await wordService.leaveRoom(user_id);
    logger.info(`(word.leaveRoom.result) ${JSON.stringify(leaveRoom)}`);
        
    // 최종 응답
    res.status(200).json({ message: "룸 나가기 완료" });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

//Delete 게임방 삭제
router.delete("/deleteRoom/:user_id", isLoggedIn, async (req, res) => {
  const tokenHeader = req.headers && req.headers.authorization;
  let token;
  if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
    // "Bearer " 스키마 제외
    token = tokenHeader.split(" ")[1];
  }
  
  
  try {
    // 비즈니스 로직 호출
    // 방 제거 로직
    const deleteRoom = await wordService
      .roomDelete(user_id);
        logger.info(`(word.roomDelete.result) ${JSON.stringify(deleteRoom)}`);
        
    // 최종 응답
    res.status(200).json({ message: `게임방 삭제 완료` });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

//GET 특정 방을 이용중인 사용자 불러오기
router.get("/getRoomUsers", isLoggedIn, async (req, res) => {
  const tokenHeader = req.headers && req.headers.authorization;
  let token;
  if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
    // "Bearer " 스키마 제외
    token = tokenHeader.split(" ")[1];
  }
  const decoded = tokenUtil.verifyToken(token);
  const user_id = decoded.user_id;

  try {
    const result = await wordService.getRoomUsers(user_id);
    logger.info(
      `(wordService.findNickname.result) ${JSON.stringify(result)}`
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

//POST 사용자가 개설된 방에 참여
router.post("/joinroom", async (req, res) => {
  const user = req.body.username;
  const roomtitle = req.params.roomtitle;
  const result = await userRepository.joinRoom(user, roomtitle);
  const room = await roomRepository.addUserToRoom(user, roomtitle);

  res.status(200).json(room);
});

module.exports = router;
