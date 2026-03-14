import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Film, MapPin, Ticket } from 'lucide-react';

export const Landing = () => {
  const navigate = useNavigate();

  const cinemas = [
    {
      id: 'san-carlos',
      name: 'SAN CARLOS',
      location: 'CINEMAX SAN CARLOS',
      color: 'from-blue-600 to-blue-500'
    },
    {
      id: 'alajuela',
      name: 'ALAJUELA',
      location: 'PLAZA REAL',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'escazu',
      name: 'ESCAZÚ',
      location: 'MULTIPLAZA ESCAZÚ',
      color: 'from-cyan-500 to-teal-500'
    }
  ];

  const handleCinemaSelect = () => {
    navigate('/cartelera');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1730791480843-12ef754c5123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMHdhdGNoaW5nJTIwbW92aWUlMjBjaW5lbWF8ZW58MXx8fHwxNzczNDU2MzIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Cinema"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              {/* Film reel icon */}
              <div className="w-16 h-16 rounded-full border-4 border-blue-400 flex items-center justify-center">
                <Film className="w-8 h-8 text-blue-400" />
              </div>
              <div className="absolute -right-1 -top-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="text-blue-400">CINE</span>
                <span className="text-green-500">MAX</span>
              </h1>
            </div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-white font-light"
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
              onClick={handleCinemaSelect}
              className="cursor-pointer group"
            >
              <div className={`bg-gradient-to-br ${cinema.color} rounded-lg p-8 shadow-2xl transform transition-all duration-300 relative overflow-hidden`}>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <Ticket className="w-12 h-12 text-white" />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
                    {cinema.name}
                  </h2>
                  
                  <div className="flex items-center justify-center gap-2 text-white/90">
                    <MapPin className="w-4 h-4" />
                    <p className="text-sm uppercase tracking-wider">
                      {cinema.location}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/30">
                    <p className="text-white/80 text-center text-sm group-hover:text-white transition-colors">
                      Click para ver cartelera
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 text-sm">
            Disfruta de la mejor experiencia cinematográfica
          </p>
        </motion.div>
      </div>
    </div>
  );
};
