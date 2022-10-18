const router = require('express').Router();

const {
  getUsers, getUserId, updateUserProfileByID, updateUserAvatarByID, getUsersMe,
} = require('../controllers/users');

const { celebrateUpdateUser, celebrateUserAvatarByID } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUsersMe);
router.patch('/me', celebrateUpdateUser, updateUserProfileByID);
router.patch('/me/avatar', celebrateUserAvatarByID, updateUserAvatarByID);
router.get('/:_id', getUserId);

module.exports = router;
