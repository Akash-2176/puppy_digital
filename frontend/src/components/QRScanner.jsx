import React, { useState } from 'react';
import { Camera, QrCode } from 'lucide-react';

const QRScanner = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScanClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onScan('PUPPY-2024-REDEEM-12345');
    }, 3000);
  };

  return (
    <div className="card">
      <div className="section-header">
        <QrCode size={48} />
        <h2>QR Code Scanner</h2>
        <p>Scan your coupon QR code to redeem rewards</p>
      </div>

      <div className="scanner-area">
        {isScanning ? (
          <div className="scanning">
            <div className="spinner" />
            <p>Scanning...</p>
          </div>
        ) : (
          <div className="scanner-placeholder">
            <Camera size={48} />
            <p>Position QR code within frame</p>
          </div>
        )}
      </div>

      <button className="button" onClick={handleScanClick} disabled={isScanning}>
        {isScanning ? 'Scanning QR Code...' : 'Open Camera'}
      </button>
    </div>
  );
};

export default QRScanner;
