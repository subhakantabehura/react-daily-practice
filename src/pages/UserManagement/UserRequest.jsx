import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Search, 
  Calendar, 
  Download, 
  ChevronDown, 
  ChevronLeft,
  MoreVertical,
  User
} from 'lucide-react';
import apiService from '../../api/apiService';
import './UserRequest.css';

/**
 * User Request Page
 * Precisely matched to the latest Figma reference.
 */
const UserRequest = () => {
  const [searchType, setSearchType] = useState('date');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Logic: Mock data matching names from Figma screenshot
  const fetchUserRequests = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        { id: 1, username: 'john_doe', empId: 'EMP92198', name: 'Carson Darrin', mobile: '+91 9238732872', email: 'johndoe@gmail.com' },
        { id: 2, username: 'john_doe', empId: 'EMP92198', name: 'Ashy Handgun', mobile: '+91 9238732872', email: 'johndoe@gmail.com' },
        { id: 3, username: 'john_doe', empId: 'EMP92198', name: 'Larry Doe', mobile: '+91 9238732872', email: 'johndoe@gmail.com' },
        { id: 4, username: 'john_doe', empId: 'EMP92198', name: 'Carson Darrin', mobile: '+91 9238732872', email: 'johndoe@gmail.com' },
        { id: 5, username: 'john_doe', empId: 'EMP92198', name: 'Sara Soudan', mobile: '+91 9238732872', email: 'johndoe@gmail.com' },
        { id: 6, username: 'john_doe', empId: 'EMP92198', name: 'Joseph William', mobile: '+91 9238732872', email: 'johndoe@gmail.com' },
        { id: 7, username: 'john_doe', empId: 'EMP92198', name: 'Penjani Inyene', mobile: '+91 9238732872', email: 'johndoe@gmail.com' },
        { id: 8, username: 'john_doe', empId: 'EMP92198', name: 'Omar Darobe', mobile: '+91 9238732872', email: 'johndoe@gmail.com' },
      ];
      setUsers(mockData);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    fetchUserRequests();
  }, [searchType]);

  return (
    <div className="user-request-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Bank User Management</span>
        <ChevronRight size={14} className="mx-2" />
        <span className="active">User Request</span>
      </div>

      <div className="page-header-row">
        <h2 className="title">User Request</h2>
      </div>

      {/* Filter Section */}
      <div className="filter-card">
        <div className="search-toggle-group">
          <label className="radio-label">
            <input 
              type="radio" 
              checked={searchType === 'date'} 
              onChange={() => setSearchType('date')}
            />
            Search by Date Range
          </label>
          <label className="radio-label">
            <input 
              type="radio" 
              checked={searchType === 'name'} 
              onChange={() => setSearchType('name')}
            />
            Search by User Name
          </label>
        </div>

        <div className="filter-controls-container">
          <div className="filter-controls-grid">
            <div className="input-with-icon search-input">
              <Search size={16} className="icon-grey" />
              <input type="text" placeholder="Search here" />
            </div>

            <div className="date-range-picker">
              <input type="text" placeholder="Start date" />
              <span className="separator">→</span>
              <input type="text" placeholder="End date" />
              <Calendar size={16} className="icon-grey" />
            </div>

            <div className="select-box">
              <select defaultValue="">
                <option value="" disabled>User Type</option>
                <option value="bank">Bank User</option>
                <option value="cbc">CBC</option>
                <option value="cbcm">CBC Maker</option>
                <option value="md">Master Distributor</option>
                <option value="dist">Distributor</option>
                <option value="agent">Agent</option>
              </select>
              <ChevronDown size={14} />
            </div>

            <div className="select-box">
              <select><option>Status</option></select>
              <ChevronDown size={14} />
            </div>
          </div>

          <button className="download-btn">
            <Download size={16} />
            Download Excel
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-container shadow-sm no-scrollbar">
        <div className="table-wrapper no-scrollbar">
          <table className="data-table">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Username <MoreVertical size={14} className="header-icon" /></th>
                <th>Employee ID <MoreVertical size={14} className="header-icon" /></th>
                <th>Employee Name <MoreVertical size={14} className="header-icon" /></th>
                <th>Mobile Number <MoreVertical size={14} className="header-icon" /></th>
                <th>Email ID <MoreVertical size={14} className="header-icon" /></th>
                <th>Expand</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.empId}</td>
                  <td>
                    <div className="user-cell">
                      <div className="avatar-circle">
                        <User size={14} />
                      </div>
                      {user.name}
                    </div>
                  </td>
                  <td className="mobile-col">{user.mobile}</td>
                  <td>{user.email}</td>
                  <td><ChevronDown size={18} className="expand-chevron" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination precisely matched to Page 6 view */}
        <div className="pagination-row">
          <div className="rows-per-page">
            Row per page 
            <select className="pagination-select"><option>10</option></select>
            Go to <input type="text" className="go-to-input" defaultValue="9" />
          </div>
          <div className="page-nav">
            <button className="nav-arrow"><ChevronLeft size={14} /></button>
            <button className="num-btn">1</button>
            <span className="pagination-dots">...</span>
            <button className="num-btn">4</button>
            <button className="num-btn">5</button>
            <button className="num-btn active-page">6</button>
            <button className="num-btn">7</button>
            <button className="num-btn">8</button>
            <span className="pagination-dots">...</span>
            <button className="num-btn">50</button>
            <button className="nav-arrow"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRequest;
