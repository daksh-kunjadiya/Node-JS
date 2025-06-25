import express from 'express';
import { createMovie, getMovies, updateMovie, deleteMovie } from '../controller/movie.controller.js';

const router = express.Router();

router.route('/')
    .post(createMovie)
    .get(getMovies);

router.route('/:id')
    .put(updateMovie)
    .delete(deleteMovie);

export default router;
