import React from 'react';
import './Dashboard.css';

/**
 * Dashboard Component
 * Clean, centered welcome view as per Figma specification
 */
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        {/* Main Title: Identical to the Figma screenshot */}
        <h1 className="welcome-text">Welcome to NSDL</h1>
        
        {/* Sub-tagline: Centralized branding message */}
        <p className="tagline-text">Banking made easy - JUST IN A JIFFY</p>
      </div>
    </div>
  );
};

export default Dashboard;
