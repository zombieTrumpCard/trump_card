const { Op } = require("sequelize");
const { UserSkin, UserInfo, Skin } = require("../models/index");

const dao = {
  // 스킨 구매
  async insert(params) {
    try {
      const userInfo = await UserInfo.findOne({
        where: { id: params.id },
      });
      if (!userInfo) {
        return null;
      }

      const skin = await Skin.findOne({
        where: { skin_id: params.skin_id },
      });
      if (!skin) {
        return null;
      }

      // 스킨 가격만큼 userInfo의 point 차감
      const updatedUserInfo = await UserInfo.update(
        { point: userInfo.point - skin.price },
        { where: { id: params.id } }
      );

      const userSkin = await UserSkin.create({
        user_id: userInfo.user_id,
        skin_id: skin.skin_id,
        active_skin: false,
      });
      return userSkin, updatedUserInfo;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  // 내가 보유중인 스킨 조회
  async search(params) {
    try {
      const userInfo = await UserInfo.findOne({
        where: { id: params.id },
      });
      console.log(userInfo);
      if (!userInfo) {
        // 해당 id에 해당하는 UserInfo가 없는 경우에 대한 처리
        return null;
      }
      const userSkins = await UserSkin.findAll({
        include: [
          {
            model: Skin,
          },
        ],
        where: { user_id: userInfo.user_id },
      });
      return userSkins;
    } catch (err) {
      // 오류 처리
      console.error(err);
      throw err;
    }
  },

  // 내가 적용중인 스킨 조회
  async selectInfo(params) {
    try {
      const userInfo = await UserInfo.findOne({
        where: { id: params.id },
      });
      if (!userInfo) {
        // 해당 id에 해당하는 UserInfo가 없는 경우에 대한 처리
        return null;
      }
      const useSkin = await UserSkin.findOne({
        include: [
          {
            model: Skin,
            attributes: {
              exclude: ["skin_id", "price"],
            },
          },
        ],
        where: { active_skin: true, user_id: userInfo.user_id },
      });
      return useSkin;
    } catch (err) {
      // 오류 처리
      console.error(err);
      throw err;
    }
  },
  // 스킨 변경
  async update(params) {
    try {
      await UserSkin.update(
        { active_skin: false },
        {
          where: { active_skin: true, user_id: params.user_id },
        }
      );
      const changeSkin = await UserSkin.update(
        { active_skin: true },
        {
          where: { skin_id: params.skin_id, user_id: params.user_id },
        }
      );
      return changeSkin;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  // 삭제
  async delete(params) {
    try {
      const userInfo = await UserInfo.findOne({
        where: { id: params.id },
      });
      if (!userInfo) {
        // 해당 id에 해당하는 UserInfo가 없는 경우에 대한 처리
        return null;
      }

      const userSkin = await UserSkin.destroy({
        where: { user_id: userInfo.user_id },
      });
      if (userSkin.length === 0) {
        // 해당 user_id에 해당하는 UserScore가 없는 경우에 대한 처리
        return null;
      }
      return userSkin;
    } catch (err) {
      // 오류 처리
      console.error(err);
      throw err;
    }
  },
};

module.exports = dao;
