import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  poster: string;
  genre: string;
  duration: number;
  rating: string;
  releaseDate: string;
  synopsis: string;
  status: 'now-showing' | 'pre-release' | 'coming-soon';
}

const movieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
  },
  poster: {
    type: String,
    required: [true, 'El poster es obligatorio'],
  },
  genre: {
    type: String,
    required: [true, 'El género es obligatorio'],
  },
  duration: {
    type: Number,
    required: [true, 'La duración es obligatoria'],
  },
  rating: {
    type: String,
    required: [true, 'La clasificación es obligatoria'],
  },
  releaseDate: {
    type: String,
    required: [true, 'La fecha de estreno es obligatoria'],
  },
  synopsis: {
    type: String,
    required: [true, 'La sinopsis es obligatoria'],
  },
  status: {
    type: String,
    enum: ['now-showing', 'pre-release', 'coming-soon'],
    default: 'coming-soon',
  },
});

export default mongoose.model<IMovie>('Movie', movieSchema);
