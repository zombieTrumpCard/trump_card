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

  // 유저 조회
  async selectList(params) {
    return await RoomUsers.findAll({
      raw: true,
      where: { room_id: params.room_id },
      // order: [["nickname", "ASC"]],
      include: [
        {
          model: UserInfo,
          attributes: ["nickname"],
        },
      ],
    });
  },

  // 유저 퇴장
  async delete(params) {
    try {
      const room = await Room.findOne({
        where: { room_name: params.room_name },
      });
      if (!room) {
        // 해당 room_name에 해당하는 Room이 없는 경우에 대한 처리
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
