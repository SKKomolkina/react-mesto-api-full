const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateUrl = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('Введена некорректная ссылка.');
};

const {
  getUsers, getUserById, updateUser, updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

// http://localhost:3000/users
router.get('/users', getUsers);

// http://localhost:3000/users/:userId
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

// http://localhost:3000/users/me
router.get('/users/me', getCurrentUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateUser);

// http://localhost:3000/users/me/avatar
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }).unknown(true),
}), updateAvatar);

module.exports = router;
