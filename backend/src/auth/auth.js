import dotenv from 'dotenv';
import passport from 'passport';
import jwt from 'passport-jwt';
import { Strategy } from 'passport-local';
dotenv.config();
const { Strategy: JWTstrategy, ExtractJwt } = jwt;

import db from '../models/index.js';
const User = db.User;

passport.use(new JWTstrategy({
  secretOrKey: process.env.TOKEN_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
},
async (token, done) => {
  try {
    return done(null, token.user);
  } catch(error) { done(error); }
}
));

passport.use('signup', new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try {
      const createdUser = await User.create({ username, password });
      return done(null, createdUser);
    } catch(error) { done(error); }
  }
));

passport.use('login', new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({
        where: { username: username }
      });

      if(!user) {
        return done(null, false, { message: 'User not Found!' });
      }

      const validate = user.authenticate(password);

      if(!validate) {
        return done(null, false, { message: 'Wrong Password!' });
      }

      return done(null, user, { message: 'Logged in Successfully!' });
    } catch(error) { done(error); }
  }
));