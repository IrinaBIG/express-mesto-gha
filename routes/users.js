const router = require('express').Router();
const { getUsers, getUserId, createUser, updateUserProfileByID, updateUserAvatarByID } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserId);
router.post('/', createUser);
router.patch('/me', updateUserProfileByID);
router.patch('/me/avatar', updateUserAvatarByID);

module.exports = router;