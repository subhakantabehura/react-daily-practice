import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Gauge,
  Users,
  ClipboardList,
  BarChart3,
  Wallet,
  ChevronDown,
  UserPlus,
  FileCog
} from 'lucide-react';
import logo from '../assets/images/logo.png';
import './Sidebar.css';

/**
 * Role → Menu Configuration
 * ──────────────────────────────────────────────────────────
 * Each role has its own explicit menu list.
 * No filtering needed — just pick the right config by roleName.
 *
 * Roles:
 *   ROLE_SUPER_ADMIN  → Bank User Mgmt, Audit Trail, Reports, Wallet
 *   ROLE_UAM_MAKER    → Bank User Mgmt (+Create User), Audit Trail, Reports, Wallet
 *   ROLE_UAM_CHECKER  → Bank User Mgmt, Audit Trail, Reports, Wallet
 *   ROLE_OPS_MAKER    → User Mgmt (+Create CBC User), Audit Trail
 *   ROLE_OPS_CHECKER  → User Mgmt, Audit Trail
 */

/* Icons are declared outside to avoid re-creating on render */
const icons = {
  dashboard: <Gauge size={18} />,
  users:     <Users size={18} />,
  audit:     <ClipboardList size={18} />,
  reports:   <BarChart3 size={18} />,
  wallet:    <Wallet size={18} />,
  userPlus:  <UserPlus size={16} />,
  fileCog:   <FileCog size={16} />,
};

const MENU_CONFIG = {
  /* ── SUPER ADMIN ────────────────────────────── */
  ROLE_SUPER_ADMIN: [
    {
      name: 'Dashboard',
      icon: icons.dashboard,
      path: '/dashboard',
    },
    {
      name: 'Bank User Management',
      icon: icons.users,
      submenu: [
        { name: 'User Request',    path: '/user-management/request' },
        { name: 'User List Report',path: '/user-management/list-report' },
      ],
    },
    { name: 'Audit Trail',      icon: icons.audit,   path: '/audit'    },
    { name: 'Reports',          icon: icons.reports,  path: '/reports'  },
    { name: 'Wallet Adjustment',icon: icons.wallet,   path: '/wallet'   },
  ],

  /* ── UAM MAKER ──────────────────────────────── */
  ROLE_UAM_MAKER: [
    {
      name: 'Dashboard',
      icon: icons.dashboard,
      path: '/dashboard',
    },
    {
      name: 'Bank User Management',
      icon: icons.users,
      submenu: [
        { name: 'Create User',     path: '/user-management/create-user',  icon: icons.userPlus },
        { name: 'User Request',    path: '/user-management/request' },
        { name: 'User List Report',path: '/user-management/list-report' },
      ],
    },
    { name: 'Audit Trail',      icon: icons.audit,   path: '/audit'    },
    { name: 'Reports',          icon: icons.reports,  path: '/reports'  },
    { name: 'Wallet Adjustment',icon: icons.wallet,   path: '/wallet'   },
  ],

  /* ── UAM CHECKER ────────────────────────────── */
  ROLE_UAM_CHECKER: [
    {
      name: 'Dashboard',
      icon: icons.dashboard,
      path: '/dashboard',
    },
    {
      name: 'Bank User Management',
      icon: icons.users,
      submenu: [
        { name: 'User Request',    path: '/user-management/request' },
        { name: 'User List Report',path: '/user-management/list-report' },
      ],
    },
    { name: 'Audit Trail',      icon: icons.audit,   path: '/audit'    },
    { name: 'Reports',          icon: icons.reports,  path: '/reports'  },
    { name: 'Wallet Adjustment',icon: icons.wallet,   path: '/wallet'   },
  ],

  /* ── OPS MAKER ──────────────────────────────── */
  ROLE_OPS_MAKER: [
    {
      name: 'Dashboard',
      icon: icons.dashboard,
      path: '/dashboard',
    },
    {
      name: 'User Management',
      icon: icons.users,
      submenu: [
        { name: 'Create CBC User', path: '/user-management/create-cbc-user', icon: icons.fileCog },
        { name: 'User Request',    path: '/user-management/request' },
        { name: 'User List Report',path: '/user-management/list-report' },
      ],
    },
    { name: 'Audit Trail', icon: icons.audit, path: '/audit' },
  ],

  /* ── OPS CHECKER ────────────────────────────── */
  ROLE_OPS_CHECKER: [
    {
      name: 'Dashboard',
      icon: icons.dashboard,
      path: '/dashboard',
    },
    {
      name: 'User Management',
      icon: icons.users,
      submenu: [
        { name: 'User Request',    path: '/user-management/request' },
        { name: 'User List Report',path: '/user-management/list-report' },
      ],
    },
    { name: 'Audit Trail', icon: icons.audit, path: '/audit' },
  ],
};



/* ─────────────────────────────────────────────────────────
   Sidebar Component
───────────────────────────────────────────────────────── */
const Sidebar = () => {

  /* Read user from localStorage */
  const getUserData = () => {
    const raw = localStorage.getItem('nsdl_user');
    if (!raw || raw === 'undefined' || raw === 'null') return {};
    try { return JSON.parse(raw); }
    catch { return {}; }
  };

  const user     = getUserData();
  const roleName = user.roleName || '';

  /* Pick the correct menu for this role (fallback = empty) */
  const menuItems = MENU_CONFIG[roleName] || [];

  /* Track which submenu group is open — submenus start closed by default */
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (name) =>
    setOpenSubmenu(prev => (prev === name ? null : name));



  return (
    <aside className="sidebar">

      {/* ── Brand Logo ── */}
      <div className="sidebar-brand">
        <div className="logo-container">
          <img src={logo} alt="NSDL Payments Bank" className="brand-logo-img" />
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => {
            const hasSubmenu  = Array.isArray(item.submenu);
            const isOpen      = openSubmenu === item.name;
            const isDashboard = item.name === 'Dashboard';

            return (
              <li key={item.name} className="nav-item">

                {hasSubmenu ? (
                  /* ── Submenu parent header ── */
                  <div
                    className={`nav-link-header ${isOpen ? 'active' : ''}`}
                    onClick={() => toggleSubmenu(item.name)}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-name">{item.name}</span>
                    <ChevronDown
                      size={14}
                      className={`submenu-arrow ${isOpen ? 'rotated' : ''}`}
                    />
                  </div>
                ) : (
                  /* ── Regular nav link ── */
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-name">{item.name}</span>
                  </NavLink>
                )}

                {/* ── Submenu children ── */}
                {hasSubmenu && isOpen && (
                  <ul className="submenu-list">
                    {item.submenu.map((sub) => (
                      <li key={sub.name} className="submenu-item">
                        <NavLink
                          to={sub.path}
                          className={({ isActive }) =>
                            isActive ? 'submenu-link active' : 'submenu-link'
                          }
                        >
                          {sub.icon && (
                            <span className="submenu-icon">{sub.icon}</span>
                          )}
                          {sub.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}

                {/* "Widgets" label after Dashboard */}
                {isDashboard && (
                  <div className="nav-section-label">Widgets</div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>



    </aside>
  );
};

export default Sidebar;
