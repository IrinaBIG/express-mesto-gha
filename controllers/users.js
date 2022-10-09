const User = require('../models/user');
// const ValidationError = require('../errors/ValidationError');
// const NotFound = require('../errors/NotFound');
const { ERROR_CODE, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка: пользователи не найдены' }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if ((err.name === 'CastError')) {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при получении пользователя.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else { // здесь тоже поправила, хоть и не отмечено было..
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

module.exports.updateUserProfileByID = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
      } else { // здесь тоже поправила, хоть и не отмечено было..
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении пользователя.' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateUserAvatarByID = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
      } else { // здесь тоже поправила, хоть и не отмечено было..
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
    });
};
