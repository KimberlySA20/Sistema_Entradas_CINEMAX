import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Film, MapPin, Ticket } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const Landing = () => {
  const navigate = useNavigate();
  const { setSelectedCinema } = useBooking();

  const cinemas = [
    {
      id: 'san-carlos',
      name: 'SAN CARLOS',
      location: 'CINEMAX SAN CARLOS',
      color: 'from-red-700 to-red-500',
    },
    {
      id: 'alajuela',
      name: 'ALAJUELA',
      location: 'PLAZA REAL',
      color: 'from-amber-700 to-amber-500',
    },
    {
      id: 'escazu',
      name: 'ESCAZÚ',
      location: 'MULTIPLAZA ESCAZÚ',
      color: 'from-red-600 to-amber-600',
    },
  ];

  const handleCinemaSelect = (cinema: typeof cinemas[0]) => {
    setSelectedCinema({ id: cinema.id, name: cinema.name, location: cinema.location });
    navigate('/cartelera');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1730791480843-12ef754c5123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMHdhdGNoaW5nJTIwbW92aWUlMjBjaW5lbWF8ZW58MXx8fHwxNzczNDU2MzIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Cinema"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-red-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                <Film className="w-10 h-10 text-red-500" />
              </div>
              <div className="absolute -right-1 -top-1 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-400/40">
                <div className="w-3.5 h-3.5 bg-amber-300 rounded-full" />
              </div>
            </div>
            <div>
              <h1 className="text-6xl md:text-7xl font-black tracking-tight">
                <span className="text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.4)]">CINE</span>
                <span className="text-amber-400 drop-shadow-[0_0_25px_rgba(251,191,36,0.4)]">MAX</span>
              </h1>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 font-light tracking-wide"
          >
            Selecciona tu Sala de Cine Favorita
          </motion.p>
        </motion.div>

        {/* Cinema Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {cinemas.map((cinema, index) => (
            <motion.div
              key={cinema.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCinemaSelect(cinema)}
              className="cursor-pointer group"
            >
              <div className={`bg-gradient-to-br ${cinema.color} rounded-2xl p-8 shadow-2xl shadow-black/50 transition-all duration-300 relative overflow-hidden border border-white/10`}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-black/10 rounded-full -ml-14 -mb-14 group-hover:scale-150 transition-transform duration-700" />

                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-5">
                    <div className="bg-white/15 p-3 rounded-xl backdrop-blur-sm">
                      <Ticket className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-2 tracking-wide">
                    {cinema.name}
                  </h2>

                  <div className="flex items-center justify-center gap-2 text-white/80">
                    <MapPin className="w-4 h-4" />
                    <p className="text-sm uppercase tracking-widest font-medium">
                      {cinema.location}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/20">
                    <p className="text-white/70 text-center text-sm group-hover:text-white transition-colors font-medium tracking-wide">
                      Click para ver cartelera
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm tracking-widest uppercase">
            La mejor experiencia cinematográfica
          </p>
        </motion.div>
      </div>
    </div>
  );
};
