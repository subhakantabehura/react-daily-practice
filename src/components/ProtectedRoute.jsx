import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute Component (React Router v6 Outlet Pattern)
 * ─────────────────────────────────────────────────────────
 * Acts as a layout-level guard. If the user is NOT authenticated,
 * redirects to /login. Otherwise, renders the child routes via <Outlet />.
 *
 * Usage in AppRoutes:
 *   <Route element={<ProtectedRoute />}>
 *     <Route element={<MainLayout />}>
 *       <Route path="/dashboard" element={<Dashboard />} />
 *     </Route>
 *   </Route>
 */
const ProtectedRoute = () => {
  // Check if a valid access token exists in localStorage
  const token = localStorage.getItem('nsdl_access_token');
  const isAuthenticated = !!token && token !== 'undefined' && token !== 'null';

  if (!isAuthenticated) {
    // Redirect to login, replacing history so user can't go back
    return <Navigate to="/login" replace />;
  }

  // Render child routes (the layout + page components)
  return <Outlet />;
};

export default ProtectedRoute;
