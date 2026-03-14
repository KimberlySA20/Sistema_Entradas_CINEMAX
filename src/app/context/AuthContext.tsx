import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, bookingsApi } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Purchase {
  id: string;
  movieTitle: string;
  date: string;
  time: string;
  room: string;
  seats: string[];
  total: number;
  purchaseDate: string;
}

interface AuthContextType {
  user: User | null;
  purchases: Purchase[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addPurchase: (purchase: Omit<Purchase, 'id' | 'purchaseDate'>) => void;
  refreshPurchases: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('cinemax_token');
    if (token) {
      authApi.getProfile()
        .then((userData) => {
          setUser({ id: userData.id, name: userData.name, email: userData.email });
        })
        .catch(() => {
          localStorage.removeItem('cinemax_token');
        });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await authApi.login(email, password);
      localStorage.setItem('cinemax_token', result.token);
      setUser(result.user);
      return true;
    } catch {
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const result = await authApi.register(name, email, password);
      localStorage.setItem('cinemax_token', result.token);
      setUser(result.user);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('cinemax_token');
    setUser(null);
    setPurchases([]);
  };

  const refreshPurchases = async () => {
    try {
      const bookings = await bookingsApi.getMine();
      const mapped: Purchase[] = bookings.map((b: any) => ({
        id: b._id,
        movieTitle: b.movieId?.title || 'Película',
        date: b.showtimeId?.date || '',
        time: b.showtimeId?.time || '',
        room: b.showtimeId?.room || '',
        seats: b.seats,
        total: b.total,
        purchaseDate: b.createdAt,
      }));
      setPurchases(mapped);
    } catch {
      // silencioso
    }
  };

  const addPurchase = (purchase: Omit<Purchase, 'id' | 'purchaseDate'>) => {
    const newPurchase: Purchase = {
      ...purchase,
      id: Date.now().toString(),
      purchaseDate: new Date().toISOString(),
    };
    setPurchases((prev) => [newPurchase, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{ user, purchases, login, register, logout, addPurchase, refreshPurchases }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
