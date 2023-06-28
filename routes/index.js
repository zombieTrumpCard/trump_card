const express = require('express');
const logger = require('../lib/logger');
const userInfoRouter = require('./userInfo');
const authRouter = require('./auth');
const userSkinRouter = require('./userSkin');
const userScoreRouter = require('./userScore');
const skinRouter = require('./skin');
const apiRouter = require("./api");
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// logTest
router.get('/log-test', (req, res, next) => {
  logger.error('This message is error');
  logger.warn('This message is warn');
  logger.info('This message is info');
  logger.verbose('This message is verbose');
  logger.debug('This message is debug');
  logger.silly('This message is silly');

  res.send('log test');
});
router.use('/auth', authRouter);
// userInfo
router.use('/userInfos', userInfoRouter);
// userInfo
router.use('/userSkins', userSkinRouter);
// userInfo
router.use('/skinS', skinRouter);
// userInfo
router.use('/userScores', userScoreRouter);
//api
router.use("/api", apiRouter);

module.exports = router;
