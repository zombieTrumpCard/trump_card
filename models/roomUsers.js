const Sequelize = require("sequelize");

// table 생성
module.exports = class RoomUsers extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // user_id: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        // },
        // room_id: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        // },
      },
      {
        sequelize,
        underscored: true,
        timestamps: true,
      }
    );
  }

  // 관계 설정
  static associate(db) {
    db.RoomUsers.belongsTo(db.UserInfo, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    db.RoomUsers.belongsTo(db.Room, {
      foreignKey: "room_id",
      onDelete: "CASCADE",
    });
  }

  static includeAttributes = ["user_id", "room_id"];
};
