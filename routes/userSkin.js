const express = require("express");
const { isLoggedIn } = require("../lib/middleware");
const router = express.Router();
const logger = require("../lib/logger");
const userSkinService = require("../service/userSkinService");
const tokenUtil = require("../lib/tokenUtil");

// 스킨구매
router.post("/buySkin", isLoggedIn, async (req, res) => {
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
      skin_id: req.body.skin_id,
    };
    logger.info(`(userSkin.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.skin_id) {
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

// 내가 보유중인 스킨 조회
router.get("/ckSkin", isLoggedIn, async (req, res) => {
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
    logger.info(`(userSkin.list.params) ${JSON.stringify(params)}`);

    const result = await userSkinService.list(params);
    logger.info(`(userSkin.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 내가 적용 중인 스킨 조회(현재)
router.get("/useSkin", isLoggedIn, async (req, res) => {
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
    logger.info(`(userSkin.info.params) ${JSON.stringify(params)}`);
    console.log(params.id);
    const result = await userSkinService.info(params);
    logger.info(`(userSkin.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 스킨변경
router.put("/updateSkin", isLoggedIn, async (req, res) => {
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
      active_skin: true,
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

// 회원탈퇴
router.delete("/deleteSkin", isLoggedIn, async (req, res) => {
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
