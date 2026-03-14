import { useNavigate } from 'react-router';
import { useBooking, TicketType } from '../context/BookingContext';
import { motion } from 'motion/react';
import { ArrowLeft, Film, MapPin, Calendar, Clock, Shield, Minus, Plus, Armchair } from 'lucide-react';
import { toast } from 'sonner';
import { formatColones } from '../utils/format';

export const TicketSelection = () => {
  const navigate = useNavigate();
  const {
    selectedMovie,
    selectedShowtime,
    tickets,
    setTickets,
    getTotalTickets,
    getTotalPrice,
  } = useBooking();

  if (!selectedMovie || !selectedShowtime) {
    navigate('/cartelera');
    return null;
  }

  const updateQuantity = (id: string, delta: number) => {
    setTickets(
      tickets.map((t) => {
        if (t.id !== id) return t;
        const newQty = Math.max(0, Math.min(10, t.quantity + delta));
        return { ...t, quantity: newQty };
      })
    );
  };

  const handleContinue = () => {
    if (getTotalTickets() === 0) {
      toast.error('Debes seleccionar al menos una entrada');
      return;
    }
    navigate('/seats');
  };

  const formatColones = (amount: number) =>
    `₡${amount.toLocaleString('es-CR', { minimumFractionDigits: 0 })}`;

  const endTime = (() => {
    const [h, m] = selectedShowtime.time.split(':').map(Number);
    const totalMin = h * 60 + m + selectedMovie.duration;
    const eh = Math.floor(totalMin / 60) % 24;
    const em = totalMin % 60;
    return `${String(eh).padStart(2, '0')}:${String(em).padStart(2, '0')}`;
  })();

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header breadcrumb */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 text-sm">
          <button onClick={() => navigate('/cartelera')} className="text-gray-400 hover:text-white transition-colors">
            HOME
          </button>
          <span className="text-gray-500">&gt;</span>
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            CARTELERA
          </button>
          <span className="text-gray-500">&gt;</span>
          <span className="text-red-400 font-medium">DETALLE DE PELÍCULA</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight">
          DETALLE DE PELÍCULA
        </h1>

        {/* Movie Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8"
        >
          {/* Top colored bar */}
          <div className="h-1.5 bg-gradient-to-r from-red-600 to-amber-500" />

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Film className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-red-500 uppercase tracking-wider">Cine</p>
                    <p className="font-bold text-white">CINEMAX</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-0.5 shrink-0 flex items-center justify-center">
                    <span className="text-red-500 text-lg">🎬</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-500 uppercase tracking-wider">Película</p>
                    <p className="font-bold text-white">{selectedMovie.title}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-red-500 uppercase tracking-wider">Sala</p>
                    <p className="font-bold text-white">{selectedShowtime.room}</p>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-red-500 uppercase tracking-wider">Fecha</p>
                    <p className="font-bold text-white">
                      {new Date(selectedShowtime.date + 'T12:00:00').toLocaleDateString('es-CR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-red-500 uppercase tracking-wider">Tanda</p>
                    <p className="font-bold text-white">
                      {selectedShowtime.time} p.m. a {endTime} p.m.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-red-500 uppercase tracking-wider">Censura</p>
                    <p className="font-bold text-white">{selectedMovie.rating}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-1 bg-gradient-to-r from-red-600 to-amber-500" />
        </motion.div>

        {/* Ticket Selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8"
        >
          <div className="p-6 md:p-8">
            {/* Headers */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-extrabold text-red-500 uppercase tracking-wider">
                Tipo de Entrada
              </h2>
              <h2 className="text-lg font-extrabold text-red-500 uppercase tracking-wider">
                Cantidad
              </h2>
            </div>

            {/* Ticket rows */}
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between bg-gray-800 rounded-lg px-5 py-4 border border-gray-700"
                >
                  <span className="font-semibold text-gray-300 text-sm md:text-base">
                    *{ticket.label} {formatColones(ticket.price)}
                  </span>

                  <div className="flex items-center gap-0 rounded-lg overflow-hidden border-2 border-red-500">
                    <button
                      onClick={() => updateQuantity(ticket.id, -1)}
                      className="bg-red-600 hover:bg-red-700 text-white w-12 h-12 flex items-center justify-center text-2xl font-bold transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-14 h-12 flex items-center justify-center text-2xl font-bold text-white bg-gray-800">
                      {ticket.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(ticket.id, 1)}
                      className="bg-red-600 hover:bg-red-700 text-white w-12 h-12 flex items-center justify-center text-2xl font-bold transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <p className="text-red-400 text-sm mt-4 font-medium">*CINEMAX</p>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8"
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Cantidad de Entradas
                  </p>
                  <div className="bg-red-600 text-white text-2xl font-bold w-14 h-14 rounded-lg flex items-center justify-center">
                    {getTotalTickets()}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Total
                  </p>
                  <div className="bg-gradient-to-r from-red-600 to-amber-500 text-white text-lg font-bold px-6 h-14 rounded-lg flex items-center justify-center min-w-[200px]">
                    {formatColones(getTotalPrice())}
                    <span className="text-xs ml-2 text-amber-200 font-normal">IVA incluido</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-colors"
          >
            Regresar
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            disabled={getTotalTickets() === 0}
            className="flex-1 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 disabled:from-gray-400 disabled:to-gray-400 text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <Armchair className="w-6 h-6" />
            Seleccionar Asientos
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
