const Movie = require('../models/movie');
const { STATUS_CODES, ERROR_MESSAGES } = require('../utils/constants');

const NotFoundError = require('../errors/not-found');
const ForbiddenError = require('../errors/forbidden');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  // const
  //   {
  //     country,
  //     director,
  //     duration,
  //     year,
  //     description,
  //     image,
  //     trailerLink,
  //     nameRU,
  //     nameEN,
  //     thumbnail,
  //     movieId
  //   } = req.body;

  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(STATUS_CODES.CREATED).send(movie))
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(ERROR_MESSAGES.MOVIE_BY_ID_NOT_FOUND))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(ERROR_MESSAGES.REJECT_MOVIE_DELETION);
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then((removedMovie) => res.send(removedMovie));
    })
    .catch(next);
};
