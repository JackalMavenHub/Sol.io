import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, RefreshCw, Layers } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import { motion } from 'framer-motion';

const mockPortfolio = [
  { id: 1, symbol: 'WIF', name: 'dogwifhat', amount: '1,452', value: '$3,557.40', roi: '+124.5%', isProfit: true },
  { id: 2, symbol: 'BONK', name: 'Bonk', amount: '24,500,000', value: '$514.50', roi: '-12.4%', isProfit: false },
  { id: 3, symbol: 'POPCAT', name: 'Popcat', amount: '450', value: '$202.50', roi: '+45.2%', isProfit: true },
  { id: 4, symbol: 'BOME', name: 'BOOK OF MEME', amount: '12,050', value: '$144.60', roi: '+5.4%', isProfit: true },
];

export default function PortfolioPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="relative min-h-screen pt-36 pb-12 px-6 max-w-6xl mx-auto z-10 text-clay-text flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-clay-surface shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] flex items-center justify-center">
            <Wallet className="text-clay-accent" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Your Vault</h1>
            <p className="text-clay-muted font-medium mt-1">Real-time valuation of sniped assets</p>
          </div>
        </div>
        
        <button 
          onClick={handleRefresh}
          className="clay-btn px-6 py-3 gap-2 w-full md:w-auto text-sm"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          Refresh Balances
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <InteractiveCard className="flex flex-col justify-center">
          <span className="label-text">Total Portfolio Value</span>
          <div className="text-4xl font-extrabold tracking-tight mt-2">$4,419.00</div>
          <div className="text-sm font-bold text-green-600 mt-3 flex items-center gap-1">
            <ArrowUpRight size={16} /> +$1,240.50 (All Time)
          </div>
        </InteractiveCard>
        
        <InteractiveCard className="flex flex-col justify-center">
          <span className="label-text">24h Performance</span>
          <div className="text-4xl font-extrabold tracking-tight mt-2 text-green-600">+14.2%</div>
          <div className="text-sm font-bold text-clay-muted mt-3 flex items-center gap-1">
            Best Performer: WIF
          </div>
        </InteractiveCard>

        <InteractiveCard className="flex flex-col justify-center">
          <span className="label-text">Total Holdings</span>
          <div className="text-4xl font-extrabold tracking-tight mt-2">4</div>
          <div className="text-sm font-bold text-clay-muted mt-3 flex items-center gap-1">
            <Layers size={16}/> Monitored Assets
          </div>
        </InteractiveCard>
      </div>

      {/* Holdings Table */}
      <InteractiveCard className="p-0 overflow-hidden mt-4">
        <div className="p-8 border-b border-gray-300/50">
          <h2 className="text-xl font-extrabold">Current Assets</h2>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr>
                <th className="px-6 py-4 font-bold text-sm uppercase tracking-wider text-clay-muted">Asset</th>
                <th className="px-6 py-4 font-bold text-sm uppercase tracking-wider text-clay-muted">Balance</th>
                <th className="px-6 py-4 font-bold text-sm uppercase tracking-wider text-clay-muted text-right">Value (USD)</th>
                <th className="px-6 py-4 font-bold text-sm uppercase tracking-wider text-clay-muted text-right">ROI</th>
                <th className="px-6 py-4 font-bold text-sm uppercase tracking-wider text-clay-muted text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockPortfolio.map((asset) => (
                <tr key={asset.id} className="border-b border-gray-200/50 last:border-0 hover:bg-white/30 transition-colors">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-clay-surface shadow-[inset_4px_4px_8px_rgba(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] flex items-center justify-center font-bold text-sm">
                        {asset.symbol.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-extrabold text-md">{asset.symbol}</span>
                        <span className="text-xs font-bold text-clay-muted">{asset.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 font-bold font-mono">{asset.amount}</td>
                  <td className="px-6 py-6 font-bold font-mono text-right">{asset.value}</td>
                  <td className={`px-6 py-6 font-bold font-mono text-right ${asset.isProfit ? 'text-green-600' : 'text-red-500'}`}>
                    {asset.roi}
                  </td>
                  <td className="px-6 py-6 text-center">
                    <button className="clay-btn px-4 py-2 text-xs font-bold w-full mx-auto max-w-[100px]">
                      Sell
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InteractiveCard>
    </div>
  );
}
