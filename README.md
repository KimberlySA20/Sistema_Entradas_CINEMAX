<div align="center">

# 🎬 CINEMAX

### Sistema de Venta de Entradas de Cine

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.9-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

<br/>

<img src="https://images.unsplash.com/photo-1640127249308-098702574176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" alt="CINEMAX Banner" width="600" style="border-radius: 12px;" />

<br/>

*Plataforma web completa para la gestión y venta de entradas de cine con selección de asientos, snacks y múltiples sedes.*

---

[Características](#-características) · [Tech Stack](#-tech-stack) · [Instalación](#-instalación) · [Estructura](#-estructura-del-proyecto) · [API](#-api-endpoints) · [Sedes](#-sedes)

</div>

<br/>

## ✨ Características

| Módulo | Descripción |
|--------|-------------|
| 🏠 **Landing Page** | Selección de sede con animaciones fluidas |
| 🎥 **Cartelera** | Películas organizadas por estado (en cartelera, preestrenos, próximos) |
| 📋 **Detalle de Película** | Sinopsis, horarios disponibles por fecha y formato (2D/3D) |
| 💺 **Selección de Asientos** | Mapa interactivo de la sala con asientos disponibles/ocupados |
| 🍿 **Snacks** | Catálogo de combos, palomitas y bebidas |
| 💳 **Checkout** | Resumen de compra con desglose de precios |
| 🎉 **Confirmación** | Animación de éxito con confetti |
| 👤 **Autenticación** | Registro e inicio de sesión con JWT |
| 📦 **Historial** | Consulta de compras realizadas |

<br/>

## 🛠 Tech Stack

### Frontend
- **React 18** con React Router 7
- **TypeScript** para tipado estático
- **Tailwind CSS 4** para estilos
- **Framer Motion** para animaciones
- **Vite** como bundler
- **Radix UI** + **shadcn/ui** para componentes
- **Lucide React** para iconos

### Backend
- **Express.js** con TypeScript
- **MongoDB** con Mongoose ODM
- **JWT** para autenticación
- **bcryptjs** para hash de contraseñas
- **CORS** habilitado

<br/>

## 🚀 Instalación

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) corriendo localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/KimberlySA20/Sistema_Entradas_CINEMAX.git
cd Sistema_Entradas_CINEMAX
```

### 2. Instalar dependencias

```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### 3. Configurar variables de entorno

Crear archivo `backend/.env`:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/cinemax
JWT_SECRET=tu_secret_key_aqui
```

### 4. Poblar la base de datos

```bash
cd backend
npx tsx src/seed.ts
```

### 5. Ejecutar el proyecto

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

Abre **http://localhost:5174** en tu navegador.

<br/>

## 📁 Estructura del Proyecto

```
CINEMAX/
├── src/                          # Frontend
│   ├── app/
│   │   ├── components/           # Componentes reutilizables
│   │   │   ├── ui/               # Componentes UI (shadcn)
│   │   │   ├── MovieCard.tsx
│   │   │   └── Navbar.tsx
│   │   ├── context/              # Estado global
│   │   │   ├── AuthContext.tsx
│   │   │   └── BookingContext.tsx
│   │   ├── data/                 # Datos mock (fallback)
│   │   ├── pages/                # Páginas de la app
│   │   │   ├── Landing.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── MovieDetail.tsx
│   │   │   ├── SeatSelection.tsx
│   │   │   ├── SnackSelection.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── Confirmation.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Purchases.tsx
│   │   ├── services/             # Cliente API
│   │   ├── routes.tsx
│   │   └── App.tsx
│   ├── styles/
│   └── main.tsx
│
├── backend/                      # Backend API
│   └── src/
│       ├── config/
│       │   └── db.ts             # Conexión MongoDB
│       ├── controllers/
│       │   ├── authController.ts
│       │   └── movieController.ts
│       ├── middleware/
│       │   └── authMiddleware.ts  # Verificación JWT
│       ├── models/
│       │   ├── User.ts
│       │   ├── Movie.ts
│       │   ├── Showtime.ts
│       │   └── Booking.ts
│       ├── routes/
│       │   ├── authRoutes.ts
│       │   └── movieRoutes.ts
│       ├── services/
│       │   └── authService.ts
│       ├── seed.ts               # Script para poblar DB
│       ├── app.ts
│       └── server.ts
│
├── index.html
├── vite.config.ts
└── package.json
```

<br/>

## 🔌 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Registrar usuario | No |
| `POST` | `/api/auth/login` | Iniciar sesión | No |
| `GET` | `/api/auth/profile` | Obtener perfil | Si |

### Películas y Funciones

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/movies` | Listar películas | No |
| `GET` | `/api/movies/:id` | Detalle de película | No |
| `GET` | `/api/movies/:id/showtimes` | Funciones por película | No |

### Reservas

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/movies/bookings` | Crear reserva | Si |
| `GET` | `/api/movies/bookings/me` | Mis reservas | Si |

<br/>

## 📍 Sedes

| Sede | Ubicación |
|------|-----------|
| 🏢 **San Carlos** | CINEMAX San Carlos |
| 🏬 **Alajuela** | Plaza Real |
| 🏪 **Escazú** | Multiplaza Escazú |

<br/>

## 👩‍💻 Autora

**Kimberly Salazar** — [@KimberlySA20](https://github.com/KimberlySA20)

<br/>

---

<div align="center">


</div>
