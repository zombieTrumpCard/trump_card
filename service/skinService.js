const logger = require("../lib/logger");
const skinDao = require("../dao/skinDao");

const service = {
  // 스킨상점
  async list() {
    let result = null;

    try {
      result = await skinDao.selectList();
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
};

module.exports = service;
//
