import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { MovieDetail } from './pages/MovieDetail';
import { TicketSelection } from './pages/TicketSelection';
import { SeatSelection } from './pages/SeatSelection';
import { SnackSelection } from './pages/SnackSelection';
import { Checkout } from './pages/Checkout';
import { Confirmation } from './pages/Confirmation';
import { Login } from './pages/Login';
import { Purchases } from './pages/Purchases';
import { Navbar } from './components/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/cartelera',
    element: (
      <Layout>
        <Home />
      </Layout>
    )
  },
  {
    path: '/movie/:id',
    element: (
      <Layout>
        <MovieDetail />
      </Layout>
    )
  },
  {
    path: '/tickets',
    element: (
      <Layout>
        <TicketSelection />
      </Layout>
    )
  },
  {
    path: '/seats',
    element: (
      <Layout>
        <SeatSelection />
      </Layout>
    )
  },
  {
    path: '/snacks',
    element: (
      <Layout>
        <SnackSelection />
      </Layout>
    )
  },
  {
    path: '/checkout',
    element: (
      <Layout>
        <Checkout />
      </Layout>
    )
  },
  {
    path: '/confirmation',
    element: (
      <Layout>
        <Confirmation />
      </Layout>
    )
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/purchases',
    element: (
      <Layout>
        <Purchases />
      </Layout>
    )
  },
  {
    path: '*',
    element: <Landing />
  }
], {
  basename: '/Sistema_Entradas_CINEMAX'
});