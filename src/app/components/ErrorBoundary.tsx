import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
              <h2 className="text-2xl font-bold text-white mb-4">Página no encontrada</h2>
              <p className="text-gray-400 mb-8">
                Lo sentimos, no pudimos encontrar la página que buscas.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => window.location.href = '/Sistema_Entradas_CINEMAX/'}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Ir al inicio
              </button>
              
              <button
                onClick={() => window.history.back()}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Volver atrás
              </button>
            </div>

            {this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-gray-500 cursor-pointer hover:text-gray-400">
                  Ver detalles del error
                </summary>
                <pre className="mt-2 p-4 bg-gray-900 rounded text-xs text-gray-400 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
