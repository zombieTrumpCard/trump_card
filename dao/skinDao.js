const { Skin } = require("../models/index");

const dao = {
  // 스킨상점
  selectList() {
    // where 검색 조건
    console.log();
    const setQuery = {};
    // order by 정렬 조건
    setQuery.order = [["price", "ASC"]];
    return new Promise((resolve, reject) => {
      Skin.findAll({
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
};

module.exports = dao;
