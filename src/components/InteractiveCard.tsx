import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  disableEntryAnimation?: boolean;
}

export default function InteractiveCard({ children, className = '', delay = 0, disableEntryAnimation = false }: InteractiveCardProps) {
  return (
    <motion.div
      initial={disableEntryAnimation ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.01 }}
      className={`minimal-panel p-6 ${className}`}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
