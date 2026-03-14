import { useNavigate } from 'react-router';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, CheckCircle, Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { bookingsApi } from '../services/api';

export const Checkout = () => {
  const navigate = useNavigate();
  const { 
    selectedMovie, 
    selectedShowtime, 
    selectedSeats,
    selectedSnacks, 
    getTotalPrice,
    clearBooking
  } = useBooking();
  const { addPurchase } = useAuth();

  if (!selectedMovie || !selectedShowtime || selectedSeats.length === 0) {
    navigate('/');
    return null;
  }

  const handleConfirmPurchase = async () => {
    toast.loading('Procesando pago...');

    try {
      await bookingsApi.create({
        movieId: selectedMovie.id,
        showtimeId: selectedShowtime.id,
        seats: selectedSeats,
        snacks: selectedSnacks.map(({ snack, quantity }) => ({
          snackName: snack.name,
          quantity,
          price: snack.price,
        })),
        total: getTotalPrice(),
      });
    } catch {
      // Fallback: guarda localmente si el backend no responde
    }

    toast.dismiss();

    addPurchase({
      movieTitle: selectedMovie.title,
      date: selectedShowtime.date,
      time: selectedShowtime.time,
      room: selectedShowtime.room,
      seats: selectedSeats,
      total: getTotalPrice(),
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    toast.success('¡Compra realizada con éxito!');
    clearBooking();
    navigate('/confirmation');
  };

  const ticketsPrice = selectedShowtime.price * selectedSeats.length;
  const snacksPrice = selectedSnacks.reduce((total, { snack, quantity }) => {
    return total + (snack.price * quantity);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-purple-600 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              Confirmar Compra
            </h1>
            <p className="mt-2 text-purple-100">Revisa los detalles de tu compra antes de confirmar</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Movie Info */}
            <div className="flex gap-6">
              <img 
                src={selectedMovie.poster} 
                alt={selectedMovie.title}
                className="w-32 h-48 object-cover rounded-lg shadow-lg"
              />
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">{selectedMovie.title}</h2>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span>{new Date(selectedShowtime.date).toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span>{selectedShowtime.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <span>{selectedShowtime.room} - {selectedShowtime.language} - {selectedShowtime.format}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700">
                    <Ticket className="w-5 h-5 text-purple-600" />
                    <span>Asientos: {selectedSeats.sort().join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-b border-gray-200 py-6 space-y-3">
              <h3 className="font-semibold text-lg mb-4">Detalle de Compra</h3>
              
              <div className="flex justify-between text-gray-700">
                <span>{selectedSeats.length} {selectedSeats.length === 1 ? 'Entrada' : 'Entradas'} × ${selectedShowtime.price}</span>
                <span className="font-semibold">${ticketsPrice}</span>
              </div>

              {selectedSnacks.length > 0 && (
                <>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="font-medium text-gray-700 mb-2">Snacks</p>
                    {selectedSnacks.map(({ snack, quantity }) => (
                      <div key={snack.id} className="flex justify-between text-gray-600 text-sm mb-1">
                        <span>{quantity}x {snack.name}</span>
                        <span>${snack.price * quantity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal Snacks</span>
                    <span className="font-semibold">${snacksPrice}</span>
                  </div>
                </>
              )}

              <div className="flex justify-between text-xl font-bold text-purple-600 pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>${getTotalPrice()}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                Método de Pago
              </h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Nota:</strong> Esta es una versión de demostración. No se procesarán pagos reales.
                </p>
              </div>
            </div>

            {/* Terms */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                Al confirmar tu compra, aceptas nuestros términos y condiciones. 
                Recibirás un correo electrónico con los detalles de tu reserva y el código QR para ingresar al cine.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(-1)}
                className="flex-1 border-2 border-gray-300 hover:border-purple-600 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
              >
                Modificar Compra
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirmPurchase}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Confirmar y Pagar ${getTotalPrice()}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
