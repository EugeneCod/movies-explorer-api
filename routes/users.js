const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAuthorizedUser,
  updateUserInfo,
} = require('../controllers/users');

router.get('/me', getAuthorizedUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

module.exports = router;
