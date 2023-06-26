const { UserScore, UserInfo } = require("../models/index");

const dao = {
  // 점수 등록
  async insert(params) {
    try {
      await UserScore.create(params);
      let userInfo = await UserInfo.findOne({
        where: { user_id: params.user_id },
      });
      if (userInfo) {
        let updatedPoint = userInfo.point + params.point;
        await UserInfo.update(
          { point: updatedPoint },
          { where: { user_id: params.user_id } }
        );
        console.log(updatedPoint, userInfo.point, params.point);

        let totalScore = 0;
        if (userInfo.totalscore) {
          totalScore = userInfo.totalscore;
        }
        console.log(`default : ${totalScore}`);
        if (params.level === "Hard") {
          totalScore += params.score * 3;
        } else if (params.level === "Normal") {
          totalScore += params.score * 2;
        } else if (params.level === "Easy") {
          totalScore += params.score * 1;
        }
        await UserInfo.update(
          { totalscore: totalScore },
          { where: { user_id: params.user_id } }
        );
        console.log(`change : ${totalScore}`);
        console.log(totalScore, userInfo.totalscore, params.score);
      }
      const userInfos = await UserInfo.findAll({
        order: [["totalscore", "DESC"]],
      });
      const total = userInfos.length;

      for (let i = 0; i < total; i++) {
        let score = userInfos[i];
        let tier;
        if (i < Math.ceil(total * 0.05)) {
          tier = "다이아";
        } else if (i < Math.ceil(total * 0.15)) {
          tier = "플래티넘";
        } else if (i < Math.ceil(total * 0.4)) {
          tier = "골드";
        } else if (i < Math.ceil(total * 0.7)) {
          tier = "실버";
        } else {
          tier = "브론즈";
        }
        await UserInfo.update({ tier: tier }, { where: { id: score.id } });
      }

      return params, userInfos;
    } catch (err) {
      throw err;
    }
  },

  // 랭킹
  async selectList(params) {
    return await UserScore.findAll({
      raw: true,
      where: { level: params.level },
      order: [["score", "DESC"]],
      include: [
        {
          model: UserInfo,
          // as: "userScores",
          attributes: ["tier", "nickname"],
        },
      ],
      limit: 15,
    });
  },

  // 자신의 최고점수 조회
  async search(params) {
    try {
      const userInfo = await UserInfo.findOne({
        where: { id: params.id },
      });
      if (!userInfo) {
        // 해당 id에 해당하는 UserInfo가 없는 경우에 대한 처리
        return null;
      }
      console.log(userInfo);

      const userScores = await UserScore.findOne({
        raw: true,
        where: { user_id: params.user_id, level: params.level },
        order: [["score", "DESC"]],
        include: [
          {
            model: UserInfo,
            attributes: ["tier", "nickname"],
          },
        ],
        limit: 1,
      });
      if (userScores.length === 0) {
        // 해당 user_id에 해당하는 UserScore가 없는 경우에 대한 처리
        return null;
      }

      // const highestScore = userScores.score;
      console.log(userScores);
      return userScores.score;
    } catch (err) {
      // 오류 처리
      console.error(err);
      throw err;
    }
  },

  // 탈퇴
  async delete(params) {
    try {
      const userInfo = await UserInfo.findOne({
        where: { id: params.id },
      });
      if (!userInfo) {
        // 해당 id에 해당하는 UserInfo가 없는 경우에 대한 처리
        return null;
      }

      const userScores = await UserScore.destroy({
        where: { user_id: userInfo.user_id },
      });
      if (userScores.length === 0) {
        // 해당 user_id에 해당하는 UserScore가 없는 경우에 대한 처리
        return null;
      }
      return userScores;
    } catch (err) {
      // 오류 처리
      console.error(err);
      throw err;
    }
  },
};

module.exports = dao;
