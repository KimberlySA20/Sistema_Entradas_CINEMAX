import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Ticket, ShoppingBag, Film } from 'lucide-react';

export const Purchases = () => {
  const { user, purchases } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mis Compras</h1>
          <p className="text-gray-600">Historial de tus entradas y reservas</p>
        </div>

        {purchases.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-lg p-12 text-center"
          >
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">No tienes compras aún</h2>
            <p className="text-gray-500 mb-6">
              Explora nuestra cartelera y compra tus primeras entradas
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              <Film className="w-5 h-5" />
              Ver Cartelera
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase, index) => (
              <motion.div
                key={purchase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-6 md:w-1/3 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="text-purple-200 text-sm">Compra #{purchase.id}</span>
                      <h3 className="text-2xl font-bold mt-1">{purchase.movieTitle}</h3>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-purple-100 text-sm mb-1">Total pagado</p>
                      <p className="text-3xl font-bold">${purchase.total}</p>
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Fecha de función</p>
                          <p className="font-semibold">
                            {new Date(purchase.date).toLocaleDateString('es-ES', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long'
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Horario</p>
                          <p className="font-semibold">{purchase.time}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Sala</p>
                          <p className="font-semibold">{purchase.room}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Ticket className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Asientos</p>
                          <p className="font-semibold">{purchase.seats.join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        Comprado el {new Date(purchase.purchaseDate).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-sm">
                        Ver Código QR
                      </button>
                      <button className="px-4 py-2 border border-gray-300 hover:border-purple-600 text-gray-700 rounded-lg font-medium transition-colors text-sm">
                        Descargar PDF
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
