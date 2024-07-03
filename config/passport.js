const { Strategy, ExtractJwt } = require('passport-jwt');
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
};

module.exports = passport => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      const user = { id: jwt_payload.sub, name: jwt_payload.name };
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );
};
