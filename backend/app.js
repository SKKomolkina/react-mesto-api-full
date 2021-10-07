require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const validator = require('validator');
const {
  errors,
  celebrate,
  Joi,
} = require('celebrate');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const {
  login,
  createUser,
} = require('./controllers/users');

const NotFoundError = require('./constants/NotFoundError');

const validateEmail = (value) => {
  const result = validator.isEmail(value);
  if (result) {
    return value;
  }
  throw new Error('Введена некорректная почта.');
};

const validateUrl = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('Введена некорректная ссылка.');
};

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

// http://localhost:3000/signin
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }),
}), login);

// http://localhost:3000/signup
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
  }),
}), createUser);

app.use(auth);

// http://localhost:3000/users
app.use('/', userRouter);

// http://localhost:3000/cards
app.use('/', cardRouter);

app.use(errorLogger);

app.use('*', () => {
  throw new NotFoundError('Страница не найдена!');
});
app.use(errors());
app.use(error);

// http://localhost:3000
app.listen(PORT);
