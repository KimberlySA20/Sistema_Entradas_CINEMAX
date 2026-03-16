// Mock API para desarrollo local
import { movies, showtimes, Movie, Showtime } from '../data/mockData';

const users: any[] = [];
const bookings: any[] = [];

// Mock auth endpoints
export const mockAuthApi = {
  login: async (email: string, password: string) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = users.find(u => u.email === email);
    if (!user || user.password !== password) {
      throw new Error('Credenciales inválidas');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token: `mock_token_${Date.now()}`
    };
  },

  register: async (name: string, email: string, password: string) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Validar que el email no exista
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }
    
    // Validar que los campos no estén vacíos
    if (!name || !email || !password) {
      throw new Error('Todos los campos son requeridos');
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }
    
    // Validar longitud de contraseña
    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    
    // Crear nuevo usuario
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password
    };
    
    users.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token: `mock_token_${Date.now()}`
    };
  },

  getProfile: async () => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Para el mock, devolver un usuario de ejemplo
    // En una app real, esto usaría el token para obtener el usuario
    return {
      id: 'user_1',
      name: 'Usuario Demo',
      email: 'demo@cinemax.com'
    };
  }
};

// Mock movies endpoints
export const mockMoviesApi = {
  getAll: async (status?: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let moviesFiltered = movies;
    if (status === 'estreno') {
      moviesFiltered = moviesFiltered.filter((m: Movie) => m.status === 'now-showing');
    } else if (status === 'proximos') {
      moviesFiltered = moviesFiltered.filter((m: Movie) => m.status === 'coming-soon');
    }
    
    // Devolver con formato _id para compatibilidad
    return moviesFiltered.map(m => ({ ...m, _id: m.id }));
  },

  getById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const movie = movies.find((m: Movie) => m.id === id);
    if (!movie) {
      throw new Error('Película no encontrada');
    }
    
    // Devolver con formato _id para compatibilidad
    return { ...movie, _id: movie.id };
  },

  getShowtimes: async (movieId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const filteredShowtimes = showtimes.filter((s: Showtime) => s.movieId === movieId);
    // Devolver con formato _id para compatibilidad
    return filteredShowtimes.map(s => ({ ...s, _id: s.id }));
  }
};

// Mock bookings endpoints
export const mockBookingsApi = {
  create: async (data: { movieId: string; showtimeId: string; seats: string[]; snacks: any[]; total: number }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newBooking = {
      _id: `booking_${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    return newBooking;
  },

  getMine: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Para el mock, devolver algunas compras de ejemplo
    return bookings.slice(-5); // Últimas 5 compras
  }
};
