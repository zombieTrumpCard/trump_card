const { Room, UserInfo } = require("../models/index");

const dao = {
  // 방 생성
  insert(params) {
    return new Promise((resolve, reject) => {
      Room.create(params)
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 닉네임 조회
  selectNickname(user_id) {
    return new Promise((resolve, reject) => {
      UserInfo.findOne({
        where: { user_id: user_id },
      })
        .then((result) => {
          resolve( result.nickname );
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 방 조회
  selectList() {
    // where 검색 조건
    const setQuery = {};
    // order by 정렬 조건
    setQuery.order = [["title", "ASC"]];
    return new Promise((resolve, reject) => {
      Room.findAll({
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

  // 방 삭제
  async delete(params) {
    try {
      const room = await Room.findOne({
        where: { room_id: params.room_id },
      });
      if (!room) {
        // 해당 room_id에 해당하는 Room이 없는 경우에 대한 처리
        return null;
      }
    } catch (err) {
      // 오류 처리
      console.error(err);
      throw err;
    }
  },
};

module.exports = dao;
