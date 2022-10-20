const { celebrate, Joi } = require('celebrate');

// const regexUrl = /\bhttps?:\/\/([a-zA-Z0-9]{1,}-]+.]|[$-_@.&+!*,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/;
// const regexUrl = /https?:\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
// const regexUrl = /\bhttps?:\/\/(?:[a-zA-Z0-9]|[$-_@.&+]|[!*,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/;
// const regexUrl = /http[s]?:\/\/(?:[0-9]|[a-zA-Z]|[$-_@.&+]|[!*,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/;
const regexUrl = /^(https?):\/\/(\w+|\W+)+(\.)|(\w+|\W+)\.ru#$/;

module.exports.celebrateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.celebrateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.celebrateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.celebrateUserAvatarByID = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexUrl),
  }),
});

module.exports.celebrateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(regexUrl),
  }),
});

module.exports.celebrateDeleteAndLikesCard = celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24), // длина id = 24
  }),
});
