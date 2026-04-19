import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Gauge, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Wallet,
  ChevronDown
} from 'lucide-react';
import logo from '../assets/images/logo.png';
import './Sidebar.css';

/**
 * Sidebar Component
 * Perfectly matched to the horizontal-logo Figma screenshot.
 */
const Sidebar = () => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState('Bank User Management');

  const menuItems = [
    { name: 'Dashboard', icon: <Gauge size={18} />, path: '/' },
    { 
      name: 'Bank User Management', 
      icon: <Users size={18} />, 
      path: '#',
      submenu: [
        { name: 'User Request', path: '/user-management/request' },
        { name: 'User List Report', path: '/user-management/list-report' },
      ]
    },
    { name: 'Audit Trail', icon: <ClipboardList size={18} />, path: '/audit' },
    { 
      name: 'Reports', 
      icon: <BarChart3 size={18} />, 
      path: '#',
      submenu: [
        { name: 'Transaction Report', path: '/reports/transactions' }
      ]
    },
    { name: 'Wallet Adjustment', icon: <Wallet size={18} />, path: '/wallet' },
  ];

  const toggleSubmenu = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <aside className="sidebar">
      {/* Brand Section: Horizontal Logo precisely as shown */}
      <div className="sidebar-brand">
        <div className="logo-container">
          <img src={logo} alt="NSDL Payments Bank" className="brand-logo-img" />
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => {
            const isOpen = openSubmenu === item.name;
            const isHeader = !!item.submenu;
            const isDashboard = item.name === 'Dashboard';
            
            return (
              <li key={item.name} className="nav-item">
                {isHeader ? (
                  <div 
                    className={`nav-link-header ${isOpen ? 'active' : ''}`}
                    onClick={() => toggleSubmenu(item.name)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-name">{item.name}</span>
                    <ChevronDown size={14} className={`submenu-arrow ${isOpen ? 'rotated' : ''}`} />
                  </div>
                ) : (
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-name">{item.name}</span>
                  </NavLink>
                )}

                {item.submenu && isOpen && (
                  <ul className="submenu-list">
                    {item.submenu.map((sub) => (
                      <li key={sub.name} className="submenu-item">
                        <NavLink 
                          to={sub.path}
                          className={({ isActive }) => isActive ? 'submenu-link active' : 'submenu-link'}
                        >
                          {sub.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
                
                {/* Section Header: Widgets */}
                {isDashboard && <div className="nav-section-label">Widgets</div>}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
