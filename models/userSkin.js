// userSkin.js
const Sequelize = require("sequelize");

module.exports = class UserSkin extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_skin_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        skin_id: {
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
    db.UserSkin.belongsTo(db.UserInfo, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      as: "userSkins",
    });
    db.UserSkin.belongsTo(db.Skin, {
      foreignKey: "skin_id",
      onDelete: "CASCADE",
      as: "userScores",
    });
  }

  static includeAttributes = ["user_skin_id"];
};
