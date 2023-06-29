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

  // 룸 제거
  async roomDelete(user_id) {
    let deleted = null;
    try {
      deleted = await roomDao.delete(user_id);
      logger.debug(`(wordService.roomDelete) Room deleted: ${user_id}`);
    } catch (err) {
      logger.error(`(wordService.roomDelete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 결과값 리턴
    return deleted;
  },

  // 룸 나가기
  async leaveRoom(user_id) {
    try {
      // 룸 이용자 삭제 로직
      await roomUsersDao.delete(user_id);
      
      // 최종 응답
      return { message: "룸 나가기 완료" };
    } catch (err) {
      throw err;
    }
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

  // 룸 오너 찾기
  async findRoomOwner(user_id) {
    let result = null;
    try {
      result = await roomDao.selectUserId(user_id);
      logger.debug(`(wordService.selectUserId) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(wordService.selectUserId) ${err.toString()}`);
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

  // 룸 이용중인 사용자 리스트
  async getRoomUsers(user_id) {
    let result = null;
    try {
      const result1 = await roomUsersDao.selectOne(user_id);      
      result = await roomUsersDao.selectList(result1);
      logger.debug(`(wordService.getRoomUsers) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(skinService.getRoomUsers) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
//
