import React, { useState } from 'react';
import { Activity, Zap, Shield, ChevronRight } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import WalletGate from '../components/WalletGate';

const mockData = [
  { id: 1, action: 'BUY', token: 'PEPE', amount: '1.5 SOL', time: '10:42:15', status: 'Success' },
  { id: 2, action: 'SELL', token: 'WIF', amount: '0.8 SOL', time: '10:15:33', status: 'Success' },
  { id: 3, action: 'SCAN', token: 'New LP', amount: '--', time: '09:30:11', status: 'Active' },
  { id: 4, action: 'BUY', token: 'BONK', amount: '5.0 SOL', time: '08:12:05', status: 'Failed' },
  { id: 5, action: 'SELL', token: 'BOME', amount: '12.4 SOL', time: '07:45:59', status: 'Success' },
];

export default function Dashboard() {
  const [targetAddress, setTargetAddress] = useState('');
  const [snipeAmount, setSnipeAmount] = useState('1.50');

  return (
    <WalletGate>
      <div className="relative min-h-screen pt-28 pb-12 px-6 max-w-7xl mx-auto z-10 text-white">
      <div className="w-full flex flex-col gap-6">
        {/* Header / Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <InteractiveCard className="h-full flex flex-col justify-center">
              <span className="label-text flex items-center gap-2"><Activity size={14} className="text-white"/> Total PnL</span>
              <div className="text-4xl font-bold tracking-tight text-white mt-1">+42.50 <span className="text-xl text-minimal-muted">SOL</span></div>
              <div className="text-sm text-minimal-muted mt-2">+12% this week</div>
            </InteractiveCard>
          </div>

          <div>
            <InteractiveCard className="h-full flex flex-col justify-center">
              <span className="label-text flex items-center gap-2"><Zap size={14} className="text-white"/> Active Snipes</span>
              <div className="text-4xl font-bold tracking-tight text-white mt-1">3 <span className="text-xl text-minimal-muted">Bots</span></div>
              <div className="text-sm text-minimal-muted mt-2">Monitoring 4 liquidity pools</div>
            </InteractiveCard>
          </div>

          <div>
            <InteractiveCard className="h-full flex flex-col justify-center">
              <span className="label-text flex items-center gap-2"><Shield size={14} className="text-white"/> Win Rate</span>
              <div className="text-4xl font-bold tracking-tight text-white mt-1">84.2 <span className="text-xl text-minimal-muted">%</span></div>
              <div className="text-sm text-minimal-muted mt-2">Across 142 total trades</div>
            </InteractiveCard>
          </div>
        </div>

        {/* Main Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          
          {/* Left: Control Deck */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <InteractiveCard className="flex-1">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                Quick Execute
              </h2>
              
              <div className="flex flex-col gap-5">
                <div className="form-group">
                  <span className="label-text">Target Contract Address</span>
                  <input 
                    type="text" 
                    id="targetAddress"
                    name="targetAddress"
                    className="minimal-input font-mono text-sm" 
                    placeholder="Paste Solana address..." 
                    value={targetAddress}
                    onChange={(e) => setTargetAddress(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <span className="label-text flex justify-between">
                    <span>Amount (SOL)</span>
                    <span className="text-white">{snipeAmount} SOL</span>
                  </span>
                  <div className="flex flex-col gap-2 mt-2">
                    <input 
                      type="number" 
                      id="snipeAmountNumber"
                      name="snipeAmountNumber"
                      className="minimal-input font-mono text-sm w-full bg-black" 
                      placeholder="0.00"
                      step="0.1"
                      min="0"
                      value={snipeAmount}
                      onChange={(e) => setSnipeAmount(e.target.value)}
                    />
                    <input 
                      type="range" 
                      id="snipeAmountRange"
                      name="snipeAmountRange"
                      min="0.1" 
                      max="10" 
                      step="0.1" 
                      value={snipeAmount}
                      onChange={(e) => setSnipeAmount(e.target.value)}
                      className="w-full h-1 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-white mt-2"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button className="minimal-btn minimal-btn-primary flex-1 py-3">
                    Snipe Now
                  </button>
                  <button className="minimal-btn minimal-btn-secondary flex-1 py-3">
                    Queue
                  </button>
                </div>
              </div>
            </InteractiveCard>
          </div>

          {/* Right: Live Visualization / Telemetry */}
          <div className="lg:col-span-2 flex flex-col">
            <InteractiveCard className="flex-1 overflow-hidden flex flex-col p-0">
              <div className="p-6 border-b border-minimal-border flex justify-between items-center">
                <h2 className="text-lg font-bold flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  Live Telemetry
                </h2>
                <button className="text-xs font-semibold uppercase tracking-wider text-minimal-muted hover:text-white transition-colors flex items-center">
                  View All <ChevronRight size={14} />
                </button>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto">
                
                {/* Desktop Table Layout */}
                <div className="hidden md:block">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="pb-4 font-semibold text-xs uppercase tracking-wider text-minimal-muted border-b border-minimal-border">Action</th>
                        <th className="pb-4 font-semibold text-xs uppercase tracking-wider text-minimal-muted border-b border-minimal-border">Token</th>
                        <th className="pb-4 font-semibold text-xs uppercase tracking-wider text-minimal-muted border-b border-minimal-border">Amount</th>
                        <th className="pb-4 font-semibold text-xs uppercase tracking-wider text-minimal-muted border-b border-minimal-border text-right">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.map((row) => (
                        <tr 
                          key={row.id}
                          className="group border-b border-minimal-border last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer"
                        >
                          <td className="py-4">
                            <span className={`text-xs font-bold px-2 py-1 rounded-md border ${
                              row.action === 'BUY' ? 'bg-white text-black border-white' : 
                              row.action === 'SELL' ? 'bg-transparent border-white/20 text-white' : 
                              'bg-neutral-800 border-neutral-700 text-white'
                            }`}>
                              {row.action}
                            </span>
                          </td>
                          <td className="py-4 font-medium">{row.token}</td>
                          <td className="py-4 font-mono text-sm">{row.amount}</td>
                          <td className="py-4 font-mono text-sm text-right text-minimal-muted">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card Layout */}
                <div className="md:hidden flex flex-col gap-4">
                  {mockData.map((row) => (
                    <div key={row.id} className="p-4 rounded-xl border border-minimal-border bg-minimal-surface flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-white">{row.action} {row.token}</span>
                        <span className="font-mono text-sm">{row.amount}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-minimal-muted">{row.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
              </div>
            </InteractiveCard>
          </div>

        </div>
      </div>
      </div>
    </WalletGate>
  );
}
