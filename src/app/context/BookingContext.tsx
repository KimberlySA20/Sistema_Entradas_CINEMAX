import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie, Showtime, Snack } from '../data/mockData';

export interface TicketType {
  id: string;
  label: string;
  price: number;
  quantity: number;
}

export interface Cinema {
  id: string;
  name: string;
  location: string;
}

interface BookingContextType {
  selectedCinema: Cinema | null;
  selectedMovie: Movie | null;
  selectedShowtime: Showtime | null;
  selectedSeats: string[];
  selectedSnacks: { snack: Snack; quantity: number }[];
  tickets: TicketType[];
  setSelectedCinema: (cinema: Cinema | null) => void;
  setSelectedMovie: (movie: Movie | null) => void;
  setSelectedShowtime: (showtime: Showtime | null) => void;
  setSelectedSeats: (seats: string[]) => void;
  setTickets: (tickets: TicketType[]) => void;
  getTotalTickets: () => number;
  addSnack: (snack: Snack) => void;
  removeSnack: (snackId: string) => void;
  updateSnackQuantity: (snackId: string, quantity: number) => void;
  clearBooking: () => void;
  getTotalPrice: () => number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const defaultTickets = (format: string): TicketType[] => [
  { id: 'adulto', label: `Adulto Promo ${format}`, price: 3400, quantity: 0 },
  { id: 'nino', label: `Niño Promo ${format}`, price: 3000, quantity: 0 },
  { id: 'adulto-mayor', label: `Adulto Mayor Promo ${format}`, price: 3000, quantity: 0 },
];

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSnacks, setSelectedSnacks] = useState<{ snack: Snack; quantity: number }[]>([]);
  const [tickets, setTickets] = useState<TicketType[]>(defaultTickets('2D'));

  const handleSetShowtime = (showtime: Showtime | null) => {
    setSelectedShowtime(showtime);
    if (showtime) {
      setTickets(defaultTickets(showtime.format));
    }
  };

  const getTotalTickets = () => tickets.reduce((sum, t) => sum + t.quantity, 0);

  const addSnack = (snack: Snack) => {
    setSelectedSnacks(prev => {
      const existing = prev.find(s => s.snack.id === snack.id);
      if (existing) {
        return prev.map(s =>
          s.snack.id === snack.id ? { ...s, quantity: s.quantity + 1 } : s
        );
      }
      return [...prev, { snack, quantity: 1 }];
    });
  };

  const removeSnack = (snackId: string) => {
    setSelectedSnacks(prev => prev.filter(s => s.snack.id !== snackId));
  };

  const updateSnackQuantity = (snackId: string, quantity: number) => {
    if (quantity <= 0) removeSnack(snackId);
    else setSelectedSnacks(prev => prev.map(s => s.snack.id === snackId ? { ...s, quantity } : s));
  };

  const clearBooking = () => {
    setSelectedMovie(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
    setSelectedSnacks([]);
    setTickets(defaultTickets('2D'));
  };

  const getTotalPrice = () => {
    const ticketsPrice = tickets.reduce((sum, t) => sum + t.price * t.quantity, 0);
    // Los snacks ahora están en colones directamente
    const snacksPrice = selectedSnacks.reduce((total, { snack, quantity }) => total + snack.price * quantity, 0);
    return ticketsPrice + snacksPrice;
  };

  return (
    <BookingContext.Provider
      value={{
        selectedCinema,
        selectedMovie,
        selectedShowtime,
        selectedSeats,
        selectedSnacks,
        tickets,
        setSelectedCinema,
        setSelectedMovie,
        setSelectedShowtime: handleSetShowtime,
        setSelectedSeats,
        setTickets,
        getTotalTickets,
        addSnack,
        removeSnack,
        updateSnackQuantity,
        clearBooking,
        getTotalPrice,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
