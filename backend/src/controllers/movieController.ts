import { Request, Response } from 'express';
import Movie from '../models/Movie.js';
import Showtime from '../models/Showtime.js';
import Booking from '../models/Booking.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const movies = await Movie.find(filter);
    res.json(movies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404).json({ message: 'Película no encontrada' });
      return;
    }
    res.json(movie);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getShowtimesByMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const showtimes = await Showtime.find({ movieId: req.params.id });
    res.json(showtimes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { movieId, showtimeId, seats, snacks, total } = req.body;

    const booking = await Booking.create({
      userId: req.userId,
      movieId,
      showtimeId,
      seats,
      snacks: snacks || [],
      total,
    });

    const populated = await booking.populate(['movieId', 'showtimeId']);
    res.status(201).json(populated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find({ userId: req.userId })
      .populate('movieId')
      .populate('showtimeId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
