const router = require('express').Router();
const { NOT_FOUND } = require('../utils/constants');

router.patch('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Ресурс не найден' })
});


module.exports = router;