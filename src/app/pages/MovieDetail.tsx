import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { movies as mockMovies, showtimes as mockShowtimes, Movie, Showtime } from '../data/mockData';
import { Clock, Calendar, Film as FilmIcon, ArrowLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { moviesApi } from '../services/api';

export const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedShowtime } = useBooking();
  const { user } = useAuth();
  const [movie, setMovie] = useState<Movie | undefined>(mockMovies.find(m => m.id === id));
  const [movieShowtimes, setMovieShowtimes] = useState<Showtime[]>(mockShowtimes.filter(s => s.movieId === id));

  useEffect(() => {
    if (!id) return;
    moviesApi.getById(id)
      .then((data) => setMovie({ ...data, id: data._id }))
      .catch(() => {});
    moviesApi.getShowtimes(id)
      .then((data) => {
        if (data.length > 0) {
          setMovieShowtimes(data.map((s: any) => ({ ...s, id: s._id, movieId: s.movieId })));
        }
      })
      .catch(() => {});
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Película no encontrada</p>
      </div>
    );
  }

  const handleShowtimeSelect = (showtime: typeof movieShowtimes[0]) => {
    if (!user) {
      toast.error('Debes iniciar sesión para comprar entradas');
      navigate('/login');
      return;
    }

    setSelectedShowtime(showtime);
    navigate('/seats');
  };

  const groupedByDate = movieShowtimes.reduce((acc, showtime) => {
    if (!acc[showtime.date]) {
      acc[showtime.date] = [];
    }
    acc[showtime.date].push(showtime);
    return acc;
  }, {} as Record<string, typeof movieShowtimes>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="w-full h-full object-cover opacity-40 blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <motion.img 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              src={movie.poster} 
              alt={movie.title}
              className="w-64 rounded-lg shadow-2xl"
            />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 text-white"
            >
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 mb-4 text-purple-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver a cartelera
              </button>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {movie.genre}
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{movie.duration} minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <FilmIcon className="w-5 h-5" />
                  <span>{movie.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(movie.releaseDate).toLocaleDateString('es-ES')}</span>
                </div>
              </div>

              <p className="text-gray-300 text-lg max-w-3xl">{movie.synopsis}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Showtimes Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">Horarios Disponibles</h2>

        {movie.status === 'coming-soon' ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-800 text-lg">
              Esta película aún no está disponible. Estreno: {new Date(movie.releaseDate).toLocaleDateString('es-ES')}
            </p>
          </div>
        ) : movie.status === 'pre-release' && movieShowtimes.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-800 text-lg">
              Pronto dispondremos de horarios para este preestreno
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedByDate).map(([date, times]) => (
              <div key={date} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  {new Date(date).toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {times.map((showtime) => (
                    <motion.button
                      key={showtime.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleShowtimeSelect(showtime)}
                      className="border-2 border-purple-200 hover:border-purple-600 rounded-lg p-4 text-left transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-purple-600 group-hover:text-purple-700">
                          {showtime.time}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          showtime.format === '3D' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {showtime.format}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="font-medium">{showtime.room}</p>
                        <p>{showtime.language}</p>
                        <p className="text-purple-600 font-semibold">${showtime.price} por entrada</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
