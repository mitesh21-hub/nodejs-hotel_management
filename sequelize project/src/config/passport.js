const passport = require('passport');
const Models = require('../models');
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_KEY,
    },
    function (jwtPayload, done) {
      return Models.Users.findOne({ where: { id: jwtPayload.user_id },attributes: { exclude: ['user_password'] } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
