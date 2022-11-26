const express = require('express');
const mongoose = require('mongoose');
const console = require('console');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();

const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/CORS');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { ERROR_MESSAGES } = require('./utils/constants');
const NotFoundError = require('./errors/not-found');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const app = express();
app.use(cors);

app.use(cookieParser());
app.use(express.json());

mongoose.connect(MONGO_URL);

app.use(requestLogger); // логгер запросов

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use('/', require('./routes/auth'));

app.use(auth); // авторизация

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use('*', (req, res, next) => {
  next(new NotFoundError(ERROR_MESSAGES.INVALID_ADDRESS_OR_METHOD));
});

app.use(errorLogger); // логгер ошибок

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
