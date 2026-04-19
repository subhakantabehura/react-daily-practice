import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Search, 
  Calendar, 
  Download, 
  ChevronDown, 
  ChevronLeft,
  MoreVertical,
  User,
  Info
} from 'lucide-react';
import apiService from '../../api/apiService';
import './UserListReport.css';

/**
 * User List Report Component
 * Similar to User Request but with an additional 'Details' column.
 */
const UserListReport = () => {
  const [searchType, setSearchType] = useState('date');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Logic: Future-ready API call
  const fetchReportData = async () => {
    setLoading(true);
    try {
      // Logic: Use apiService for future integration
      // const response = await apiService.get('/user-mgmt/user-list-report');
      // setUsers(response.data);
      
      // Use mock for visual matching
      setUsers([
        { id: 1, username: 'john_doe', empId: 'EMP92198', name: 'Carson Darrin', mobile: '+91 9238732872', email: 'johndoe@gmail.com' }
      ]);
    } catch (error) {
      console.error("Report fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [searchType]);

  return (
    <div className="user-report-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Bank User Management</span>
        <ChevronRight size={14} className="mx-2" />
        <span className="active">User List Report</span>
      </div>

      <div className="page-header-row">
        <h2 className="title">User List Report</h2>
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
            <div className="input-with-icon">
              <Search size={16} className="text-gray-400 mr-2" />
              <input type="text" placeholder="Search here" />
            </div>

            <div className="date-range-picker">
              <input type="text" placeholder="Start date" />
              <span className="separator">→</span>
              <input type="text" placeholder="End date" />
              <Calendar size={16} className="text-gray-400 ml-2" />
            </div>

            <div className="select-box">
              <select><option>User Type</option></select>
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

      {/* Report Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Username <MoreVertical size={14} className="inline-icon" /></th>
              <th>Employee ID <MoreVertical size={14} className="inline-icon" /></th>
              <th>Employee Name <MoreVertical size={14} className="inline-icon" /></th>
              <th>Mobile Number <MoreVertical size={14} className="inline-icon" /></th>
              <th>Email ID <MoreVertical size={14} className="inline-icon" /></th>
              <th>Expand</th>
              <th>Details</th>
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
                    <div className="user-avatar-small"><User size={14} /></div>
                    {user.name}
                  </div>
                </td>
                <td>{user.mobile}</td>
                <td>{user.email}</td>
                <td><ChevronDown size={18} className="expand-btn" /></td>
                <td><Info size={18} className="info-icon" /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination">
          <div className="page-info">
            Row per page 
            <select className="row-select"><option>1</option></select>
            Go to <input type="text" className="go-input" defaultValue="1" />
          </div>
          <div className="page-numbers">
            <button className="page-btn"><ChevronLeft size={14} /></button>
            <button className="page-btn selected">1</button>
            <button className="page-btn"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListReport;
