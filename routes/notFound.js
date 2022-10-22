const router = require('express').Router();
const NotFoundErr = require('../errors/not-found-err');

router.use('*', () => {
  throw new NotFoundErr('Ресурс не найден');
});

module.exports = router;
