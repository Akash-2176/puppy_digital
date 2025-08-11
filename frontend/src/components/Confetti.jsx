import React, { useEffect, useState } from 'react';
import { Sparkles, Star } from 'lucide-react';

const Confetti = ({ show, onComplete, amount }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (show) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 1000,
      }));

      setParticles(newParticles);

      const timer = setTimeout(() => {
        onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="confetti-overlay">
      <div className="confetti-modal">
        <div className="icon-glow">
          <Sparkles size={32} />
        </div>
        <h2>🎉 Congratulations!</h2>
        <p>Your coupon has been successfully redeemed</p>
        <div className="reward-amount">
          <p>Amount Redeemed</p>
          <strong>${amount}</strong>
        </div>
        <p className="note">Reward has been added to your wallet balance</p>
      </div>

      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.delay}ms`,
          }}
        >
          {Math.random() > 0.5 ? <Star size={12} /> : <Sparkles size={12} />}
        </div>
      ))}
    </div>
  );
};

export default Confetti;
