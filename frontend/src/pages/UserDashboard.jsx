import { useEffect, useState } from "react";
import api from "../api/axios";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import GalaxyCanvas from "../components/GalaxyCanvas";
import "./UserDashboard.css";

export default function UserDashboard() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [progress, setProgress] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/wallet");
      setWallet(res.data.wallet);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleRedeem = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setProgress(0);
    setShowCongrats(false);

    let val = 0;
    const interval = setInterval(() => {
      val += Math.floor(Math.random() * 8 + 4);
      if (val > 100) val = 100;
      setProgress(val);

      if (val >= 100) {
        clearInterval(interval);
        setShowCongrats(true);
        setTimeout(() => setShowCongrats(false), 6000);
      }
    }, 100);
  };

  if (loading) return <p>Loading wallet...</p>;
  if (!wallet) return <p>No wallet found</p>;

  return (
    <div className="dashboard">
      <GalaxyCanvas />
      <nav className="navbar glass">
        <div className="hamburger">☰</div>
        <div className="balance">💰 <strong>₹{wallet.walletBalance}</strong></div>
      </nav>

      <div className="main">
        <h3>Scan QR or Enter Coupon</h3>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="coupon-input"
        />
        <button onClick={handleRedeem} className="redeem-btn">
          Redeem
        </button>

        <div className="galactic-meter">
          <motion.div
            className="vortex neon-ring"
            animate={{ rotate: progress * 3.6 }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
          <motion.div className="progress-text" animate={{ opacity: 1 }}>
            {progress}%
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showCongrats && (
          <motion.div
            className="congrats-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Confetti />
            <motion.div
              className="glass popup"
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <h2 className="congrats-text">🌌 INTERSTELLAR WIN 🌌</h2>
              <p className="reward-amount">
                You’ve won ₹{Math.floor(Math.random() * 500) + 50}!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
