import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { ShieldAlert } from 'lucide-react';

export default function WalletGate({ children }) {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <div className="relative min-h-screen pt-28 pb-12 px-6 max-w-7xl mx-auto z-10 flex flex-col items-center justify-center">
        {/* Blurry, un-interactive background representation */}
        <div className="absolute inset-0 z-0 opacity-20 blur-sm pointer-events-none overflow-hidden">
          {children}
        </div>
        
        {/* Foreground Message */}
        <div className="relative z-10 p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 text-center flex flex-col items-center max-w-md shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-copper-orange/20 border border-copper-orange/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(224,122,95,0.3)]">
            <ShieldAlert size={28} className="text-copper-orange" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Wallet Disconnected</h2>
          <p className="text-white/60 mb-6 text-sm leading-relaxed">
            Please connect your Solana wallet using the navigation bar above to access this interface and execute transactions.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
