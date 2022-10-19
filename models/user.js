const bcrypt = require('bcryptjs'); // импортируем bcrypt
const mongoose = require('mongoose');
const validateEmail = require('../validateEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Имя не может быть меньше 2 символов'],
    maxlength: [30, 'Имя не может быть больше 30 символов'],
    default: 'Жак-Ив Кусто',
  },

  about: {
    type: String,
    minlength: [2, 'Поле About не может быть меньше 2 символов'],
    maxlength: [30, 'Поле About не может быть больше 30 символов'],
    default: 'Исследователь',
  },

  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },

  email: {
    type: String,
    unique: [true, 'Пользователь с таким email уже существет'],
    required: [true, 'Поле обязательно к заполнению'],
    validate: {
      validator: validateEmail,
    },
    message: 'Поле должно содержать email',
  },

  password: {
    type: String,
    required: true,
    select: false, // необходимо добавить поле select. Так по умолчанию хеш пароля пользователя
    // не будет возвращаться из базы.
    // minlength: 8, - по чек-листу: не дб ограничений в длину, так как пароль хранится в виде хэша.
    // мб только с учетом соли можно задать. надо подумать. должно сработать.
  },

});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль12'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(new Error('Неправильные почта или пароль13'));
          }

          return user; // теперь user доступен
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);

// Email должен быть уникальным,
// поскольку пользователь проходит аутентификацию по
// электронной почте. Для этого мы добавляем свойство unique со
//  значением true. Так в базе не окажется несколько пользователей с одинаковой почтой.
