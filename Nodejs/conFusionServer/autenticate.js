var passport = require("passport");
var loaclStrategy = require("passport-local").Strategy;
var User = require("./models/user");
var jwtStrategy = require("passport-jwt").Strategy;
var jwt = require("jsonwebtoken");
const config = require("./config");
var extractJwt = require("passport-jwt").ExtractJwt;

exports.local = passport.use(new loaclStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
  return jwt.sign(user, config["secret-key"], {
    expiresIn: 3600,
  });
};

var opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config["secret-key"];

exports.jwtPassport = passport.use(
  new jwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });
exports.verifyAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    var err = new Error("You are not authorized to perform this operation");
    err.status = 403;
    next(err);
  }
};
