const API_URL = '/api';

// Importar mock API para desarrollo
import { mockAuthApi, mockMoviesApi, mockBookingsApi } from './mockApi';

// Detectar si estamos en desarrollo local
const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Si es un endpoint de auth y estamos en desarrollo, usar mock
  if (isDevelopment && endpoint.startsWith('/auth')) {
    const body = options?.body && typeof options.body === 'string' 
      ? JSON.parse(options.body) 
      : {};
    
    if (endpoint === '/auth/login') {
      return await mockAuthApi.login(body.email, body.password) as T;
    } else if (endpoint === '/auth/register') {
      return await mockAuthApi.register(body.name, body.email, body.password) as T;
    } else if (endpoint === '/auth/profile') {
      return await mockAuthApi.getProfile() as T;
    }
  }

  // Mock para movies en desarrollo
  if (isDevelopment && endpoint.startsWith('/movies')) {
    if (endpoint === '/movies') {
      const url = new URL(`${API_URL}${endpoint}`, window.location.origin);
      const status = url.searchParams.get('status') || undefined;
      return await mockMoviesApi.getAll(status) as T;
    } else if (endpoint.match(/^\/movies\/[^\/]+$/)) {
      const movieId = endpoint.split('/')[2];
      return await mockMoviesApi.getById(movieId) as T;
    } else if (endpoint.match(/^\/movies\/[^\/]+\/showtimes$/)) {
      const movieId = endpoint.split('/')[2];
      return await mockMoviesApi.getShowtimes(movieId) as T;
    } else if (endpoint === '/movies/bookings') {
      const body = options?.body && typeof options.body === 'string' 
        ? JSON.parse(options.body) 
        : {};
      return await mockBookingsApi.create(body) as T;
    } else if (endpoint === '/movies/bookings/me') {
      return await mockBookingsApi.getMine() as T;
    }
  }

  const token = localStorage.getItem('cinemax_token');

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Error de conexión' }));
    throw new Error(error.message);
  }

  return res.json();
}

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    request<{ user: { id: string; name: string; email: string }; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    request<{ user: { id: string; name: string; email: string }; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  getProfile: () =>
    request<{ id: string; name: string; email: string }>('/auth/profile'),
};

// Movies
export const moviesApi = {
  getAll: (status?: string) =>
    request<any[]>(`/movies${status ? `?status=${status}` : ''}`),

  getById: (id: string) =>
    request<any>(`/movies/${id}`),

  getShowtimes: (movieId: string) =>
    request<any[]>(`/movies/${movieId}/showtimes`),
};

// Bookings
export const bookingsApi = {
  create: (data: { movieId: string; showtimeId: string; seats: string[]; snacks: any[]; total: number }) =>
    request<any>('/movies/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMine: () =>
    request<any[]>('/movies/bookings/me'),
};
