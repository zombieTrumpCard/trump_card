const { UserInfo, UserScore, UserSkin, Skin } = require("../models/index");

const dao = {
  // 회원가입
  insert(params) {
    return new Promise((resolve, reject) => {
      UserInfo.create(params)
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
  // 내정보 조회
  async selectInfo(params) {
    console.log(params.id);

    const userInfo = await UserInfo.findOne({
      where: { id: params.id },
    });

    const userScores = await UserScore.findAll({
      where: { level: "hard", user_id: userInfo.user_id },
      attributes: ["score"],
      order: [["score", "DESC"]],
      limit: 1,
    });

    const userSkin = await UserSkin.findOne({
      where: { active_skin: true, user_id: userInfo.user_id },
      attributes: ["skin_id"],
    });

    let skinName = null;
    if (userSkin) {
      const skin = await Skin.findOne({
        where: { skin_id: userSkin.skin_id },
        attributes: ["skin"],
      });
      skinName = skin ? skin.skin : null;
    }

    return {
      userInfo,
      userScores,
      userSkin,
      skinName,
    };
  },

  // 내정보 수정
  update(params) {
    return new Promise((resolve, reject) => {
      UserInfo.update(params, {
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

  // 회원탈퇴
  delete(params) {
    return new Promise((resolve, reject) => {
      UserInfo.destroy({
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

  // 아이디 중복 확인
  checkId(params) {
    return new Promise((resolve, reject) => {
      UserInfo.findOne({
        where: { id: params.id },
      })
        .then((userInfo) => {
          if (userInfo) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 닉네임 중복 확인
  checkNm(params) {
    return new Promise((resolve, reject) => {
      UserInfo.findOne({
        where: { nickname: params.nickname },
      })
        .then((userInfo) => {
          if (userInfo) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
