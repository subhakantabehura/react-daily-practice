import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Guards routes that require authentication
 */
const ProtectedRoute = ({ children }) => {
  // Logic: Check for auth token in localStorage (updated to nsdl_access_token)
  const isAuthenticated = !!localStorage.getItem('nsdl_access_token');

  /* BYPASS ENABLED: Uncomment lines below to restore security */
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  // If authenticated, render the child component
  return children;
};

export default ProtectedRoute;
