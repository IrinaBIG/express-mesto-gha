const router = require('express').Router();
const { ERROR_CODE } = require('../utils/constants');

router.patch('*', (req, res) => {
  res.status(ERROR_CODE).send({ message: 'Ресурс не найден' })
});


module.exports = router;