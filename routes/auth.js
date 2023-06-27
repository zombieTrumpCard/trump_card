var express = require('express');
const passport = require('passport');
const tokenUtil = require('../lib/tokenUtil');
var router = express.Router();
const axios = require('axios');
const userInfoService = require('../service/userInfoService');
const logger = require('../lib/logger');

router.get('/silent-refresh', (req, res, next) => {
  const { refreshToken } = req.cookies;

  const verifyAccessToken = tokenUtil.verifyToken(refreshToken);

  if (verifyAccessToken.id) {
    // refresh Token 갱신
    const accessToken = tokenUtil.makeToken(verifyAccessToken);
    const refreshToken = tokenUtil.makeToken(verifyAccessToken);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
    });

    return res.json({ accessToken });
  }

  return res.json({ test: 'Test' });
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', async (req, res, next) => {
  try {
    const { code } = req.query; // 프런트에서 인가코드 body에 담아서 보낸거 받기

    const { accessToken } = await getKakaoToken(code);

    const userInfo = await getUserInfo(accessToken);

    const user = await userInfoService.infoForSnsId(userInfo);
    const token = tokenUtil.makeToken(user);
    return res.redirect(`http://localhost:3000?token=${token}`);
  } catch (e) {
    console.log(e.message);
  }
});

const header = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  Authorization: 'Bearer ',
};

const getKakaoToken = async (code) => {
  const restApiKey = process.env.KAKAO_ID; // 앱키 - Rest API key

  const data = {
    grant_type: 'authorization_code',
    client_id: restApiKey,
    code,
  };

  const queryString = Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

  // 카카오 토큰 요청
  const token = await axios.post(
    'https://kauth.kakao.com/oauth/token',
    queryString,
    { headers: header }
  );

  // 엑세스 토큰 발급
  return { accessToken: token.data.access_token };
};

const getUserInfo = async (accessToken) => {
  // Authorization: 'Bearer access_token'
  // 엑세스 토큰 헤더에 담기
  header.Authorization += accessToken;

  console.log(`Authorization : ${header.Authorization}`);
  // 카카오 사용자 정보 조회
  const get = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: header,
  });
  // return get.data;
  const result = get.data;

  // id, email 추출
  return {
    id: result.id,
    email: result.kakao_account.email,
    // snsId: result.profile.id,
  };
};

module.exports = router;
