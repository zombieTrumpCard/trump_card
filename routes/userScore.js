const express = require("express");

const router = express.Router();
const logger = require("../lib/logger");
const userScoreService = require("../service/userScoreService");

// 등록
router.post("/", async (req, res) => {
  try {
    const params = {
      score_id: req.body.score_id,
      user_id: req.body.user_id,
      date: req.body.date,
      level: req.body.level,
    };
    logger.info(`(userScore.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.score_id) {
      const err = new Error("Not allowed null (score_id)");
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await userScoreService.reg(params);
    logger.info(`(userScore.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get("/", async (req, res) => {
  try {
    const params = {
      user_id: req.query.user_id,
    };
    logger.info(`(userScore.list.params) ${JSON.stringify(params)}`);

    const result = await userScoreService.list(params);
    logger.info(`(userScore.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 상세정보 조회
router.get("/:user", async (req, res) => {
  try {
    const params = {
      user_id: req.params.user_id,
    };
    logger.info(`(userScore.info.params) ${JSON.stringify(params)}`);

    const result = await userScoreService.info(params);
    logger.info(`(userScore.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete("/:user", async (req, res) => {
  try {
    const params = {
      user_id: req.params.user_id,
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
