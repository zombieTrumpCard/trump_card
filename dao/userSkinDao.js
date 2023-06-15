const { Op } = require("sequelize");
const { UserSkin } = require("../models/index");

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      UserSkin.create(params)
        .then((inserted) => {
          // password는 제외하고 리턴함
          const insertedResult = { ...inserted };
          delete insertedResult.dataValues.password;
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 리스트 조회
  selectList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` }, // like검색
      };
    }

    // order by 정렬 조건
    setQuery.order = [["id", "DESC"]];

    return new Promise((resolve, reject) => {
      userSkin
        .findAndCountAll({
          ...setQuery,
        })
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 상세정보 조회
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      userSkin
        .findByPk(params.id)
        .then((selectedInfo) => {
          resolve(selectedInfo);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      userSkin
        .update(params, {
          where: { id: params.id },
        })
        .then(([updated]) => {
          resolve({ updatedCount: updated });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      userSkin
        .destroy({
          where: { id: params.id },
        })
        .then((deleted) => {
          resolve({ deletedCount: deleted });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
