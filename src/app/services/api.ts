const API_URL = '/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
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
