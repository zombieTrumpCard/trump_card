const logger = require("../lib/logger");
const roomDao = require("../dao/roomDao");
const roomUsersDao = require("../dao/roomUsersDao");

const service = {
  // 룸 리스트
  async roomlist() {
    let result = null;
    try {
      result = await roomDao.selectList();
      logger.debug(`(wordService.roomlist) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(skinService.roomlist) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 룸 생성
  async roomCreate(params) {
    let inserted = null;
    try {
      inserted = await roomDao.insert(params);
      logger.debug(`(wordService.roomCreate) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(wordService.roomCreate) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

  // 닉네임 찾기
  async findNickname(user_id) {
    let result = null;
    try {
      result = await roomDao.selectNickname(user_id);
      logger.debug(`(wordService.findNickname) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(wordService.findNickname) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 룸 이용자 등록
  async joinRoom(params) {
    let inserted = null;
    try {
      inserted = await roomUsersDao.insert(params);
      logger.debug(`(wordService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(wordService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

};

module.exports = service;
//
