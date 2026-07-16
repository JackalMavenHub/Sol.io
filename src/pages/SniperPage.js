import React, { useState } from 'react';
import { Target, Zap, Settings2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import InteractiveCard from '../components/InteractiveCard';
import WalletGate from '../components/WalletGate';

export default function SniperPage() {
  const [targetToken, setTargetToken] = useState('');
  const [amount, setAmount] = useState('5.0');
  const [slippage, setSlippage] = useState('1.0');
  const [priorityFee, setPriorityFee] = useState('0.005');
  const [antiMev] = useState(true);

  return (
    <WalletGate>
      <div className="relative bg-clay-surface pt-28 pb-12 px-6 max-w-4xl mx-auto z-10 text-clay-text flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-copper-orange/20 border border-copper-orange/30 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(224,122,95,0.3)]">
          <Target size={28} className="text-copper-orange" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Advanced Sniper</h1>
        <p className="text-clay-text/50 text-sm mt-2 max-w-md text-center">Configure ultra-low latency memory pool sniping parameters with built-in MEV protection.</p>
      </div>

      <InteractiveCard className="p-8">
        <form className="flex flex-col gap-8" onSubmit={(e) => {
          e.preventDefault();
          if (!targetToken || targetToken.trim() === '') {
            toast.error('Please enter a valid target token address.');
            return;
          }
          toast.success('Snipe initialized successfully.');
        }}>
          
          {/* Target Token */}
          <div className="form-group relative">
            <span className="label-text text-base">Target Token Address</span>
            <input 
              type="text" 
              className={`glass-input font-mono text-lg py-4 ${targetToken === '' ? 'border-white/10' : 'border-copper-orange/50'}`} 
              placeholder="Enter Solana mint address..." 
              value={targetToken}
              onChange={(e) => setTargetToken(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Amount */}
            <div className="form-group">
              <span className="label-text">Investment Amount (SOL)</span>
              <div className="flex flex-col gap-3">
                <input 
                  type="number" 
                  className="clay-input font-mono text-sm bg-white/5" 
                  step="0.1"
                  min="0.1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <input 
                  type="range" 
                  min="0.1" max="50" step="0.1" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full h-1 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-white mt-2"
                />
              </div>
            </div>

            {/* Slippage */}
            <div className="form-group">
              <span className="label-text flex justify-between">
                <span>Slippage Tolerance</span>
                <span className="text-copper-orange font-mono">{slippage}%</span>
              </span>
              <div className="flex gap-2 mt-2">
                {['0.5', '1.0', '5.0', '10.0'].map((val) => (
                  <button 
                    key={val}
                    type="button"
                    onClick={() => setSlippage(val)}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold border transition-all whitespace-nowrap ${
                      slippage === val 
                        ? 'bg-copper-orange/20 border-copper-orange text-copper-orange' 
                        : 'bg-white/5 border-white/10 text-clay-text/50 hover:bg-white/30 hover:text-clay-text'
                    }`}
                  >
                    {val}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-clay-gray-300/5 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Priority Fee */}
            <div className="form-group">
              <span className="label-text flex justify-between">
                <span className="flex items-center gap-2"><Zap size={14} className="text-solar-amber" /> Priority Fee (Jito Tip)</span>
                <span className="font-mono">{priorityFee} SOL</span>
              </span>
              <input 
                type="range" 
                min="0.001" max="0.1" step="0.001" 
                value={priorityFee}
                onChange={(e) => setPriorityFee(e.target.value)}
                className="w-full h-2 mt-4 bg-black/50 rounded-full appearance-none cursor-pointer accent-solar-amber"
              />
              <div className="flex justify-between text-xs text-clay-text/40 mt-2 font-mono">
                <span>Standard</span>
                <span>Fast</span>
                <span>Turbo</span>
              </div>
            </div>

            {/* Execution Toggles */}
            <div className="form-group">
              <span className="label-text flex items-center gap-2"><Settings2 size={14} /> Execution Settings</span>
              <div className="mt-2 flex flex-col gap-3">
                <label 
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setAntiMev(!antiMev);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-6 rounded-full p-1 transition-colors ${antiMev ? 'bg-copper-orange' : 'bg-black/50'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${antiMev ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                    <span className="text-sm font-medium">Anti-MEV Protection</span>
                  </div>
                  <AlertTriangle size={14} className={antiMev ? 'text-copper-orange' : 'text-clay-text/20'} />
                </label>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button type="submit" className="clay-btn clay-btn-primary w-full py-4 mt-6">
            Initialize Snipe
          </button>
        </form>
      </InteractiveCard>
    </div>
    </WalletGate>
  );
}
