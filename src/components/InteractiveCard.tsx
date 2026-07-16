import React from 'react';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  disableEntryAnimation?: boolean;
}

export default function InteractiveCard({ children, className = '' }: InteractiveCardProps) {
  return (
    <div
      className={`glass-panel-2 p-6 transition-all duration-300 hover:border-t-white/20 hover:border-l-white/20 hover:scale-[1.02] ${className}`}
    >
      {/* Subtle linear gradient glow on hover inside the card */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Inner Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
