const Sequelize = require('sequelize');

//table 생성
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
          // allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(255),
          // allowNull: false,
        },
        provider: {
          type: Sequelize.ENUM('local', 'kakao'),
          // allowNull: false,
          defaultValue: 'local',
        },
        sns_id: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        nickname: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        phonenum: {
          type: Sequelize.STRING(255),
        },
        tier: {
          type: Sequelize.STRING(50),
        },
        point: {
          type: Sequelize.INTEGER,
        },
        totalscore: {
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

  //관계 설정
  static associate(db) {
    db.UserInfo.hasMany(db.UserSkin, {
      foreignKey: { name: 'user_id', allowNull: false },
      // as: "userSkins",
    });
    db.UserInfo.hasMany(db.UserScore, {
      foreignKey: { name: 'user_id', allowNull: false },
      // as: "userScores",
    });
  }

  static includeAttributes = ['id', 'nickname', 'tier', 'point'];
};
