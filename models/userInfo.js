// userInfo.js
const Sequelize = require("sequelize");

module.exports = class UserInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        tier: {
          type: Sequelize.STRING(50),
        },
        point: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        underscored: true,
        timestamps: false,
      }
    );
  }

  static associate(db) {
    db.UserInfo.hasMany(db.UserSkin, {
      foreignKey: { name: "user_id", allowNull: false },
      as: "userSkins",
    });
    db.UserInfo.hasMany(db.UserScore, {
      foreignKey: { name: "user_id", allowNull: false },
      as: "userScores",
    });
  }

  static includeAttributes = ["id", "nickname", "tier", "point"];
};
