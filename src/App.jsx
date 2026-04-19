import React from 'react';
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';

/**
 * Main App Component
 * Root entry point for React application
 */
function App() {
  return (
    // React.StrictMode for catching potential problems in development
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
  );
}

export default App;
