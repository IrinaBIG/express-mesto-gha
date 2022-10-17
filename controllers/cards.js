const Card = require('../models/card');
const {
  ERROR_CODE, INTERNAL_SERVER_ERROR, NOT_FOUND, FORBIDDEN,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.deleteCardById = (req, res) => {
  const owner = req.user._id;
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
      }
      const cardOwner = card.owner.toString();
      // console.log(cardOwner);
      // console.log(owner);
      if (cardOwner !== owner) {
        return res.status(FORBIDDEN).send({ message: 'Вы не можете удалить карточку другого пользователя' });
      }
      card.delete();
      return res.send({ message: `Карточка с ID '${req.params.id}' удалена` });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при удалении карточки.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки/снятии лайка. ' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки/снятии лайка. ' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
    });
};
