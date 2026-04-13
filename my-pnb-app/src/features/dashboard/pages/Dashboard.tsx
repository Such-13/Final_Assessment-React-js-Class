import React from 'react';
import { withAuth } from '../../../hoc/withAuth';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h2>Dashboard</h2>
        <div className="filter-dropdown">
          <select><option>Today</option></select>
        </div>
      </div>

      <div className="vpa-info">
        VPA ID : <strong>Pabitra.hota@pnb</strong>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="icon-box maroon">⇅</div>
          <div className="stat-details">
            <p>Total No Of Transaction</p>
            <h3>20.7K</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-box maroon">₹</div>
          <div className="stat-details">
            <p>Total Amount</p>
            <h3>76,000 cr</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);