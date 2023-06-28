const logger = require("../lib/logger");
const userScoreDao = require("../dao/userScoreDao");

const service = {
  // 등록
  async reg(params) {
    let inserted = null;
    try {
      inserted = await userScoreDao.insert(params);
      console.log(inserted);
      logger.debug(`(userScoreService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(userScoreService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // 조회
  async list(params) {
    let result = null;

    try {
      result = await userScoreDao.selectList(params);
      logger.debug(`(userScoreService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userScoreService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 상세조회
  async info(params) {
    let result = null;

    try {
      result = await userScoreDao.search(params);
      logger.debug(`(userScoreService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userScoreService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // delelte
  async delete(params) {
    let result = null;
    try {
      result = await userScoreDao.delete(params);
      logger.debug(`(userScoreService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userScoreService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // tier
  async edit() {
    let result = null;

    try {
      result = await userScoreDao.assignTiersToUsers();
      logger.debug(`(userScoreService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userScoreService.edit) ${err.toString()}`);
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
