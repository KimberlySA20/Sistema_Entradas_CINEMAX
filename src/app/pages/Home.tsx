import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { movies as mockMovies, Movie } from '../data/mockData';
import { MovieCard } from '../components/MovieCard';
import { useBooking } from '../context/BookingContext';
import { motion } from 'motion/react';
import { moviesApi } from '../services/api';

export const Home = () => {
  const [activeTab, setActiveTab] = useState<'now-showing' | 'pre-release' | 'coming-soon'>('now-showing');
  const [moviesList, setMoviesList] = useState<Movie[]>(mockMovies);
  const navigate = useNavigate();
  const { selectedCinema, setSelectedMovie } = useBooking();

  useEffect(() => {
    moviesApi.getAll()
      .then((data) => {
        if (data.length > 0) {
          // Los datos vienen con _id, necesitamos mapear a id para compatibilidad
          const mapped = data.map((m: any) => ({ ...m, id: m._id || m.id }));
          setMoviesList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const filteredMovies = moviesList.filter(movie => movie.status === activeTab);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    navigate(`/movie/${movie.id}`);
  };

  const tabs = [
    { id: 'now-showing', label: 'En Cartelera' },
    { id: 'pre-release', label: 'Preestrenos' },
    { id: 'coming-soon', label: 'Próximos Estrenos' },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <div className="relative h-[250px] bg-gradient-to-r from-gray-950 via-red-950 to-gray-950 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1640127249308-098702574176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzczMzY4ODA5fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Cinema"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
              Cartelera {selectedCinema ? `- ${selectedCinema.name}` : ''}
            </h1>
            <p className="text-lg md:text-xl text-amber-400/80 font-medium">
              {selectedCinema ? selectedCinema.location : 'Descubre las mejores películas'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-gray-800 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-6 py-3 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-red-500'
                  : 'text-gray-500 hover:text-amber-400'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-amber-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => handleMovieClick(movie)}
            />
          ))}
        </motion.div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay películas disponibles en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
};
