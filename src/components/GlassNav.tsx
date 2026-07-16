import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Menu, X } from 'lucide-react';
import logo from '../logo-rug.png';

export default function GlassNav() {
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Overview' },
    { path: '/dashboard', label: 'Terminal' },
    { path: '/sniper', label: 'Snipe' },
    { path: '/analytics', label: 'Analytics' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <div className="glass-panel-2 px-6 py-4 flex items-center justify-between rounded-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 relative z-10">
          <img src={logo} alt="Sol.io" className="w-8 h-8 rounded-full border border-white/20 shadow-lg" />
          <span className="font-bold text-lg tracking-wide text-white">Sol.io</span>
        </Link>

        {/* Links with Pill Indicator */}
        <div 
          className="hidden md:flex items-center gap-2 relative"
          onMouseLeave={() => setHoveredPath(location.pathname)}
        >
          {navItems.map((item) => {
            const isActive = hoveredPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setHoveredPath(item.path)}
                className={`relative px-5 py-2 text-sm font-medium transition-colors z-10 ${
                  isActive ? 'text-white bg-white/10 rounded-full border border-white/5' : 'text-white/60 hover:text-white/80'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* CTA Button / Wallet */}
        <div className="hidden md:flex items-center">
          <WalletMultiButton className="!bg-black/40 !rounded-full !border !border-white/10 hover:!bg-white/10 transition-colors !py-2 !px-6 !text-sm !font-bold" />
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-4 bg-black/90 backdrop-blur-xl border-y border-white/10 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10">
            <WalletMultiButton className="w-full !bg-white/5 !rounded-lg !border !border-white/10 hover:!bg-white/10 transition-colors !py-3 !justify-center !text-sm !font-bold" />
          </div>
        </div>
      )}
    </nav>
  );
}
