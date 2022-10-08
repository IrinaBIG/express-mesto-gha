const router = require('express').Router();
const NotFound = require('../errors/NotFound');

router.use('*', (req, res, next) => {
  next(new NotFound({ message: 'Ресурс не найден' }))
});


module.exports = router;