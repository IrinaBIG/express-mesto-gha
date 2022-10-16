const router = require('express').Router();
const {
  getUsers, getUserId, updateUserProfileByID, updateUserAvatarByID, getUsersMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUsersMe);
// router.post('/', createUser);
router.patch('/me', updateUserProfileByID);
router.patch('/me/avatar', updateUserAvatarByID);
router.get('/:_id', getUserId);

module.exports = router;
