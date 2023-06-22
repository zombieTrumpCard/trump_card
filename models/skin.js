const Sequelize = require("sequelize");

//table 생성
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
        price: {
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
  // 관계설정
  static associate(db) {
    db.Skin.hasMany(db.UserSkin, {
      foreignKey: { name: "skin_id", allowNull: false },
      as: "userSkins",
    });
  }

  static includeAttributes = ["skin_id", "skin"];
};
