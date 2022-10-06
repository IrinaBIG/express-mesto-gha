const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const { ERROR_CODE, INTERNAL_SERVER_ERROR } = require('../utils/constants')

module.exports.getUser = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка: пользователи не найдены' }));

};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Пользователь не найден' }))
};

// module.exports.getUserId = (req, res) => {
//   User.findById(req.params.id)
//     .then((user) => {
//       if(!user) {
//         return res.status(404).send( {message: '----'} )
//       }
//       return res.status(200).send(user);
//     })
//     .catch(() => {
//      res.status(500).send({ message: 'Пользователь не найден' })
//       })
// };

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' } )
      }
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка: не удалось создать нового пользователя' });
    });
  }

  
// module.exports.createUser = (req, res) => {
//   const { name, about, avatar } = req.body;
//   User.create({ name, about, avatar })
//     .then(user => res.send({ data: user }))
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка: не удалось создать нового пользователя' }));
// };

module.exports.updateUserProfileByID = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { name: req.user._id })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка111' }));
};


module.exports.updateUserAvatarByID = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { avatar: req.user._id })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка111' }));
};