import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, ChevronDown } from 'lucide-react';
import './Header.css';

/**
 * Header Component
 * Implements the clean top navigation from the Figma design.
 */
const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('nsdl_access_token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle">
          {/* Using a custom icon structure for the figma "hamburger with dots" style */}
          <Menu size={22} />
        </button>
      </div>

      <div className="header-right">
        {/* Notification Icon with Badge */}
        <div className="icon-wrapper">
          <Bell size={20} strokeWidth={1.5} />
          <span className="badge">9</span>
        </div>

        {/* User Profile Trigger */}
        <div className="user-trigger" onClick={() => setShowDropdown(!showDropdown)}>
          <div className="user-avatar-small">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Stebin Ben" 
            />
          </div>
          <span className="user-name-text">Stebin Ben</span>
          <ChevronDown size={14} className="chevron-down" />

          {/* Profile Popover / Dropdown */}
          {showDropdown && (
            <div className="profile-popover">
              <ul className="popover-list">
                <li className="popover-item">Profile</li>
                <li className="popover-item">Change Password</li>
                <li className="popover-item logout-text" onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
