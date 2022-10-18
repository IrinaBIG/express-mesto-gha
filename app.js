const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { celebrateSignUp, celebrateSignIn } = require('./middlewares/validation');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://localhost:27017/mestodb');

// app.use((req, res, next) => {
//   req.user = {
//   eslint-disable-next-line max-len, max-len, max-len
//     id: '6340ebdba9c35444f58ef354', // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };
//   next();
// });

app.post('/signin', celebrateSignUp, login);
app.post('/signup', celebrateSignIn, createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('*', require('./routes/notFound'));

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
