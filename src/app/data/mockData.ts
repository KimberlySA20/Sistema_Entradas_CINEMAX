// Mock data para el sistema de cine

export interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string;
  duration: number; // en minutos
  rating: string;
  releaseDate: string;
  synopsis: string;
  status: 'now-showing' | 'pre-release' | 'coming-soon';
}

export interface Showtime {
  id: string;
  movieId: string;
  date: string;
  time: string;
  room: string;
  language: string;
  format: '2D' | '3D';
  price: number;
}

export interface Snack {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'popcorn' | 'drinks' | 'candy' | 'combos';
}

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Código Oscuro',
    poster: 'https://images.unsplash.com/photo-1765510296004-614b6cc204da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzM0MTA2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Acción',
    duration: 132,
    rating: '+16',
    releaseDate: '2026-03-01',
    synopsis: 'Un agente secreto debe detener una conspiración global antes de que sea demasiado tarde. Una trepidante aventura llena de acción y suspenso.',
    status: 'now-showing'
  },
  {
    id: '2',
    title: 'La Sombra Eterna',
    poster: 'https://images.unsplash.com/photo-1630338679229-99fb150fbf88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBtb3ZpZSUyMGRhcmslMjBzY2VuZXxlbnwxfHx8fDE3NzM0NTU5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Terror',
    duration: 98,
    rating: '+18',
    releaseDate: '2026-02-28',
    synopsis: 'Una familia se muda a una casa antigua y descubre que no están solos. El terror les perseguirá en cada esquina.',
    status: 'now-showing'
  },
  {
    id: '3',
    title: 'Amor en Primavera',
    poster: 'https://images.unsplash.com/photo-1658851866325-49fb8b7fbcb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHN1bnNldHxlbnwxfHx8fDE3NzM0NDg1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Romance',
    duration: 110,
    rating: 'ATP',
    releaseDate: '2026-03-05',
    synopsis: 'Dos almas destinadas a encontrarse viven una historia de amor inolvidable en una pequeña ciudad costera.',
    status: 'now-showing'
  },
  {
    id: '4',
    title: 'Galaxia 2099',
    poster: 'https://images.unsplash.com/photo-1619960535209-fc795018bbe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzczNDE5MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Ciencia Ficción',
    duration: 145,
    rating: '+13',
    releaseDate: '2026-03-20',
    synopsis: 'En un futuro lejano, la humanidad debe encontrar un nuevo hogar entre las estrellas. Una épica aventura espacial.',
    status: 'pre-release'
  },
  {
    id: '5',
    title: 'Risa Total',
    poster: 'https://images.unsplash.com/photo-1762388371217-53f5681d862e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBwYXJ0eSUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3MzQ1NTkwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Comedia',
    duration: 95,
    rating: '+13',
    releaseDate: '2026-04-10',
    synopsis: 'Un grupo de amigos enfrenta situaciones hilarantes cuando deciden organizar la fiesta del año. Risas garantizadas.',
    status: 'coming-soon'
  }
];

export const showtimes: Showtime[] = [
  // Código Oscuro
  { id: 's1', movieId: '1', date: '2026-03-15', time: '14:30', room: 'San Carlos', language: 'Español', format: '2D', price: 8 },
  { id: 's2', movieId: '1', date: '2026-03-15', time: '17:00', room: 'San Carlos', language: 'Español', format: '2D', price: 8 },
  { id: 's3', movieId: '1', date: '2026-03-15', time: '20:00', room: 'Alajuela Plaza Real', language: 'Subtitulado', format: '3D', price: 12 },
  { id: 's4', movieId: '1', date: '2026-03-15', time: '22:30', room: 'Multiplaza Escazú', language: 'Subtitulado', format: '2D', price: 8 },

  // La Sombra Eterna
  { id: 's5', movieId: '2', date: '2026-03-15', time: '15:00', room: 'San Carlos', language: 'Español', format: '2D', price: 8 },
  { id: 's6', movieId: '2', date: '2026-03-15', time: '18:30', room: 'Alajuela Plaza Real', language: 'Subtitulado', format: '2D', price: 8 },
  { id: 's7', movieId: '2', date: '2026-03-15', time: '21:00', room: 'Multiplaza Escazú', language: 'Español', format: '2D', price: 8 },
  { id: 's8', movieId: '2', date: '2026-03-15', time: '23:30', room: 'San Carlos', language: 'Subtitulado', format: '2D', price: 8 },

  // Amor en Primavera
  { id: 's9', movieId: '3', date: '2026-03-15', time: '13:00', room: 'Alajuela Plaza Real', language: 'Español', format: '2D', price: 8 },
  { id: 's10', movieId: '3', date: '2026-03-15', time: '16:00', room: 'Alajuela Plaza Real', language: 'Español', format: '2D', price: 8 },
  { id: 's11', movieId: '3', date: '2026-03-15', time: '19:00', room: 'Multiplaza Escazú', language: 'Subtitulado', format: '2D', price: 8 },
  { id: 's12', movieId: '3', date: '2026-03-15', time: '21:30', room: 'San Carlos', language: 'Español', format: '2D', price: 8 },

  // Galaxia 2099
  { id: 's13', movieId: '4', date: '2026-03-20', time: '15:00', room: 'Multiplaza Escazú', language: 'Español', format: '3D', price: 12 },
  { id: 's14', movieId: '4', date: '2026-03-20', time: '18:00', room: 'San Carlos', language: 'Subtitulado', format: '3D', price: 12 },
  { id: 's15', movieId: '4', date: '2026-03-20', time: '21:00', room: 'Alajuela Plaza Real', language: 'Español', format: '2D', price: 8 },
];

export const snacks: Snack[] = [
  {
    id: 'sn1',
    name: 'Pochoclos Grandes',
    description: 'Pochoclos calientes con manteca',
    price: 5,
    image: 'https://images.unsplash.com/photo-1768582870566-d1ea815a7545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hJTIwc25hY2tzfGVufDF8fHx8MTc3MzM3NTA2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'popcorn'
  },
  {
    id: 'sn2',
    name: 'Pochoclos Medianos',
    description: 'Pochoclos calientes con manteca',
    price: 4,
    image: 'https://images.unsplash.com/photo-1768582870566-d1ea815a7545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hJTIwc25hY2tzfGVufDF8fHx8MTc3MzM3NTA2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'popcorn'
  },
  {
    id: 'sn3',
    name: 'Gaseosa Grande',
    description: 'Bebida fría 700ml',
    price: 4,
    image: 'https://images.unsplash.com/photo-1629257657047-9b40cd435eb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwZHJpbmslMjBjdXB8ZW58MXx8fHwxNzczMzU5NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'drinks'
  },
  {
    id: 'sn4',
    name: 'Gaseosa Mediana',
    description: 'Bebida fría 500ml',
    price: 3,
    image: 'https://images.unsplash.com/photo-1629257657047-9b40cd435eb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwZHJpbmslMjBjdXB8ZW58MXx8fHwxNzczMzU5NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'drinks'
  },
  {
    id: 'sn5',
    name: 'Combo Grande',
    description: 'Pochoclos grandes + 2 gaseosas grandes',
    price: 12,
    image: 'https://images.unsplash.com/photo-1768582870566-d1ea815a7545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hJTIwc25hY2tzfGVufDF8fHx8MTc3MzM3NTA2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'combos'
  },
  {
    id: 'sn6',
    name: 'Combo Pareja',
    description: 'Pochoclos medianos + 2 gaseosas medianas',
    price: 10,
    image: 'https://images.unsplash.com/photo-1768582870566-d1ea815a7545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hJTIwc25hY2tzfGVufDF8fHx8MTc3MzM3NTA2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'combos'
  }
];

// Estructura de asientos para una sala
export const generateSeats = (rows: number, cols: number) => {
  const seats = [];
  const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  // Asientos ocupados aleatoriamente para demostración
  const occupiedSeats = new Set([
    'A3', 'A4', 'B5', 'B6', 'C7', 'D2', 'D3', 'E8', 'E9',
    'F4', 'F5', 'G10', 'H1', 'H2', 'I6', 'I7'
  ]);
  
  for (let row = 0; row < rows; row++) {
    for (let col = 1; col <= cols; col++) {
      const seatId = `${rowLabels[row]}${col}`;
      seats.push({
        id: seatId,
        row: rowLabels[row],
        number: col,
        status: occupiedSeats.has(seatId) ? 'occupied' : 'available'
      });
    }
  }
  
  return seats;
};
