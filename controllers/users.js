const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  STATUS_CODES,
  ERROR_MESSAGES,
  RESPONSE_MESSAGES,
  DEV_DATA,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require('../errors/not-found');
const ConflictError = require('../errors/conflict');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 7)
    .then((hash) => User.create({
      ...req.body,
      password: hash,
    }))
    .then((user) => {
      const modifiedUser = {
        _id: user._id,
        email: user.email,
        name: user.name,
      };
      res.status(STATUS_CODES.CREATED).send(modifiedUser);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.CONFLICT_WITH_THE_USER_BASE));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_DATA.SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: NODE_ENV === 'production' ? 'lax' : 'none',
        secure: NODE_ENV === 'production',
      })
        .send({ message: RESPONSE_MESSAGES.AUTHORIZATION_WAS_SUCCESSFUL });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt').send({ message: RESPONSE_MESSAGES.LOGGED_OUT_OF_THE_SYSTEM })
    .catch(next);
};

module.exports.getAuthorizedUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(ERROR_MESSAGES.USER_BY_ID_NOT_FOUND))
    .then(({ email, name }) => res.send({ email, name }))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new NotFoundError(ERROR_MESSAGES.USER_BY_ID_NOT_FOUND))
    .then((updatedUser) => res.send(
      { email: updatedUser.email, name: updatedUser.name },
    ))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.CONFLICT_WITH_THE_USER_BASE));
      }
      return next(err);
    });
};
