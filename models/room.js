const Sequelize = require("sequelize");

//table 생성
module.exports = class Room extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        room_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        room_name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: true,
        timestamps: true,
      }
    );
  }

  //관계 설정
  static associate(db) {
    db.Room.belongsTo(db.UserInfo, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      as: "room_owner",
    });
    db.Room.hasMany(db.RoomUsers, {
      foreignKey: { name: "room_id", allowNull: false },
    });
  }

  static includeAttributes = ["user_id", "room_id"];
};
