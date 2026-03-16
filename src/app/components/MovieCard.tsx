import { Movie } from '../data/mockData';
import { Clock, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const statusLabels = {
    'now-showing': 'En Cartelera',
    'pre-release': 'Preestreno',
    'coming-soon': 'Próximamente',
  };

  const statusColors = {
    'now-showing': 'bg-red-600',
    'pre-release': 'bg-amber-500',
    'coming-soon': 'bg-gray-600',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer group relative overflow-hidden rounded-xl shadow-lg shadow-black/30 bg-gray-900 border border-gray-800"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className={`absolute top-3 right-3 ${statusColors[movie.status]} text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg`}>
          {statusLabels[movie.status]}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-3 text-white text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-red-400" />
              <span>{movie.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{movie.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate text-white">{movie.title}</h3>
        <p className="text-sm text-amber-400/80 font-medium">{movie.genre}</p>
      </div>
    </motion.div>
  );
};
