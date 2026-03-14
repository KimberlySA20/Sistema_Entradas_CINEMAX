import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { Toaster } from 'sonner';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BookingProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </BookingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
