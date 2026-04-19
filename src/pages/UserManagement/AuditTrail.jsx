import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Search, 
  Calendar, 
  Download, 
  ChevronDown, 
  ChevronLeft,
  ArrowLeft,
  User,
  MoreVertical,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../api/apiService';
import './AuditTrail.css';

/**
 * Audit Trail Component
 * High-fidelity implementation matched to Figma design.
 */
const AuditTrail = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Logic: Mock Data based on Figma
  const fetchAuditTrail = async () => {
    setLoading(true);
    setTimeout(() => {
      const mock = Array.from({ length: 15 }).map((_, i) => ({
        id: i + 1,
        fieldName: 'john_doe',
        username: 'john_doe',
        userId: 'EMP92198',
        adminName: ['Carson Darrin', 'Ashy Handgun', 'Larry Doe', 'Carson Darrin', 'Sara Soudan', 'Joseph William', 'Penjani Inyene', 'Omar Darobe'][i % 8],
        adminId: 'EMP92198',
        createdDate: '16.07.2025',
        updatedDate: '15.08.2025'
      }));
      setData(mock);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    fetchAuditTrail();
  }, []);

  return (
    <div className="audit-trail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Bank User Management</span>
        <ChevronRight size={14} className="mx-2" />
        <span className="active">Audit Trail</span>
      </div>

      <div className="page-header-row">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={24} />
        </button>
        <h2 className="title">Audit Trail</h2>
      </div>

      {/* Filter Bar */}
      <div className="filter-card">
        <div className="audit-grid">
          <div className="input-with-icon">
            <Search size={16} className="icon-grey mr-2" />
            <input type="text" placeholder="Search here" />
          </div>

          <div className="date-range-picker">
            <input type="text" placeholder="Start date" />
            <span className="separator">→</span>
            <input type="text" placeholder="End date" />
            <Calendar size={16} className="icon-grey ml-2" />
          </div>

          <div className="input-with-icon">
            <input type="text" placeholder="User Name" />
          </div>

          <button className="download-btn">
            <Download size={16} />
            Download Excel
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-container no-scrollbar">
        <div className="table-wrapper no-scrollbar">
          <table className="data-table">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Field Name <MoreVertical size={14} className="inline-icon" /></th>
                <th>Username <MoreVertical size={14} className="inline-icon" /></th>
                <th>User ID <MoreVertical size={14} className="inline-icon" /></th>
                <th>Admin Name <MoreVertical size={14} className="inline-icon" /></th>
                <th>Admin ID <MoreVertical size={14} className="inline-icon" /></th>
                <th>Created Date <MoreVertical size={14} className="inline-icon" /></th>
                <th>Updated Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.fieldName}</td>
                  <td>{row.username}</td>
                  <td>{row.userId}</td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar-small"><User size={14} /></div>
                      {row.adminName}
                    </div>
                  </td>
                  <td>{row.adminId}</td>
                  <td>{row.createdDate}</td>
                  <td>{row.updatedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <div className="page-info">
            Row per page 
            <select className="row-select"><option>10</option></select>
            Go to <input type="text" className="go-input" defaultValue="9" />
          </div>
          <div className="page-numbers">
            <button className="page-btn"><ChevronLeft size={14} /></button>
            <button className="page-btn">1</button>
            <span className="dots">...</span>
            <button className="page-btn">4</button>
            <button className="page-btn">5</button>
            <button className="page-btn selected">6</button>
            <button className="page-btn">7</button>
            <button className="page-btn">8</button>
            <span className="dots">...</span>
            <button className="page-btn">50</button>
            <button className="page-btn"><ChevronRightIcon size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;
