// skin.js
const Sequelize = require("sequelize");

module.exports = class Skin extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        skin_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        skin: {
          type: Sequelize.STRING(255),
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
    db.Skin.hasMany(db.UserSkin, {
      foreignKey: { name: "skin_id", allowNull: false },
      as: "userSkins",
    });
  }

  static includeAttributes = ["skin_id", "skin"];
};
