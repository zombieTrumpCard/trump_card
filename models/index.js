const { sequelize } = require("./connection");
const UserInfo = require("./userInfo");
const Skin = require("./skin");
const UserSkin = require("./userSkin");
const UserScore = require("./userScore");

const db = {};

db.sequelize = sequelize;

// model 생성
db.UserInfo = UserInfo;
db.Skin = Skin;
db.UserSkin = UserSkin;
db.UserScore = UserScore;

// model init
UserInfo.init(sequelize);
Skin.init(sequelize);
UserSkin.init(sequelize);
UserScore.init(sequelize);

//관계생성;
UserInfo.associate(db);
Skin.associate(db);
UserSkin.associate(db);
UserScore.associate(db);

module.exports = db;
