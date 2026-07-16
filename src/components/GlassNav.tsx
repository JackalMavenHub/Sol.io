import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../logo-rug.png';

export default function GlassNav() {
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(location.pathname);

  const navItems = [
    { path: '/', label: 'Overview' },
    { path: '/dashboard', label: 'Terminal' },
    { path: '#', label: 'Snipe' },
    { path: '#', label: 'Analytics' },
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

        {/* CTA Button */}
        <button 
          className="relative px-6 py-2 text-sm font-bold text-white bg-black/40 rounded-full border border-transparent overflow-hidden group hover:scale-105 active:scale-95 transition-all duration-300"
        >
          {/* Shifting Gradient Border simulation */}
          <div className="absolute inset-0 bg-gradient-to-r from-copper-orange via-solar-amber to-cosmic-blue opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-full" style={{ padding: '1px' }}>
            <div className="w-full h-full bg-black/60 rounded-full"></div>
          </div>
          <span className="relative z-10">Connect Wallet</span>
        </button>
      </div>
    </nav>
  );
}
