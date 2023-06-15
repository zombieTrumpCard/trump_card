// bcrypt로 비밀번호 암호화 (async)
const bcrypt = require("bcrypt");

const makeHash = async (password, saltRounds = 10) => {
  return await bcrypt.hash(password, saltRounds);
};

// bcrypt 검증
const checkHash = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { makeHash, checkHash };
//
