const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const tokenUtil = require('./tokenUtil'); // 토큰 유틸리티 모듈
const { UserInfo } = require('../models/index'); // 시퀄라이즈 모델

const app = express();
const port = 1708;

// body-parser 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 로그인 라우트
app.post('/login', async (req, res) => {
  const { id, password } = req.body;

  try {
    // 사용자 인증
    const user = await UserInfo.findOne({
      where: {
        id: id,
        password: password,
      },
    });
    console.log(user);
    if (user) {
      // 토큰 생성
      const token = tokenUtil.makeToken(user);

      res.json({ token });
    } else {
      res
        .status(401)
        .json({ message: '유효하지 않은 사용자 이름 또는 비밀번호입니다.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 보호된 라우트
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: '보호된 라우트에 접근하였습니다!' });
});

// 토큰 인증 미들웨어
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: '인증되지 않은 요청입니다.' });
  }

  const decoded = tokenUtil.verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: '토큰 인증에 실패했습니다.' });
  }

  req.user = decoded;
  next();
}

// 서버 시작
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

