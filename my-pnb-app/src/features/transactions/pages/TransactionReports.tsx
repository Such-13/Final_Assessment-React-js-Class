import React, { useEffect, useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { Transaction } from '../transactionsSlice';
import { Download, Search } from 'lucide-react';
import './TransactionReports.css';

const TransactionReports: React.FC = () => {
  const { data, loading, getReport } = useTransactions();
  const [filter, setFilter] = useState('Today');

  useEffect(() => {
    // API Call using the parameters from your documentation
    const today = new Date().toLocaleDateString('en-GB'); // Formats to DD/MM/YYYY
    getReport(today, today, "8959423523m@pnbupi");
  }, []);

  return (
    <div className="reports-page">
      <h2 className="page-title">Transaction Reports</h2>

      <div className="filter-section pnb-card">
        <p className="section-label">Select a Report Filter</p>
        <div className="radio-group">
          <label><input type="radio" name="f" checked={filter === 'Today'} onChange={() => setFilter('Today')} /> Today</label>
          <label><input type="radio" name="f" checked={filter === 'Monthly'} onChange={() => setFilter('Monthly')} /> Monthly</label>
          <label><input type="radio" name="f" checked={filter === 'Custom'} onChange={() => setFilter('Custom')} /> Custom Range</label>
        </div>
      </div>

      <div className="action-bar">
        <div className="search-container">
          <Search size={16} color="#999" />
          <input type="text" placeholder="Search here..." />
        </div>
        <button className="pnb-btn-download">
          <Download size={16} /> Download
        </button>
      </div>

      <div className="table-card">
        <table className="pnb-data-table">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Transaction ID</th>
              <th>RRN Number</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center">Loading transactions...</td></tr>
            ) : data.length > 0 ? (
              data.map((item: Transaction, index: number) => (
                <tr key={item.Transaction_Id}>
                  <td>{index + 1}</td>
                  <td>{item.Transaction_Id}</td>
                  <td>{item.Account_Number}</td>
                  <td>₹{item.Transaction_Amount}</td>
                  <td>{item["Date_&_Time"] || 'N/A'}</td>
                  <td><span className="badge-success">Received</span></td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={6} className="text-center">No transactions found for today.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionReports;