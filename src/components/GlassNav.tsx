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
    { path: '/analytics', label: 'Analytics' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#050505] border border-[#1a1a1a] px-6 py-4 flex items-center justify-between rounded-full shadow-2xl"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 relative z-10">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span className="font-bold text-black text-sm">S</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-white">Sol.io</span>
        </Link>

        {/* Links with Framer Motion Pill Indicator */}
        <div 
          className="hidden md:flex items-center gap-1 relative"
          onMouseLeave={() => setHoveredPath(location.pathname)}
        >
          {navItems.map((item) => {
            const isActive = hoveredPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setHoveredPath(item.path)}
                className="relative px-5 py-2 text-sm font-medium transition-colors z-10 text-white/70 hover:text-white"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#1a1a1a] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* CTA Button / Wallet */}
        <div className="hidden md:flex items-center z-10">
          <WalletMultiButton className="!bg-white !text-black !rounded-full hover:!bg-neutral-200 transition-colors !py-2 !px-6 !text-sm !font-semibold" />
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden p-2 text-white/70 hover:text-white relative z-10"
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
            className="md:hidden absolute top-full left-0 right-0 mt-4 p-4 bg-[#0a0a0a] border border-[#1a1a1a] flex flex-col gap-2 rounded-2xl shadow-2xl"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === item.path ? 'bg-[#1a1a1a] text-white' : 'text-white/60 hover:bg-[#111] hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-[#1a1a1a]">
              <WalletMultiButton className="w-full !bg-white !text-black !rounded-xl hover:!bg-neutral-200 transition-colors !py-3 !justify-center !text-sm !font-semibold" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
