const logger = require("../lib/logger");
const userInfoDao = require("../dao/userInfoDao");

const service = {
  // userInfo 입력
  async reg(params) {
    let inserted = null;
    try {
      inserted = await userInfoDao.insert(params);
      logger.debug(`(userInfoService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(userInfoService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 결과값 리턴
    return new Promise((resolve) => {
      // console.log(inserted);
      resolve(inserted);
    });
  },
  // selectList
  async list(params) {
    let result = null;

    try {
      result = await userInfoDao.selectList(params);
      logger.debug(`(userInfoService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userInfoService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // selectInfo
  async info(params) {
    let result = null;

    try {
      result = await userInfoDao.selectInfo(params);
      logger.debug(`(userInfoService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userInfoService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // update
  async edit(params) {
    let result = null;

    try {
      result = await userInfoDao.update(params);
      logger.debug(`(userInfoService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userInfoService.edit) ${err.toString()}`);
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
      result = await userInfoDao.delete(params);
      logger.debug(`(userInfoService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userInfoService.delete) ${err.toString()}`);
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
