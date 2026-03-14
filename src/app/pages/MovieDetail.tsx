import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { movies as mockMovies, showtimes as mockShowtimes, Movie, Showtime } from '../data/mockData';
import { Clock, ArrowLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { moviesApi } from '../services/api';

export const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedCinema, setSelectedMovie, setSelectedShowtime } = useBooking();
  const { user } = useAuth();
  const [movie, setMovie] = useState<Movie | undefined>(mockMovies.find(m => m.id === id));
  const [allShowtimes, setAllShowtimes] = useState<Showtime[]>(mockShowtimes.filter(s => s.movieId === id));
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [dateScrollIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    moviesApi.getById(id)
      .then((data) => setMovie({ ...data, id: data._id }))
      .catch(() => {});
    moviesApi.getShowtimes(id)
      .then((data) => {
        if (data.length > 0) {
          setAllShowtimes(data.map((s: any) => ({ ...s, id: s._id, movieId: s.movieId })));
        }
      })
      .catch(() => {});
  }, [id]);

  const cinemaShowtimes = useMemo(() => {
    if (!selectedCinema) return allShowtimes;
    const cinemaNameMap: Record<string, string> = {
      'san-carlos': 'San Carlos',
      'alajuela': 'Alajuela Plaza Real',
      'escazu': 'Multiplaza Escazú',
    };
    const cinemaRoom = cinemaNameMap[selectedCinema.id] || '';
    return allShowtimes.filter(s => s.room === cinemaRoom);
  }, [allShowtimes, selectedCinema]);

  const availableDates = useMemo(() => {
    const dateSet = new Set(cinemaShowtimes.map(s => s.date));
    return [...dateSet].sort();
  }, [cinemaShowtimes]);

  useEffect(() => {
    if (availableDates.length > 0 && (!selectedDate || !availableDates.includes(selectedDate))) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates, selectedDate]);

  const filteredShowtimes = cinemaShowtimes.filter(s => s.date === selectedDate);

  const groupedByType = filteredShowtimes.reduce((acc, showtime) => {
    const key = `CINEMAX ${showtime.format}, ${showtime.language}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-xl text-gray-500">Película no encontrada</p>
      </div>
    );
  }

  const handleShowtimeSelect = (showtime: Showtime) => {
    if (!user) {
      toast.error('Debes iniciar sesión para comprar entradas');
      navigate('/login');
      return;
    }
    setSelectedMovie(movie);
    setSelectedShowtime(showtime);
    navigate('/tickets');
  };

  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}:${String(m).padStart(2, '0')} horas`;
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Breadcrumb */}
      <div className="bg-black/50 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 text-sm">
          <button onClick={() => navigate('/')} className="text-gray-500 hover:text-white transition-colors">HOME</button>
          <span className="text-gray-700">&gt;</span>
          <span className="text-red-400 font-medium">DETALLE DE PELÍCULA</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/cartelera')}
          className="flex items-center gap-2 mb-6 text-gray-500 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a cartelera
        </button>

        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">DETALLE DE PELÍCULA</h1>
        <div className="h-1 bg-gradient-to-r from-red-600 to-amber-500 mb-8 rounded" />

        <h2 className="text-lg font-bold text-red-500 uppercase tracking-wider mb-6">Comprar Entradas</h2>

        {/* Movie Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-xl shadow-xl shadow-black/30 p-6 mb-8 flex flex-col sm:flex-row gap-6 border border-gray-800"
        >
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-40 h-56 object-cover rounded-lg shadow-lg shadow-black/50 shrink-0"
          />

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-4">{movie.title}</h3>
            <div className="space-y-2">
              <p>
                <span className="text-red-400 font-semibold">Censura: </span>
                <span className="text-gray-300">{movie.rating}</span>
              </p>
              <p>
                <span className="text-red-400 font-semibold">Duración: </span>
                <span className="text-gray-300">{formatDuration(movie.duration)}</span>
              </p>
              <p>
                <span className="text-red-400 font-semibold">Género: </span>
                <span className="text-gray-300">{movie.genre}</span>
              </p>
              {selectedCinema && (
                <p>
                  <span className="text-red-400 font-semibold">Cine: </span>
                  <span className="text-gray-300">{selectedCinema.location}</span>
                </p>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">{movie.synopsis}</p>
          </div>
        </motion.div>

        {/* Date Selector */}
        {movie.status !== 'coming-soon' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-300 mb-3">¿Qué día quieres ver la película?</h3>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-white font-medium text-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ef4444' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
              >
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date + 'T12:00:00').toLocaleDateString('es-CR', {
                      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                    }).toUpperCase()}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Showtimes */}
            <motion.div
              key={selectedDate}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {Object.keys(groupedByType).length === 0 ? (
                <div className="bg-gray-900 rounded-xl shadow-md p-8 text-center border border-gray-800">
                  <p className="text-gray-500">No hay funciones disponibles para esta fecha</p>
                </div>
              ) : (
                Object.entries(groupedByType).map(([type, times]) => (
                  <div key={type} className="bg-gray-900 rounded-xl shadow-xl shadow-black/20 overflow-hidden border border-gray-800">
                    <div className="bg-gradient-to-r from-red-700 to-red-600 text-white px-6 py-3">
                      <span className="font-bold text-sm uppercase tracking-wider">{type}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap gap-4">
                        {times.map((showtime) => (
                          <motion.button
                            key={showtime.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleShowtimeSelect(showtime)}
                            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group"
                          >
                            <Clock className="w-4 h-4 text-gray-600 group-hover:text-red-400" />
                            <span className="text-lg font-bold">{showtime.time} p.m.</span>
                            <span className="text-gray-600 text-sm">(Selecciona una tanda)</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </>
        )}

        {movie.status === 'coming-soon' && (
          <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6 text-center">
            <p className="text-amber-400 text-lg">
              Esta película aún no está disponible. Estreno: {new Date(movie.releaseDate).toLocaleDateString('es-ES')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
