import { Router } from 'express';
import passport from 'passport';
import {
  signup, login
} from '../../controllers/user.controller.js';

const router = Router();

// [POST] Route
router.post('/signup', [
  passport.authenticate('jwt', { session: false }),
  passport.authenticate('signup', { session: false })],
signup);
router.post('/login', login);

export default router;