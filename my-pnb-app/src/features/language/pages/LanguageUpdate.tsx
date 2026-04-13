import React, { useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { withAuth } from '../../../hoc/withAuth';
import './LanguageUpdate.css';

/**
 * SOLID: Single Responsibility
 * This component handles the UI for updating the device language.
 */
const LanguageUpdate: React.FC = () => {
  const { 
    currentLanguage, 
    availableLanguages, 
    loading, 
    fetchCurrent, 
    fetchAll, 
    updateLang 
  } = useLanguage();

  const [selectedLang, setSelectedLang] = useState('');
  
  // TID from documentation
  const testTid = "38241108350403";

  useEffect(() => {
    fetchCurrent(testTid);
    fetchAll();
  }, []);

  const handleUpdate = async () => {
    if (!selectedLang) return;
    const response = await updateLang(testTid, selectedLang);
    if (response?.result === 'success') {
      alert("Language updated successfully!");
    }
  };

  return (
    <div className="lang-update-page">
      <h2 className="page-title">Language Update</h2>

      <div className="lang-card">
        <div className="form-grid">
          <div className="form-group">
            <label>VPA ID</label>
            <input type="text" value="3456789pabitra@pnb" disabled className="pnb-input-disabled" />
          </div>

          <div className="form-group">
            <label>Device Serial Number</label>
            <input type="text" value="9003567823456" disabled className="pnb-input-disabled" />
          </div>

          <div className="form-group">
            <label>Current Language</label>
            <input type="text" value={currentLanguage || 'Loading...'} disabled className="pnb-input-disabled" />
          </div>

          <div className="form-group">
            <label>Language Update</label>
            <select 
              className="pnb-select" 
              value={selectedLang} 
              onChange={(e) => setSelectedLang(e.target.value)}
            >
              <option value="">Select Language Update</option>
              {availableLanguages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-cancel" type="button">Cancel</button>
          <button 
            className="btn-update" 
            onClick={handleUpdate} 
            disabled={loading || !selectedLang}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(LanguageUpdate);