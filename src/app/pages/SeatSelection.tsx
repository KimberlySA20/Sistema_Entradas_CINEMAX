import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useBooking } from '../context/BookingContext';
import { generateSeats } from '../data/mockData';
import { motion } from 'motion/react';
import { ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import { formatColones } from '../utils/format';

export const SeatSelection = () => {
  const navigate = useNavigate();
  const { selectedMovie, selectedShowtime, selectedSeats, setSelectedSeats, getTotalTickets, getTotalPrice } = useBooking();
  const maxSeats = getTotalTickets();
  const [seats] = useState(() => generateSeats(10, 12));

  if (!selectedMovie || !selectedShowtime) {
    navigate('/');
    return null;
  }

  const toggleSeat = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat?.status === 'occupied') {
      toast.error('Este asiento ya está ocupado');
      return;
    }

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length >= maxSeats) {
        toast.error(`Ya seleccionaste tus ${maxSeats} asientos`);
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      toast.error('Debes seleccionar al menos un asiento');
      return;
    }
    navigate('/snacks');
  };

  const getSeatStatus = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat?.status === 'occupied') return 'occupied';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-gray-400 cursor-not-allowed';
      case 'selected':
        return 'bg-red-600 hover:bg-red-700 cursor-pointer border-2 border-red-400';
      default:
        return 'bg-green-500 hover:bg-green-600 cursor-pointer';
    }
  };

  const rows = [...new Set(seats.map(s => s.row))];

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-red-400 hover:text-red-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <div className="bg-gray-900 rounded-lg shadow-lg p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Selecciona tus Asientos</h1>
            <p className="text-gray-400">
              {selectedMovie.title} - {selectedShowtime.time} - {selectedShowtime.room}
            </p>
          </div>

          {/* Legend */}
            <div className="flex flex-wrap gap-6 mb-8 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-green-500" />
              <span className="text-sm text-gray-300">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-600 border-2 border-red-400" />
              <span className="text-sm text-gray-300">Seleccionado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gray-400" />
              <span className="text-sm text-gray-300">Ocupado</span>
            </div>
          </div>

          {/* Screen */}
          <div className="mb-12">
            <div className="bg-gradient-to-b from-gray-300 to-gray-200 h-2 rounded-t-full mx-auto max-w-3xl shadow-lg" />
            <p className="text-center text-gray-400 text-sm mt-2">PANTALLA</p>
          </div>

          {/* Seats */}
          <div className="overflow-x-auto pb-4">
            <div className="inline-block min-w-full">
              <div className="space-y-2">
                {rows.map((row) => (
                  <div key={row} className="flex items-center justify-center gap-2">
                    <span className="w-8 text-center font-semibold text-gray-400">{row}</span>
                    <div className="flex gap-2">
                      {seats
                        .filter(seat => seat.row === row)
                        .map((seat) => {
                          const status = getSeatStatus(seat.id);
                          return (
                            <motion.button
                              key={seat.id}
                              whileHover={status !== 'occupied' ? { scale: 1.1 } : {}}
                              whileTap={status !== 'occupied' ? { scale: 0.95 } : {}}
                              onClick={() => toggleSeat(seat.id)}
                              className={`w-8 h-8 rounded-t-lg transition-colors relative ${getSeatColor(status)}`}
                              disabled={status === 'occupied'}
                            >
                              {status === 'selected' && (
                                <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
                              )}
                            </motion.button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-400">
                  Asientos seleccionados: {selectedSeats.length > 0 ? selectedSeats.sort().join(', ') : 'Ninguno'}
                </p>
                <p className="text-xl font-bold text-red-400">
                  Total: {formatColones(getTotalPrice())}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className="bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto"
              >
                Continuar
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
