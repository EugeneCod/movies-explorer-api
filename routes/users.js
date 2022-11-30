const router = require('express').Router();
const celebrate = require('../utils/celebrate');

const {
  getAuthorizedUser,
  updateUserInfo,
} = require('../controllers/users');

router.get('/me', getAuthorizedUser);
router.patch('/me', celebrate.updateUserInfo, updateUserInfo);

module.exports = router;
