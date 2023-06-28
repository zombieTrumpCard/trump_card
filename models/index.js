const { sequelize } = require("./connection");
const UserInfo = require("./userInfo");
const Skin = require("./skin");
const UserSkin = require("./userSkin");
const UserScore = require("./userScore");
const Room = require("./room");
const RoomUsers = require("./roomUsers");

const db = {};

db.sequelize = sequelize;

// model 생성
db.UserInfo = UserInfo;
db.Skin = Skin;
db.UserSkin = UserSkin;
db.UserScore = UserScore;
db.Room = Room;
db.RoomUsers = RoomUsers;

// model init
UserInfo.init(sequelize);
Skin.init(sequelize);
UserSkin.init(sequelize);
UserScore.init(sequelize);
Room.init(sequelize);
RoomUsers.init(sequelize);

//관계생성;
UserInfo.associate(db);
Skin.associate(db);
UserSkin.associate(db);
UserScore.associate(db);
Room.associate(db);
RoomUsers.associate(db);

module.exports = db;
