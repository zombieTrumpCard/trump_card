// userScore.js
const Sequelize = require("sequelize");

module.exports = class UserScore extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        score_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        date: {
          type: Sequelize.DATE,
        },
        level: {
          type: Sequelize.STRING(255),
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
    db.UserScore.belongsTo(db.UserInfo, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      as: "userScores",
    });
  }

  static includeAttributes = ["score_id", "date", "level"];
};
