import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  movieId: mongoose.Types.ObjectId;
  showtimeId: mongoose.Types.ObjectId;
  seats: string[];
  snacks: { snackName: string; quantity: number; price: number }[];
  total: number;
  createdAt: Date;
}

const bookingSchema = new Schema<IBooking>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio'],
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'La película es obligatoria'],
  },
  showtimeId: {
    type: Schema.Types.ObjectId,
    ref: 'Showtime',
    required: [true, 'La función es obligatoria'],
  },
  seats: {
    type: [String],
    required: [true, 'Los asientos son obligatorios'],
  },
  snacks: [{
    snackName: String,
    quantity: Number,
    price: Number,
  }],
  total: {
    type: Number,
    required: [true, 'El total es obligatorio'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IBooking>('Booking', bookingSchema);
