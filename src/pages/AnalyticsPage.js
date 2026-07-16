import React from 'react';
import { BarChart3, TrendingUp, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';

const mockTokens = [
  { rank: 1, symbol: 'WIF', volume: '$142.5M', change: '+24.5%', isUp: true, liquidity: '$8.2M' },
  { rank: 2, symbol: 'PEPE', volume: '$98.2M', change: '-5.2%', isUp: false, liquidity: '$12.4M' },
  { rank: 3, symbol: 'BONK', volume: '$65.1M', change: '+12.8%', isUp: true, liquidity: '$5.1M' },
  { rank: 4, symbol: 'BOME', volume: '$42.9M', change: '+8.4%', isUp: true, liquidity: '$3.8M' },
  { rank: 5, symbol: 'POPCAT', volume: '$28.4M', change: '-1.5%', isUp: false, liquidity: '$1.9M' },
];

export default function AnalyticsPage() {
  return (
    <div className="relative min-h-screen pt-28 pb-12 px-6 max-w-6xl mx-auto z-10 text-white flex flex-col gap-6">
      
      <div className="flex items-center gap-3 mb-2">
        <BarChart3 className="text-cosmic-blue" size={24} />
        <h1 className="text-2xl font-bold tracking-tight">Market Analytics</h1>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InteractiveCard className="flex flex-col justify-center">
          <span className="label-text flex items-center gap-2">24h Network Volume</span>
          <div className="text-3xl font-bold tracking-tight text-white mt-1">$4.2B</div>
          <div className="text-sm text-copper-orange mt-2 flex items-center gap-1"><ArrowUpRight size={14}/> +18.4%</div>
        </InteractiveCard>
        
        <InteractiveCard className="flex flex-col justify-center">
          <span className="label-text flex items-center gap-2">Solana TPS</span>
          <div className="text-3xl font-bold tracking-tight text-white mt-1">2,842</div>
          <div className="text-sm text-cosmic-blue mt-2 flex items-center gap-1"><Activity size={14}/> Network Stable</div>
        </InteractiveCard>

        <InteractiveCard className="flex flex-col justify-center">
          <span className="label-text flex items-center gap-2">Active Snipe Pools</span>
          <div className="text-3xl font-bold tracking-tight text-white mt-1">1,402</div>
          <div className="text-sm text-solar-amber mt-2 flex items-center gap-1"><TrendingUp size={14}/> 142 added today</div>
        </InteractiveCard>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        
        {/* Chart Area */}
        <div className="lg:col-span-2">
          <InteractiveCard className="h-full min-h-[400px] flex flex-col p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">Volume Trend (7D)</h2>
            <div className="flex-1 border border-white/5 rounded-xl bg-white/[0.02] flex items-end p-4 gap-2">
              {/* Mock Bar Chart */}
              {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none">
                    ${height}M
                  </div>
                  <div 
                    className="w-full bg-gradient-to-t from-cosmic-blue/20 to-cosmic-blue/80 rounded-t-sm transition-all group-hover:opacity-80" 
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-white/40 mt-4 font-mono">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </InteractiveCard>
        </div>

        {/* Trending Table */}
        <div className="lg:col-span-1 flex flex-col">
          <InteractiveCard className="flex-1 p-0 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-lg font-bold">Top Trending Pools</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[300px]">
                <thead>
                  <tr>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-white/40 border-b border-white/5">Token</th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-white/40 border-b border-white/5 text-right">Vol (24h)</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTokens.map((token) => (
                    <tr key={token.rank} className="border-b border-white/5 last:border-0 hover:bg-white/5 cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{token.symbol}</span>
                          <span className={`text-xs flex items-center gap-1 ${token.isUp ? 'text-copper-orange' : 'text-red-500'}`}>
                            {token.isUp ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
                            {token.change}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-sm">{token.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </InteractiveCard>
        </div>

      </div>
    </div>
  );
}
