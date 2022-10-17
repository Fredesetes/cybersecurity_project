import passport from 'passport';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  try {
    return res.json({
      message: 'Signup Successful!',
      user: req.user
    });
  } catch(error) { next(error); }
}

export const login = async (req, res, next) => {
  passport.authenticate('login',
    async (err, user, info) => {
      try {
        if(err || !user) {
          const error = new Error('An error Occurred!');
          return next(error);
        }

        req.login(user, { session: false }, async (error) => {
          if(error) return next(error);

          const body = { username: user.username };
          const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);

          return res.json({ user: user.username, token });
        });
      } catch(error) { next(error); }
    }
  )(req, res, next);
}