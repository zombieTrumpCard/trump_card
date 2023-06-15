const logger = require("../lib/logger");
const skinDao = require("../dao/skinDao");

const service = {
  // skin 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await skinDao.insert(params);
      logger.debug(`(skinService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(skinService.reg) ${err.toString()}`);
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
      result = await skinDao.selectList(params);
      logger.debug(`(skinService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(skinService.list) ${err.toString()}`);
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
      result = await skinDao.selectInfo(params);
      logger.debug(`(skinService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(skinService.info) ${err.toString()}`);
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
      result = await skinDao.update(params);
      logger.debug(`(skinService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(skinService.edit) ${err.toString()}`);
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
      result = await skinDao.delete(params);
      logger.debug(`(skinService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(skinService.delete) ${err.toString()}`);
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
