const passport = require('passport');

const localStartegy = require('./strategies/local.strategy');
const jwtStrategy = require('./strategies/jwt.strategy');

passport.use(localStartegy);
passport.use(jwtStrategy);
