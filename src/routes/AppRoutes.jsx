import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import UserRequest from '../pages/UserManagement/UserRequest';
import UserListReport from '../pages/UserManagement/UserListReport';
import AuditTrail from '../pages/UserManagement/AuditTrail';
import Login from '../pages/Auth/Login';
import ProtectedRoute from '../components/ProtectedRoute';

/**
 * AppRoutes Component
 * Centralizing all application routes
 */
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes - Wrapped in Layout and Guard */}
        <Route 
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Bank User Management Routes */}
          <Route path="/user-management/request" element={<UserRequest />} />
          <Route path="/user-management/list-report" element={<UserListReport />} />
          
          <Route path="/audit" element={<AuditTrail />} />
          <Route path="/reports" element={<div className="p-4">Reports Page (Coming Soon)</div>} />
          <Route path="/wallet" element={<div className="p-4">Wallet Adjustment Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
