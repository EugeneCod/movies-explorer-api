const router = require('express').Router();
const celebrate = require('../utils/celebrate');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate.createMovie, createMovie);
router.delete('/:_id', celebrate.deleteMovie, deleteMovieById);

module.exports = router;
