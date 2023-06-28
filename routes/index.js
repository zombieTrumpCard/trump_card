const express = require("express");
const logger = require("../lib/logger");
const userInfoRouter = require("./userInfo");
const userSkinRouter = require("./userSkin");
const userScoreRouter = require("./userScore");
const skinRouter = require("./skin");
const wordRouter = require("./word");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

// logTest
router.get("/log-test", (req, res, next) => {
  logger.error("This message is error");
  logger.warn("This message is warn");
  logger.info("This message is info");
  logger.verbose("This message is verbose");
  logger.debug("This message is debug");
  logger.silly("This message is silly");

  res.send("log test");
});
// userInfo
router.use("/userInfos", userInfoRouter);
// userSkins
router.use("/userSkins", userSkinRouter);
// skinS
router.use("/skinS", skinRouter);
// userScores
router.use("/userScores", userScoreRouter);
// word
router.use("/word", wordRouter);

module.exports = router;
