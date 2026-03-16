import { Router } from 'express';
import { getMovies, getMovieById, getShowtimesByMovie, createBooking, getUserBookings } from '../controllers/movieController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.get('/:id/showtimes', getShowtimesByMovie);
router.post('/bookings', authMiddleware, createBooking);
router.get('/bookings/me', authMiddleware, getUserBookings);

export default router;
