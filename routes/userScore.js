const express = require("express");
const { isLoggedIn } = require("../lib/middleware");
const router = express.Router();
const logger = require("../lib/logger");
const userScoreService = require("../service/userScoreService");
const tokenUtil = require("../lib/tokenUtil");
// 점수 등록
router.post("/mkscore", isLoggedIn, async (req, res) => {
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
    const params = {
      id: id,
      user_id: user_id,
      score: req.body.score,
      level: req.body.level,
      point: req.body.point,
    };
    logger.info(`(userScore.reg.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await userScoreService.reg(params);
    logger.info(`(userScore.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 전체 점수 (로그인 이전) 조회
router.get("/ckscoreBefore", async (req, res) => {
  try {
    const level = req.query.level;
    console.log("11", level);
    const params = {
      level: req.query.level,
    };
    console.log("22", params);
    logger.info(`(userScore.list.params) ${JSON.stringify(params)}`);
    const result = await userScoreService.list(params);
    logger.info(`(userScore.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 나의 최고점수 조회
router.get("/cbScore", isLoggedIn, async (req, res) => {
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
    const params = {
      id: id,
      user_id: user_id,
      level: req.query.level,
    };
    console.log(params.level);
    logger.info(`(userScore.info.params) ${JSON.stringify(params)}`);
    const result = await userScoreService.info(params);
    logger.info(`(userScore.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "해당 난이도 점수가 없습니다!" });
  }
});

// 탈퇴
router.delete("/deleteScore", isLoggedIn, async (req, res) => {
  const tokenHeader = req.headers && req.headers.authorization;
  let token;

  if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
    // "Bearer " 스키마 제외
    token = tokenHeader.split(" ")[1];
  }
  const decoded = tokenUtil.verifyToken(token);
  const id = decoded.id;
  try {
    const params = {
      id: id,
    };
    logger.info(`(userScore.delete.params) ${JSON.stringify(params)}`);

    const result = await userScoreService.delete(params);
    logger.info(`(userScore.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
