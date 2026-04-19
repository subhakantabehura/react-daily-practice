import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';

/**
 * Main Layout Component
 * Wraps all authenticated pages with Sidebar and Header
 */
const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* Sidebar - Fixed on the left */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="content-area">
        <Header />
        
        {/* Dynamic page content injected here via Outlet */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
