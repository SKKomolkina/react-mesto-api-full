const Card = require('../models/cardSchema');

const NotFoundError = require('../constants/NotFoundError');
const UnauthorizedError = require('../constants/UnauthorizedError');
const ValidationError = require('../constants/ValidationError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  const owner = req.user._id;

  Card.findByIdAndRemove(cardId)
    .then((data) => {
      if (!data) {
        next(new NotFoundError('Возникла ошибка: карта с указанным ID не найдена.'));
      }
      if (owner !== String(data.owner)) {
        next(new UnauthorizedError('Вы не можете удалить чужую карточку!'));
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Переданы некорректные данные');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Возникла ошибка: карта с указанным ID не найдена.'));
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Возникла ошибка: карта с указанным ID не найдена.');
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Возникла ошибка: карта с указанным ID не найдена.'));
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Возникла ошибка: карта с указанным ID не найдена.');
      }
    })
    .catch(next);
};
