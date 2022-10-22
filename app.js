const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { celebrateSignUp, celebrateSignIn } = require('./middlewares/validation');
const handlerErrors = require('./middlewares/handlerErrors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signup', celebrateSignUp, createUser);
app.post('/signin', celebrateSignIn, login);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('*', require('./routes/notFound'));

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(handlerErrors); // централизованнный обработчик

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
