const router = require('express').Router();

const {
  getCards, deleteCardById, likeCard, dislikeCard, createCard,
} = require('../controllers/cards');

const { celebrateCreateCard, celebrateDeleteAndLikesCard } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', celebrateCreateCard, createCard);
router.delete('/:id', celebrateDeleteAndLikesCard, deleteCardById);
router.put('/:id/likes', celebrateDeleteAndLikesCard, likeCard);
router.delete('/:id/likes', celebrateDeleteAndLikesCard, dislikeCard);

module.exports = router;
