const logger = require("./logger");
const tokenUtil = require("./tokenUtil");

const middleware = {
  // 로그인 체크
  isLoggedIn(req, res, next) {
    const tokenHeader = req.headers && req.headers.authorization;
    let token;

    if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
      // "Bearer " 스키마 제외
      token = tokenHeader.split(" ")[1];
    }

    if (token) {
      // 토큰이 있는 경우 토큰 검증을 수행 한다.
      const decoded = tokenUtil.verifyToken(token);

      if (decoded) {
        // 1. 토큰 검증이 성공한 경우 새로 갱신해 준다.
        const newToken = tokenUtil.makeToken(decoded);
        res.set({ token: newToken, userId: decoded.id }); // header 세팅

        next(); // 미들웨어 통과(계속 진행)
      } else {
        // 2. 토큰 검증이 실패한 경우 401에러를 응답 한다.
        const err = new Error("decoded된 토큰정보가 없습니다.");
        logger.error(err.toString());
        res.status(401).json({ err: err.toString() });
      }
    } else {
      // 토큰이 없는 경우 401에러 응답
      const err = new Error("토큰정보가 없습니다.");
      logger.error(err.toString());

      res.status(401).json({ err: err.toString() });
    }
  },
};

module.exports = middleware;
