const { celebrate, Joi } = require('celebrate');

// const regexUrl = /^https?:\/\/[\w-.]*[^\W]*(\.ru)$|^https?:\/\/[\w-.]*[^\W]*(\.ru\/)$
// |^https?:\/\/[\w-.]*[^\W]*(\.ru\/)
// [\w-.]*|[\W]*[^А-Яа-я]+/; // проверка link:/link~!bad
const regexUrl = /^https?:\/\/(\w*|-(\.)|\w*\.ru|\w*[-._~:/]|[?#[]@!$&'()]|[*+,;=]#$)/;
// const regexUrl = /^https?:\/\/[\w-.]*[\W]*(\.ru|\.com)$|^https?:\/\/[\w-.]*[\W]*(\.ru|\.com)+(\/[\w]*|[+-_~:/?#[].@!$&'()*,;=])*$/;

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
