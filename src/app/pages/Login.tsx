import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Film, LogIn, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
        if (success) {
          toast.success('¡Bienvenido de nuevo!');
          navigate('/');
        } else {
          toast.error('Credenciales inválidas');
        }
      } else {
        success = await register(formData.name, formData.email, formData.password);
        if (success) {
          toast.success('¡Cuenta creada exitosamente!');
          navigate('/');
        } else {
          toast.error('Error al crear la cuenta');
        }
      }
    } catch (error) {
      toast.error('Ocurrió un error. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row"
      >
        {/* Left Side - Branding */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Film className="w-12 h-12" />
              <h1 className="text-3xl font-bold">CINEMAX</h1>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">
              {isLogin ? '¡Bienvenido de nuevo!' : 'Únete a CINEMAX'}
            </h2>
            
            <p className="text-purple-100 mb-6">
              {isLogin 
                ? 'Ingresa a tu cuenta para comprar entradas y disfrutar del mejor cine.'
                : 'Crea tu cuenta y comienza a disfrutar de una experiencia cinematográfica única.'}
            </p>

            <div className="space-y-3 text-sm text-purple-100">
              <div className="flex items-center gap-2">
                <span className="text-purple-300">✓</span>
                <span>Compra de entradas online</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-300">✓</span>
                <span>Selección de asientos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-300">✓</span>
                <span>Historial de compras</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 md:w-1/2">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? 'Ingresa tus credenciales para continuar' 
                : 'Completa el formulario para registrarte'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Juan Pérez"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Procesando...'
              ) : (
                <>
                  {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              {isLogin 
                ? '¿No tienes cuenta? Regístrate' 
                : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Esta es una versión de demostración. Puedes usar cualquier correo y contraseña.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
