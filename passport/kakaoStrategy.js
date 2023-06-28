const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/userInfo');

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
          console.log('kakao 5436543765767657', profile);
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: 'kakao' },
          });
          if (exUser) {
            console.log(
              'kakao profildsadsadasdasd12321321321321sadsae',
              profile
            );
            return done(null, exUser);
          } else {
            console.log('kakao profildsadsadasdasdsadsae', profile);
            const newUser = await User.create({
              id: profile._json?.kakao_account?.email,
              nickname: profile.displayName,
              snsId: profile.id,
              provider: 'kakao',
            });
            return done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
