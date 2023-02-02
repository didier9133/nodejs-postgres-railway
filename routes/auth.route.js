const express = require('express');
const passport = require('passport');

const AuthService = require('../services/auth.service');

const router = express.Router();
const service = new AuthService();

router.post(
  '/',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const token = await service.signToken(user);
      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const message = await service.recoveryPassword(email);

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/change_password',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { newPassword, token } = req.body;
      const { sub } = req.user;
      console.log({ sub, newPassword, token });
      const response = await service.changePassword(token, newPassword, sub);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
