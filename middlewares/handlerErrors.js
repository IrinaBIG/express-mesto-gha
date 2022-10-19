const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message = 'На сервере произошла ошибка' } = err;
  if (isCelebrateError(err)) {
    res.status(statusCode).json(err);
  } else {
    res.status(statusCode).json({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  }
  next();
};
