var express = require("express");
var router = express.Router();
const logger = require("../lib/logger");
const tokenUtil = require("../lib/tokenUtil");
const hashUtil = require("../lib/hashUtil"); // hashUtil 모듈을 추가로 가져옵니다.
const userInfoService = require("../service/userInfoService");
const { UserInfo } = require("../models/index"); // 시퀄라이즈 모델
const bodyParser = require("body-parser");

// body-parser 설정
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// 회원가입
router.post("/make", async (req, res) => {
  try {
    const params = {
      user_id: req.body.user_id,
      id: req.body.id,
      password: req.body.password,
      nickname: req.body.nickname,
      phonenum: req.body.phonenum,
    };

    // console.log(params);
    logger.info(`(userInfo.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.id || !params.password || !params.nickname) {
      const err = new Error("Not allowed null (id,password,nickname)");
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
      // 비즈니스 로직 호출
    }
    // 비밀번호 암호화
    const hashedPassword = await hashUtil.makeHash(params.password);

    // 암호화된 비밀번호로 params 업데이트
    params.password = hashedPassword;
    const result = await userInfoService.reg(params);
    logger.info(`(userInfo.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    // 사용자 인증
    const user = await UserInfo.findOne({
      where: {
        id: id,
      },
    });

    if ((await hashUtil.checkHash(password, user.password)) == true) {
      // 토큰 생성
      const token = tokenUtil.makeToken(user);
      res.json({ token });
    } else {
      res
        .status(401)
        .json({ message: "유효하지 않은 사용자 이름 또는 비밀번호입니다." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
