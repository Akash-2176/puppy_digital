import React, { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';

const RedeemButton = ({ couponCode, onSuccess }) => {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [progress, setProgress] = useState(0);
  const [redeemAmount] = useState(Math.floor(Math.random() * 500) + 50);

  const handleRedeem = () => {
    if (!couponCode || isRedeeming) return;
    setIsRedeeming(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsRedeeming(false);
            onSuccess(redeemAmount);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="card">
      <div className="section-header">
        <Gift size={48} />
        <h2>Ready to Redeem</h2>
        <p>{couponCode ? `Code: ${couponCode}` : 'Please enter a code first'}</p>
      </div>

      {isRedeeming && (
        <div className="progress-bar">
          <div className="fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      <button className="button" onClick={handleRedeem} disabled={!couponCode || isRedeeming}>
        {isRedeeming ? `Redeeming... ${progress}%` : 'Redeem Reward'}
      </button>

      {!isRedeeming && couponCode && (
        <div className="preview-box">
          <p>Estimated Reward</p>
          <strong>${redeemAmount}</strong>
        </div>
      )}
    </div>
  );
};

export default RedeemButton;
