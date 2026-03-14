import { Link, useNavigate } from 'react-router';
import { Film, User, ShoppingBag, LogOut, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { motion } from 'motion/react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { selectedCinema } = useBooking();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white shadow-lg shadow-black/30 sticky top-0 z-50 border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/cartelera" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Film className="w-8 h-8 text-red-500" />
            <span className="text-xl font-extrabold tracking-wider">
              <span className="text-red-500">CINE</span>
              <span className="text-amber-400">MAX</span>
            </span>
            {selectedCinema && (
              <span className="hidden sm:flex items-center gap-1 text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full border border-red-500/30">
                <MapPin className="w-3 h-3" />
                {selectedCinema.name}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/cartelera"
              className="hidden sm:block text-gray-300 hover:text-amber-400 transition-colors font-medium"
            >
              Cartelera
            </Link>

            {user ? (
              <>
                <Link
                  to="/purchases"
                  className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="hidden sm:inline">Mis Compras</span>
                </Link>

                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2 text-gray-400">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user.name}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 px-4 py-2 rounded-lg transition-colors text-red-300 hover:text-white"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Salir</span>
                  </motion.button>
                </div>
              </>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-red-900/30"
                >
                  Iniciar Sesión
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
