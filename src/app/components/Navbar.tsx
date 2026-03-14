import { Link, useNavigate } from 'react-router';
import { Film, User, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/cartelera" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Film className="w-8 h-8" />
            <span className="text-xl font-bold">CINEMAX</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              to="/cartelera" 
              className="hidden sm:block hover:text-purple-200 transition-colors"
            >
              Cartelera
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/purchases" 
                  className="flex items-center gap-2 hover:text-purple-200 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="hidden sm:inline">Mis Compras</span>
                </Link>
                
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
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
                  className="bg-white text-purple-900 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
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