const logger = require("../lib/logger");
const userSkinDao = require("../dao/userSkinDao");
const { param } = require("../routes/userSkin");

const service = {
  // userSkin 입력
  async reg(params) {
    let inserted = null;
    console.log(params);
    try {
      inserted = await userSkinDao.insert(params);
      logger.debug(`(userSkinService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(userSkinService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // selectList
  async list(params) {
    let result = null;

    try {
      result = await userSkinDao.search(params);
      logger.debug(`(userSkinService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userSkinService.list) ${err.toString()}`);
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
      result = await userSkinDao.selectInfo(params);
      logger.debug(`(userSkinService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userSkinService.info) ${err.toString()}`);
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
      result = await userSkinDao.update(params);
      logger.debug(`(userSkinService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userSkinService.edit) ${err.toString()}`);
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
      result = await userSkinDao.delete(params);
      logger.debug(`(userSkinService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userSkinService.delete) ${err.toString()}`);
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
