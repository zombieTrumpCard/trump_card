const { UserInfo, Room, RoomUsers } = require("../models/index");

const dao = {
  // 유저 입장
  insert(params) {
    return new Promise((resolve, reject) => {
      RoomUsers.create(params)
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  
  // 내가 속한 방 조회
  selectOne(user_id) {
    return new Promise((resolve, reject) => {
      RoomUsers.findOne({
        where: { user_id: user_id },
      })
        .then((result) => {
          resolve( result.room_id );
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 유저 조회
  async selectList(room_id) {
    return await RoomUsers.findAll({
      raw: true,
      where: { room_id: room_id },
      order: [["created_at", "ASC"]],
      include: [
        {
          model: UserInfo,
          attributes: ["nickname"],
        },
      ],
    });
  },

  // 유저 퇴장
  async delete(user_id) {
    try {
      const room = await Room.findOne({
        where: { user_id : user_id },
      });
      if (!room) {
        // 해당 user_id에 해당하는 Room이 없는 경우에 대한 처리
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
