const express = require("express");

const router = express.Router();
const logger = require("../lib/logger");
const skinService = require("../service/skinService");

// 등록
router.post("/", async (req, res) => {
  try {
    const params = {
      skin_id: req.body.skin_id,
      skin: req.body.skin,
    };
    logger.info(`(skin.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.skin_id) {
      const err = new Error("Not allowed null (skin_id)");
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await skinService.reg(params);
    logger.info(`(skin.reg.result) ${JSON.stringify(result)}`);

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
      skin: req.query.skin,
    };
    logger.info(`(skin.list.params) ${JSON.stringify(params)}`);

    const result = await skinService.list(params);
    logger.info(`(skin.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 상세정보 조회
router.get("/:skin", async (req, res) => {
  try {
    const params = {
      skin: req.params.skin,
    };
    logger.info(`(skin.info.params) ${JSON.stringify(params)}`);

    const result = await skinService.info(params);
    logger.info(`(skin.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
