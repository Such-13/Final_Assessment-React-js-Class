import React, { useEffect } from 'react';
import { withAuth } from '../../../hoc/withAuth';
import { useDashboard } from '../hooks/useDashboard';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const {
    merchants,
    selectedVpa,
    selectedMerchant,
    loading,
    error,
    fetchMerchantData,
    changeVpa,
  } = useDashboard();

  useEffect(() => {
    fetchMerchantData();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h2>Dashboard</h2>
        <div className="filter-dropdown">
          {merchants.length > 1 ? (
            <select
              value={selectedVpa || ''}
              onChange={(e) => changeVpa(e.target.value)}
            >
              {merchants.map((m) => (
                <option key={m.vpa_id} value={m.vpa_id}>
                  {m.vpa_id}
                </option>
              ))}
            </select>
          ) : (
            <select><option>Today</option></select>
          )}
        </div>
      </div>

      {/* VPA ID */}
      <div className="vpa-info">
        VPA ID : <strong>
          {loading ? 'Loading...' : selectedMerchant?.vpa_id || 'N/A'}
        </strong>
      </div>

      {/* Error */}
      {error && (
        <div style={{ color: 'red', marginBottom: 16, fontSize: 13 }}>
          ⚠️ {error}
        </div>
      )}

      {/* Stats — matching your preferred design */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="icon-box maroon">⇅</div>
          <div className="stat-details">
            <p>Total No Of Transaction</p>
            <h3>{loading ? '...' : selectedMerchant?.merchant_name || 'N/A'}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-box maroon">₹</div>
          <div className="stat-details">
            <p>Total Amount</p>
            <h3>{loading ? '...' : selectedMerchant?.merchant_account_no || 'N/A'}</h3>
          </div>
        </div>
      </div>

      {/* Extra merchant info */}
      {selectedMerchant && !loading && (
        <div className="stats-grid" style={{ marginTop: 20 }}>
          <div className="stat-card">
            <div className="icon-box maroon">📍</div>
            <div className="stat-details">
              <p>Device Status</p>
              <h3 style={{
                fontSize: 15,
                color: selectedMerchant.device_status === 'ACTIVE'
                  ? '#16a34a' : '#dc2626'
              }}>
                {selectedMerchant.device_status || 'N/A'}
              </h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon-box maroon">📱</div>
            <div className="stat-details">
              <p>Mobile</p>
              <h3 style={{ fontSize: 15 }}>
                {selectedMerchant.merchant_mobile || 'N/A'}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(Dashboard);