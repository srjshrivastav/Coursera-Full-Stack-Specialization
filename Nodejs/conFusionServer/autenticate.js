var passport = require("passport");
var loaclStrategy = require("passport-local").Strategy;
var User = require("./models/user");

exports.local = passport.use(new loaclStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
