const { celebrate, Joi } = require('celebrate');
const { checkUrlValidity } = require('./utils');

module.exports = {
  createUser: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  login: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  updateUserInfo: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createMovie: celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(checkUrlValidity),
      trailerLink: Joi.string().required().custom(checkUrlValidity),
      thumbnail: Joi.string().required().custom(checkUrlValidity),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.number().required(),
    }),
  }),
  deleteMovie: celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
};
