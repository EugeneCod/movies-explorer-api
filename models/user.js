const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const UnauthorizedError = require('../errors/unauthorized');
const { ERROR_MESSAGES } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'IncorrectEmailFormat',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // запрет на отправку поля
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = (email, password) => mongoose.model('user', userSchema)
  .findOne({ email }).select('+password')
  .orFail(new UnauthorizedError(ERROR_MESSAGES.INCORRECT_AUTHORIZATION_DATA))
  .then((user) => bcrypt.compare(password, user.password)
    .then((matched) => {
      if (!matched) {
        throw new UnauthorizedError(ERROR_MESSAGES.INCORRECT_AUTHORIZATION_DATA);
      }
      return user;
    }));

module.exports = mongoose.model('user', userSchema);
