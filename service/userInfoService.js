const logger = require('../lib/logger');
const userInfoDao = require('../dao/userInfoDao');

const service = {
  // 회원가입
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
  // 내정보 조회
  async info(params) {
    let result = null;
    try {
      result = await userInfoDao.selectInfo(params);
      console.log(result);
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
  async infoForSnsId(params) {
    let result = null;
    try {
      result = await userInfoDao.infoForSnsId(params);
      // console.log(`result:${result}`);
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
  // 내정보 수정
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
  // 회원탈퇴
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
  // 아이디 중복 확인
  async ckid(params) {
    let result = null;
    try {
      result = await userInfoDao.checkId(params);
      console.log(result);
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

  // 닉네임 중복 확인
  async cknm(params) {
    let result = null;
    try {
      result = await userInfoDao.checkNm(params);
      console.log(result);
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
  // 티어 설정
  async tier(params) {
    let result = null;
    try {
      result = await userInfoDao.mktier(params);
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
};

module.exports = service;
