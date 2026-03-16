import 'dotenv/config';
import mongoose from 'mongoose';
import Movie from './models/Movie.js';
import Showtime from './models/Showtime.js';

const movies = [
  {
    title: 'Código Oscuro',
    poster: 'https://images.unsplash.com/photo-1765510296004-614b6cc204da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzM0MTA2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Acción',
    duration: 132,
    rating: '+16',
    releaseDate: '2026-03-01',
    synopsis: 'Un agente secreto debe detener una conspiración global antes de que sea demasiado tarde. Una trepidante aventura llena de acción y suspenso.',
    status: 'now-showing',
  },
  {
    title: 'La Sombra Eterna',
    poster: 'https://images.unsplash.com/photo-1630338679229-99fb150fbf88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBtb3ZpZSUyMGRhcmslMjBzY2VuZXxlbnwxfHx8fDE3NzM0NTU5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Terror',
    duration: 98,
    rating: '+18',
    releaseDate: '2026-02-28',
    synopsis: 'Una familia se muda a una casa antigua y descubre que no están solos. El terror les perseguirá en cada esquina.',
    status: 'now-showing',
  },
  {
    title: 'Amor en Primavera',
    poster: 'https://images.unsplash.com/photo-1658851866325-49fb8b7fbcb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHN1bnNldHxlbnwxfHx8fDE3NzM0NDg1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Romance',
    duration: 110,
    rating: 'ATP',
    releaseDate: '2026-03-05',
    synopsis: 'Dos almas destinadas a encontrarse viven una historia de amor inolvidable en una pequeña ciudad costera.',
    status: 'now-showing',
  },
  {
    title: 'Galaxia 2099',
    poster: 'https://images.unsplash.com/photo-1619960535209-fc795018bbe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzczNDE5MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Ciencia Ficción',
    duration: 145,
    rating: '+13',
    releaseDate: '2026-03-20',
    synopsis: 'En un futuro lejano, la humanidad debe encontrar un nuevo hogar entre las estrellas. Una épica aventura espacial.',
    status: 'pre-release',
  },
  {
    title: 'Risa Total',
    poster: 'https://images.unsplash.com/photo-1762388371217-53f5681d862e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBwYXJ0eSUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3MzQ1NTkwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Comedia',
    duration: 95,
    rating: '+13',
    releaseDate: '2026-04-10',
    synopsis: 'Un grupo de amigos enfrenta situaciones hilarantes cuando deciden organizar la fiesta del año. Risas garantizadas.',
    status: 'coming-soon',
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Conectado a MongoDB');

  // Limpiar colecciones
  await Movie.deleteMany({});
  await Showtime.deleteMany({});
  console.log('Colecciones limpiadas');

  // Insertar películas
  const insertedMovies = await Movie.insertMany(movies);
  console.log(`${insertedMovies.length} películas insertadas`);

  // Crear funciones para cada película
  const showtimes: any[] = [];

  // Código Oscuro (index 0)
  const m0 = insertedMovies[0]._id;
  showtimes.push(
    { movieId: m0, date: '2026-03-15', time: '14:30', room: 'San Carlos', language: 'Español', format: '2D', price: 8 },
    { movieId: m0, date: '2026-03-15', time: '17:00', room: 'San Carlos', language: 'Español', format: '2D', price: 8 },
    { movieId: m0, date: '2026-03-15', time: '20:00', room: 'Alajuela Plaza Real', language: 'Subtitulado', format: '3D', price: 12 },
    { movieId: m0, date: '2026-03-15', time: '22:30', room: 'Multiplaza Escazú', language: 'Subtitulado', format: '2D', price: 8 },
  );

  // La Sombra Eterna (index 1)
  const m1 = insertedMovies[1]._id;
  showtimes.push(
    { movieId: m1, date: '2026-03-15', time: '15:00', room: 'San Carlos', language: 'Español', format: '2D', price: 8 },
    { movieId: m1, date: '2026-03-15', time: '18:30', room: 'Alajuela Plaza Real', language: 'Subtitulado', format: '2D', price: 8 },
    { movieId: m1, date: '2026-03-15', time: '21:00', room: 'Multiplaza Escazú', language: 'Español', format: '2D', price: 8 },
    { movieId: m1, date: '2026-03-15', time: '23:30', room: 'San Carlos', language: 'Subtitulado', format: '2D', price: 8 },
  );

  // Amor en Primavera (index 2)
  const m2 = insertedMovies[2]._id;
  showtimes.push(
    { movieId: m2, date: '2026-03-15', time: '13:00', room: 'Alajuela Plaza Real', language: 'Español', format: '2D', price: 8 },
    { movieId: m2, date: '2026-03-15', time: '16:00', room: 'Alajuela Plaza Real', language: 'Español', format: '2D', price: 8 },
    { movieId: m2, date: '2026-03-15', time: '19:00', room: 'Multiplaza Escazú', language: 'Subtitulado', format: '2D', price: 8 },
    { movieId: m2, date: '2026-03-15', time: '21:30', room: 'San Carlos', language: 'Español', format: '2D', price: 8 },
  );

  // Galaxia 2099 (index 3)
  const m3 = insertedMovies[3]._id;
  showtimes.push(
    { movieId: m3, date: '2026-03-20', time: '15:00', room: 'Multiplaza Escazú', language: 'Español', format: '3D', price: 12 },
    { movieId: m3, date: '2026-03-20', time: '18:00', room: 'San Carlos', language: 'Subtitulado', format: '3D', price: 12 },
    { movieId: m3, date: '2026-03-20', time: '21:00', room: 'Alajuela Plaza Real', language: 'Español', format: '2D', price: 8 },
  );

  const insertedShowtimes = await Showtime.insertMany(showtimes);
  console.log(`${insertedShowtimes.length} funciones insertadas`);

  await mongoose.disconnect();
  console.log('Seed completado exitosamente');
}

seed().catch(console.error);
