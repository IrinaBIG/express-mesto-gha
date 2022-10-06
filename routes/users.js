const router = require('express').Router();

const { getUser, getUserId, createUser, updateUserProfileByID, updateUserAvatarByID } = require('../controllers/users');

router.get('/', getUser);
router.get('/:id', getUserId);
router.post('/', createUser);
router.patch('/me', updateUserProfileByID);
router.patch('/me/avatar', updateUserAvatarByID);

module.exports = router;