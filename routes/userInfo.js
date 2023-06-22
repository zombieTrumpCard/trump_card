var express = require("express");
var router = express.Router();
const logger = require("../lib/logger");
const tokenUtil = require("../lib/tokenUtil");
const hashUtil = require("../lib/hashUtil");
const userInfoService = require("../service/userInfoService");
const { UserInfo } = require("../models/index");
const bodyParser = require("body-parser");
const { isLoggedIn } = require("../lib/middleware");

// body-parser 설정
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// 회원가입
router.post("/join", async (req, res) => {
  try {
    const params = {
      id: req.body.id,
      password: req.body.password,
      nickname: req.body.nickname,
      phonenum: req.body.phonenum,
      point: 0,
      totalscore: 0,
    };
    logger.info(`(userInfo.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.id || !params.password || !params.nickname) {
      const err = new Error("Not allowed null (id,password,nickname)");
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비밀번호 암호화
    const hashedPassword = await hashUtil.makeHash(params.password);

    // 암호화된 비밀번호로 params 업데이트
    params.password = hashedPassword;
    const result = await userInfoService.reg(params);
    logger.info(`(userInfo.reg.result) ${JSON.stringify(result)}`);
    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { id, password } = req.body;
  console.log(req.body);
  try {
    // 사용자 인증
    const user = await UserInfo.findOne({
      where: {
        id: id,
      },
    });
    // 비밀번호 검증
    if (
      user !== null &&
      (await hashUtil.checkHash(password, user.password)) == true
    ) {
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

// 내정보 수정
router.put("/reUser", isLoggedIn, async (req, res) => {
  const tokenHeader = req.headers && req.headers.authorization;
  let token;

  if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
    // "Bearer " 스키마 제외
    token = tokenHeader.split(" ")[1];
  }
  const decoded = tokenUtil.verifyToken(token);
  const id = decoded.id;
  try {
    const params = {
      id: id,
      nickname: req.body.nickname,
    };

    logger.info(`(userInfo.update.params) ${JSON.stringify(params)}`);
    const result = await userInfoService.edit(params);
    console.log(result);
    logger.info(`(userInfo.update.result) ${JSON.stringify(result)}`);
    const response = {
      id: result.id,
      phonenum: result.phonenum,
    };
    // 최종 응답
    console.log(response);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 내정보 조회
router.get("/myInfo", isLoggedIn, async (req, res) => {
  const tokenHeader = req.headers && req.headers.authorization;
  let token;

  if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
    // "Bearer " 스키마 제외
    token = tokenHeader.split(" ")[1];
  }

  const decoded = tokenUtil.verifyToken(token);
  const id = decoded.id;
  try {
    const params = {
      id: id,
    };
    logger.info(`(userInfo.info.params) ${JSON.stringify(params)}`);

    const result = await userInfoService.info(params);
    logger.info(`(userInfo.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 회원탈퇴
router.delete("/deleteInfo", isLoggedIn, async (req, res) => {
  const tokenHeader = req.headers && req.headers.authorization;
  let token;

  if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
    // "Bearer " 스키마 제외
    token = tokenHeader.split(" ")[1];
  }
  const decoded = tokenUtil.verifyToken(token);
  const id = decoded.id;
  console.log(id);
  try {
    const params = {
      id: id,
    };
    logger.info(`(userInfo.delete.params) ${JSON.stringify(params)}`);

    const result = await userInfoService.delete(params);
    logger.info(`(userInfo.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 아이디 중복 확인
router.get("/checkId", async (req, res) => {
  try {
    const params = {
      id: req.query.id,
    };
    logger.info(`(userInfo.info.params) ${JSON.stringify(params)}`);
    const result = await userInfoService.ckid(params);
    console.log(result);
    if (!result) {
      res.status(409).json({ message: "이미 가입된 아이디입니다." });
    }
    logger.info(`(userInfo.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 닉네임 중복 확인
router.get("/checkNickname", async (req, res) => {
  try {
    const params = {
      nickname: req.query.nickname,
    };
    logger.info(`(userInfo.info.params) ${JSON.stringify(params)}`);
    const result = await userInfoService.cknm(params);
    if (!result) {
      res.status(409).json({ message: "이미 존재하는 닉네임입니다." });
    }
    logger.info(`(userInfo.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
// 티어설정
router.put("/tier", async (req, res) => {
  try {
    logger.info(`(userInfo.info) ${JSON.stringify()}`);
    const result = await userInfoService.tier();
    logger.info(`(userInfo.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
