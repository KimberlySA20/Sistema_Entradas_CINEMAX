import mongoose, { Schema, Document } from 'mongoose';

export interface IShowtime extends Document {
  movieId: mongoose.Types.ObjectId;
  date: string;
  time: string;
  room: string;
  language: string;
  format: '2D' | '3D';
  price: number;
}

const showtimeSchema = new Schema<IShowtime>({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'La película es obligatoria'],
  },
  date: {
    type: String,
    required: [true, 'La fecha es obligatoria'],
  },
  time: {
    type: String,
    required: [true, 'La hora es obligatoria'],
  },
  room: {
    type: String,
    required: [true, 'La sala es obligatoria'],
  },
  language: {
    type: String,
    required: [true, 'El idioma es obligatorio'],
  },
  format: {
    type: String,
    enum: ['2D', '3D'],
    default: '2D',
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
  },
});

export default mongoose.model<IShowtime>('Showtime', showtimeSchema);
