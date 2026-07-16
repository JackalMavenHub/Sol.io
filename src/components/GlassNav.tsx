import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlassNav() {
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Overview' },
    { path: '/dashboard', label: 'Terminal' },
    { path: '/sniper', label: 'Snipe' },
    { path: '/portfolio', label: 'Portfolio' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="clay-panel px-6 py-4 flex items-center justify-between rounded-full"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-clay-surface shadow-[inset_4px_4px_8px_rgba(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] flex items-center justify-center">
            <span className="font-bold text-clay-accent text-lg">S</span>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-clay-text">Sol.io</span>
        </Link>

        {/* Links with Framer Motion Pill Indicator */}
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
                className="relative px-6 py-2.5 text-sm font-bold transition-colors z-10 text-clay-muted hover:text-clay-text"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-clay-surface rounded-2xl shadow-[9px_9px_16px_rgba(163,177,198,0.4),-9px_-9px_16px_rgba(255,255,255,0.5)]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* CTA Button / Wallet */}
        <div className="hidden md:flex items-center z-10">
          <WalletMultiButton className="!bg-clay-surface !text-clay-text !rounded-2xl !font-bold !shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] active:!shadow-[inset_6px_6px_10px_rgba(163,177,198,0.5),inset_-6px_-6px_10px_rgba(255,255,255,0.8)] transition-all !py-2 !px-6" />
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden p-2 text-clay-muted hover:text-clay-text relative z-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 mt-6 p-6 clay-panel flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-5 py-4 rounded-2xl text-md font-bold transition-all ${
                  location.pathname === item.path 
                    ? 'text-clay-accent shadow-[inset_6px_6px_10px_rgba(163,177,198,0.5),inset_-6px_-6px_10px_rgba(255,255,255,0.8)]' 
                    : 'text-clay-muted shadow-[4px_4px_8px_rgba(163,177,198,0.4),-4px_-4px_8px_rgba(255,255,255,0.4)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-gray-300">
              <WalletMultiButton className="w-full !bg-clay-surface !text-clay-text !rounded-2xl !font-bold !shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] active:!shadow-[inset_6px_6px_10px_rgba(163,177,198,0.5),inset_-6px_-6px_10px_rgba(255,255,255,0.8)] transition-all !py-3 !justify-center" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
