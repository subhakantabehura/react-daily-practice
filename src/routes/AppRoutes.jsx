import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Auth/Login';
import ProtectedRoute from '../components/ProtectedRoute';

/**
 * AppRoutes — Centralized Application Routing
 * ─────────────────────────────────────────────
 * All pages show "Coming Soon" inline.
 * Replace each route's element with actual component when ready.
 */

/* Inline Coming Soon placeholder */
const ComingSoon = ({ title }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: 'calc(100vh - 140px)', padding: '2rem',
  }}>
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.4rem', color: '#1a0536', fontWeight: 700, margin: '0 0 0.5rem' }}>
        {title}
      </h2>
      <p style={{ fontSize: '0.9rem', color: '#999', margin: 0 }}>
        Coming Soon
      </p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ── Protected Routes ── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>

            {/* Dashboard */}
            <Route path="/dashboard" element={<ComingSoon title="Dashboard" />} />

            {/* Bank User Management / User Management */}
            <Route path="/user-management/create-user"     element={<ComingSoon title="Create User" />} />
            <Route path="/user-management/create-cbc-user" element={<ComingSoon title="Create CBC User" />} />
            <Route path="/user-management/request"         element={<ComingSoon title="User Request" />} />
            <Route path="/user-management/list-report"     element={<ComingSoon title="User List Report" />} />

            {/* Audit Trail */}
            <Route path="/audit" element={<ComingSoon title="Audit Trail" />} />

            {/* Reports */}
            <Route path="/reports" element={<ComingSoon title="Reports" />} />

            {/* Wallet Adjustment */}
            <Route path="/wallet" element={<ComingSoon title="Wallet Adjustment" />} />

            {/* Catch-all → dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
