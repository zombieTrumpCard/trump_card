const express = require("express");

const router = express.Router();
const logger = require("../lib/logger");
const userSkinService = require("../service/userSkinService");

// 등록
router.post("/", async (req, res) => {
  try {
    const params = {
      user_skin_id: req.body.user_skin_id,
      user_id: req.body.user_id,
      skin_id: req.body.skin_id,
    };
    logger.info(`(userSkin.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.user_skin_id) {
      const err = new Error("Not allowed null (user_skin_id)");
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await userSkinService.reg(params);
    logger.info(`(userSkin.reg.result) ${JSON.stringify(result)}`);

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
      user_skin_id: req.query.user_skin_id,
    };
    logger.info(`(userSkin.list.params) ${JSON.stringify(params)}`);

    const result = await userSkinService.list(params);
    logger.info(`(userSkin.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put("/:id", async (req, res) => {
  try {
    const params = {
      user_skin_id: req.body.user_skin_id,
      user_id: req.body.user_id,
      skin_id: req.body.skin_id,
    };
    logger.info(`(userSkin.update.params) ${JSON.stringify(params)}`);

    const result = await userSkinService.edit(params);
    logger.info(`(userSkin.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete("/:id", async (req, res) => {
  try {
    const params = {
      under_skin_id: req.params.under_skin_id,
    };
    logger.info(`(userSkin.delete.params) ${JSON.stringify(params)}`);

    const result = await userSkinService.delete(params);
    logger.info(`(userSkin.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
