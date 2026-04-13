import React, { useEffect, useState } from 'react';
import { useQr } from '../hooks/useQr';
import './QrDetails.css';

/**
 * SOLID: Single Responsibility Principle
 * This component is responsible only for rendering the QR Poster UI.
 */
const QrDetails: React.FC = () => {
  const { qrImage, loading, convertToQR } = useQr();
  const [qrType, setQrType] = useState<'Static' | 'Dynamic'>('Static');

  useEffect(() => {
    // Initial load: Using the sample UPI string from your documentation
    const sampleQrString = "upi://pay?pa=9952785870m@pnb&pn=MYMUBI%20FOOD%20COURT&mc=5411";
    convertToQR(sampleQrString);
  }, []);

  return (
    <div className="qr-details-page">
      <h2 className="page-title">QR Details</h2>

      {/* Select Type Section */}
      <div className="pnb-card qr-selection-card">
        <p className="selection-label">Select The Type of QR</p>
        <div className="radio-group">
          <label className="radio-item">
            <input 
              type="radio" 
              name="qrType" 
              checked={qrType === 'Static'} 
              onChange={() => setQrType('Static')} 
            />
            <span>Static</span>
          </label>
          <label className="radio-item disabled">
            <input type="radio" name="qrType" disabled />
            <span>Dynamic</span>
          </label>
        </div>
      </div>

      {/* QR Poster Section */}
      <div className="qr-poster-container">
        <div className="qr-poster-card">
          <div className="poster-header">
            <img src="/pnb-logo.png" alt="PNB Logo" className="pnb-poster-logo" />
            <p className="poster-vpa">UPI ID : 9952785870m@pnb</p>
          </div>

          <div className="poster-body">
            <h3 className="merchant-title">MYMUBI FOOD COURT</h3>
            
            <div className="qr-display-box">
              {loading ? (
                <div className="qr-skeleton">Generating Secure QR...</div>
              ) : qrImage ? (
                <img 
                  src={`data:image/png;base64,${qrImage}`} 
                  alt="Merchant QR" 
                  className="generated-qr"
                />
              ) : (
                <div className="qr-error">Unable to load QR</div>
              )}
            </div>

            <p className="poster-vpa-footer">UPI ID : 9952785870m@pnb</p>
          </div>

          <div className="poster-footer">
            <button className="btn-download-qr" onClick={() => window.print()}>
              Download QR Code
            </button>
            
            <div className="upi-branding">
              <span>POWERED BY</span>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" 
                alt="UPI" 
                className="upi-logo" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrDetails;