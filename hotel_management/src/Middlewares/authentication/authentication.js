// // ...
// const passport = require("passport");
// const JWTstrategy = require("passport-jwt").Strategy;
// const ExtractJWT = require("passport-jwt").ExtractJwt;

// const verifyToken = passport.use(
//   new JWTstrategy(
//     {
//       secretOrKey: "TOKEN_KEY",
//       jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
//     },
//     async (token, done) => {
//       try {
//         return done(null, token.user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// module.exports = verifyToken;
