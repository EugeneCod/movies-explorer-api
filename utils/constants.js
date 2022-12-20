const STATUS_CODES = {
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  AUTHORIZATION_REQUIRED: 'Необходима авторизация',
  INCORRECT_DATA: 'Переданы некорректные данные',
  INCORRECT_EMAIL: 'Некорректный формат почты',
  INCORRECT_URL: 'Некорректный адрес ресурса',
  INCORRECT_AUTHORIZATION_DATA: 'Неправильные почта или пароль',
  INCORRECT_ID: 'Введен некорректный id',
  MOVIE_BY_ID_NOT_FOUND: 'Фильм с указанным id не найден',
  USER_BY_ID_NOT_FOUND: 'Пользователь с указанным id не найден',
  DEFAULT_SERVER_ERROR: 'На сервере произошла ошибка',
  REJECT_MOVIE_DELETION: 'Отказ в удалении фильма, добавленного другим пользователем',
  CONFLICT_WITH_THE_USER_BASE: 'Пользователь с таким email уже зарегистрирован',
  INVALID_ADDRESS_OR_METHOD: 'Некорректный адрес или метод запроса',
};

const RESPONSE_MESSAGES = {
  AUTHORIZATION_WAS_SUCCESSFUL: 'Авторизация прошла успешно!',
  LOGGED_OUT_OF_THE_SYSTEM: 'Осуществлен выход из системы!',
};

const DEV_DATA = {
  MONGO_URL: 'mongodb://localhost:27017/moviesdb',
  PORT: 3001,
  SECRET_KEY: 'SECRET-KEY',
};

module.exports = {
  STATUS_CODES,
  ERROR_MESSAGES,
  RESPONSE_MESSAGES,
  DEV_DATA,
};
