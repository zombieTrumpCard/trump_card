const Sequelize = require("sequelize");

// table 생성
module.exports = class UserScore extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        score_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        score: {
          type: Sequelize.INTEGER,
        },
        date: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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

  // 관계 설정
  static associate(db) {
    db.UserScore.belongsTo(db.UserInfo, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      // as: "userScores",
    });
  }

  static includeAttributes = ["score_id", "date", "level"];
};
