import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie, Showtime, Snack } from '../data/mockData';

interface BookingContextType {
  selectedMovie: Movie | null;
  selectedShowtime: Showtime | null;
  selectedSeats: string[];
  selectedSnacks: { snack: Snack; quantity: number }[];
  setSelectedMovie: (movie: Movie | null) => void;
  setSelectedShowtime: (showtime: Showtime | null) => void;
  setSelectedSeats: (seats: string[]) => void;
  addSnack: (snack: Snack) => void;
  removeSnack: (snackId: string) => void;
  updateSnackQuantity: (snackId: string, quantity: number) => void;
  clearBooking: () => void;
  getTotalPrice: () => number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSnacks, setSelectedSnacks] = useState<{ snack: Snack; quantity: number }[]>([]);

  const addSnack = (snack: Snack) => {
    setSelectedSnacks(prev => {
      const existing = prev.find(s => s.snack.id === snack.id);
      if (existing) {
        return prev.map(s => 
          s.snack.id === snack.id 
            ? { ...s, quantity: s.quantity + 1 }
            : s
        );
      }
      return [...prev, { snack, quantity: 1 }];
    });
  };

  const removeSnack = (snackId: string) => {
    setSelectedSnacks(prev => prev.filter(s => s.snack.id !== snackId));
  };

  const updateSnackQuantity = (snackId: string, quantity: number) => {
    if (quantity <= 0) {
      removeSnack(snackId);
    } else {
      setSelectedSnacks(prev =>
        prev.map(s => s.snack.id === snackId ? { ...s, quantity } : s)
      );
    }
  };

  const clearBooking = () => {
    setSelectedMovie(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
    setSelectedSnacks([]);
  };

  const getTotalPrice = () => {
    const ticketsPrice = selectedShowtime ? selectedShowtime.price * selectedSeats.length : 0;
    const snacksPrice = selectedSnacks.reduce((total, { snack, quantity }) => {
      return total + (snack.price * quantity);
    }, 0);
    return ticketsPrice + snacksPrice;
  };

  return (
    <BookingContext.Provider
      value={{
        selectedMovie,
        selectedShowtime,
        selectedSeats,
        selectedSnacks,
        setSelectedMovie,
        setSelectedShowtime,
        setSelectedSeats,
        addSnack,
        removeSnack,
        updateSnackQuantity,
        clearBooking,
        getTotalPrice
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
