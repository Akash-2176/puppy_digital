import React, { useState } from 'react';
import { Menu, Coins } from 'lucide-react';

const Navbar = () => {
  const [walletBalance] = useState(1250.50);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Left: Hamburger */}
        <button className="icon-button">
          <Menu size={24} />
        </button>

        {/* Center: Logo */}
        <div className="logo-group">
          <div className="logo-circle">P</div>
          <span className="logo-text">Puppy</span>
        </div>

        {/* Right: Wallet */}
        <div className="wallet-balance">
          <Coins size={18} />
          <span>${walletBalance.toFixed(2)}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
