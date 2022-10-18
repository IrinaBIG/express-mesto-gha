const router = require('express').Router();

const {
  getUsers, getUserId, updateUserProfileByID, updateUserAvatarByID, getUsersMe,
} = require('../controllers/users');
const { celebrateUpdateUser } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUsersMe);
router.patch('/me', celebrateUpdateUser, updateUserProfileByID);
router.patch('/me/avatar', updateUserAvatarByID);
router.get('/:_id', getUserId);

module.exports = router;
