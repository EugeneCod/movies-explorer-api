const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const checkAuth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found');
const { ERROR_MESSAGES } = require('../utils/constants');
const celebrate = require('../utils/celebrate');

router.post('/signup', celebrate.createUser, createUser);
router.post('/signin', celebrate.login, login);

router.use(checkAuth);
router.get('/signout', logout);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => {
  next(new NotFoundError(ERROR_MESSAGES.INVALID_ADDRESS_OR_METHOD));
});

module.exports = router;
