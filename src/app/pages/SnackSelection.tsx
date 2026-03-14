import { useNavigate } from 'react-router';
import { useBooking } from '../context/BookingContext';
import { snacks } from '../data/mockData';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

export const SnackSelection = () => {
  const navigate = useNavigate();
  const { 
    selectedMovie, 
    selectedShowtime, 
    selectedSeats,
    selectedSnacks, 
    addSnack, 
    updateSnackQuantity,
    removeSnack,
    getTotalPrice
  } = useBooking();

  if (!selectedMovie || !selectedShowtime || selectedSeats.length === 0) {
    navigate('/');
    return null;
  }

  const handleContinue = () => {
    navigate('/checkout');
  };

  const handleSkip = () => {
    navigate('/checkout');
  };

  const categories = {
    popcorn: 'Pochoclos',
    drinks: 'Bebidas',
    candy: 'Golosinas',
    combos: 'Combos'
  };

  const groupedSnacks = snacks.reduce((acc, snack) => {
    if (!acc[snack.category]) {
      acc[snack.category] = [];
    }
    acc[snack.category].push(snack);
    return acc;
  }, {} as Record<string, typeof snacks>);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-purple-600 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Snacks Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold mb-2">Añade Snacks</h1>
              <p className="text-gray-600 mb-6">Mejora tu experiencia con nuestros snacks</p>

              <div className="space-y-8">
                {Object.entries(groupedSnacks).map(([category, categorySnacks]) => (
                  <div key={category}>
                    <h2 className="text-xl font-semibold mb-4">{categories[category as keyof typeof categories]}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {categorySnacks.map((snack) => {
                        const selectedSnack = selectedSnacks.find(s => s.snack.id === snack.id);
                        const quantity = selectedSnack?.quantity || 0;

                        return (
                          <motion.div
                            key={snack.id}
                            whileHover={{ scale: 1.02 }}
                            className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-purple-300 transition-colors"
                          >
                            <div className="aspect-video bg-gray-100 overflow-hidden">
                              <img 
                                src={snack.image} 
                                alt={snack.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="p-4">
                              <h3 className="font-semibold text-lg mb-1">{snack.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">{snack.description}</p>
                              <p className="text-lg font-bold text-purple-600 mb-3">${snack.price}</p>

                              {quantity === 0 ? (
                                <motion.button
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => addSnack(snack)}
                                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                                >
                                  <Plus className="w-4 h-4" />
                                  Agregar
                                </motion.button>
                              ) : (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => updateSnackQuantity(snack.id, quantity - 1)}
                                      className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </motion.button>
                                    
                                    <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                                    
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => updateSnackQuantity(snack.id, quantity + 1)}
                                      className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </motion.button>
                                  </div>

                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => removeSnack(snack.id)}
                                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </motion.button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Resumen
              </h2>

              <div className="space-y-4 mb-6">
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">{selectedMovie.title}</p>
                  <p className="text-sm text-gray-600">
                    {selectedShowtime.time} - {selectedShowtime.room}
                  </p>
                  <p className="text-sm text-gray-600">
                    Asientos: {selectedSeats.join(', ')}
                  </p>
                  <p className="font-semibold mt-2">
                    Entradas: ${selectedShowtime.price * selectedSeats.length}
                  </p>
                </div>

                {selectedSnacks.length > 0 && (
                  <div className="pb-4 border-b border-gray-200">
                    <p className="font-semibold mb-2">Snacks</p>
                    {selectedSnacks.map(({ snack, quantity }) => (
                      <div key={snack.id} className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{quantity}x {snack.name}</span>
                        <span className="font-medium">${snack.price * quantity}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold text-purple-600">${getTotalPrice()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContinue}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Ir al Pago
                </motion.button>

                {selectedSnacks.length === 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSkip}
                    className="w-full border-2 border-gray-300 hover:border-purple-600 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Saltar este paso
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
