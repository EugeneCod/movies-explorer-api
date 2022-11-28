const express = require('express');
const mongoose = require('mongoose');
const console = require('console');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
require('dotenv').config();

const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimit = require('./middlewares/rate-limit');
const cors = require('./middlewares/CORS');
const errorHandler = require('./middlewares/error-handler');
const router = require('./routes');
const { DEV_MONGO_URL, DEV_PORT } = require('./utils/constants');

const {
  PORT = DEV_PORT,
  MONGO_URL = DEV_MONGO_URL,
} = process.env;

const app = express();
app.use(cors);
mongoose.connect(MONGO_URL);
app.use(requestLogger);
app.use(rateLimit);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
