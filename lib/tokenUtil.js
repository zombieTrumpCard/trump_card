const jwt = require("jsonwebtoken");

const secretKey = "fourGroup";
const options = {
  expiresIn: "10000h", // 만료시간
};

const tokenUtil = {
  // 토큰 생성
  makeToken(userInfo) {
    const payload = {
      id: userInfo.id,
      user_id: userInfo.user_id,
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  },
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);

      return decoded;
    } catch (err) {
      return null;
    }
  },
};

module.exports = tokenUtil;
