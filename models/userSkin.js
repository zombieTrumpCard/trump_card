const Sequelize = require("sequelize");

// table 생성
module.exports = class UserSkin extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        skin_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        active_skin: {
          type: Sequelize.BOOLEAN,
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
    db.UserSkin.belongsTo(db.UserInfo, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      // as: "userSkins",
    });
    db.UserSkin.belongsTo(db.Skin, {
      foreignKey: "skin_id",
      onDelete: "CASCADE",
      // as: "userScores",
    });
  }

  static includeAttributes = ["user_skin_id", "skin_id", "user_id"];
};
