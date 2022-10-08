const Card = require('../models/card');
const { ERROR_CODE, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../utils/constants')

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' }));
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner: owner })
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки.' })
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
    });
}

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' })
      }
      res.send({ data: card });
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' }));
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
  .then((card) => {
    if (!card) {
      res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' })
    }
    res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки/снятии лайка. ' })
    }
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
  });
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
  .then((card) => {
    if (!card) {
      res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' })
    }
    res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки/снятии лайка. ' })
    }
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
  });
}