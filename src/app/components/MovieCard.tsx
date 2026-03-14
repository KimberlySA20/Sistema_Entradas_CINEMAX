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
    'coming-soon': 'Próximamente'
  };

  const statusColors = {
    'now-showing': 'bg-green-500',
    'pre-release': 'bg-blue-500',
    'coming-soon': 'bg-purple-500'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer group relative overflow-hidden rounded-lg shadow-lg bg-white"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Status Badge */}
        <div className={`absolute top-2 right-2 ${statusColors[movie.status]} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
          {statusLabels[movie.status]}
        </div>
        
        {/* Info overlay on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-3 text-white text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{movie.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{movie.rating}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.genre}</p>
      </div>
    </motion.div>
  );
};
