import React, { useState } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import QRScanner from '../components/QRScanner';
import CouponInput from '../components/CouponInput';
import RedeemButton from '../components/RedeemButton';
import Confetti from '../components/Confetti';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState(0);

  const handleQRScan = (code) => {
    setCouponCode(code);
    alert(`QR Code Scanned! Coupon code: ${code}`);
  };

  const handleCouponSubmit = (code) => {
    setCouponCode(code);
    alert(`Coupon Applied: ${code}`);
  };

  const handleRedeemSuccess = (amount) => {
    setRedeemAmount(amount);
    setShowConfetti(true);
    alert(`Reward Redeemed! $${amount} added to your wallet`);
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
    setCouponCode('');
  };

  if (isLoading) {
    return <Loader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="main-content">
        <section className="header-block fade-in">
          <h1 className="heading glow-text">Redeem Your Rewards</h1>
          <p className="subtext">
            Scan QR codes or enter coupon codes to unlock amazing rewards and earn digital currency
          </p>
        </section>

        <div className="fade-in delay-1">
          <QRScanner onScan={handleQRScan} />
        </div>

        <div className="divider fade-in delay-2">
          <div className="line" />
          <span className="or-text">OR</span>
          <div className="line" />
        </div>

        <div className="fade-in delay-3">
          <CouponInput onSubmit={handleCouponSubmit} />
        </div>

        <div className="fade-in delay-4">
          <RedeemButton couponCode={couponCode} onSuccess={handleRedeemSuccess} />
        </div>

        <footer className="footer-info fade-in delay-5">
          <p>🔒 Secure redemption process</p>
          <p>💎 Instant rewards to your wallet</p>
        </footer>
      </main>

      <Confetti
        show={showConfetti}
        amount={redeemAmount}
        onComplete={handleConfettiComplete}
      />
    </div>
  );
};

export default Index;
