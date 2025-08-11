import React, { useState } from 'react';
import { Ticket, Type } from 'lucide-react';

const CouponInput = ({ onSubmit }) => {
  const [couponCode, setCouponCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!couponCode.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(couponCode);
    }, 1000);
  };

  return (
    <div className="card">
      <div className="section-header">
        <Ticket size={48} />
        <h2>Enter Coupon Code</h2>
        <p>Manually enter your coupon code</p>
      </div>

      <input
        type="text"
        placeholder="Enter coupon code..."
        value={couponCode}
        maxLength={20}
        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
        className="text-input"
      />

      <button
        onClick={handleSubmit}
        className="button"
        disabled={!couponCode.trim() || isSubmitting}
      >
        {isSubmitting ? 'Validating...' : 'Apply Coupon'}
      </button>

      <p className="helper-text">Coupon codes are case-insensitive</p>
    </div>
  );
};

export default CouponInput;
