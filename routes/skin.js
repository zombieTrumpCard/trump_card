const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");
const skinService = require("../service/skinService");

// 스킨상점
router.get("/ckskin", async (req, res) => {
  try {
    logger.info(`(skin.list) ${JSON.stringify()}`);

    const result = await skinService.list();
    logger.info(`(skin.list.result) ${JSON.stringify(result)}`);
    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
