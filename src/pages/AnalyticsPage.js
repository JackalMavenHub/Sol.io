import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Activity, ArrowUpRight, ArrowDownRight, RefreshCw, Loader2, Crosshair, Clock } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import { toast } from 'react-hot-toast';

// WIF, BONK, BOME, POPCAT, JUP
const MOCK_POOLS = [
  { symbol: 'WIF', basePrice: 2.45, baseVol: 140.2, liq: 12.4 },
  { symbol: 'BONK', basePrice: 0.000021, baseVol: 85.1, liq: 8.9 },
  { symbol: 'BOME', basePrice: 0.012, baseVol: 65.4, liq: 5.2 },
  { symbol: 'POPCAT', basePrice: 0.45, baseVol: 42.8, liq: 3.1 },
  { symbol: 'TREMP', basePrice: 0.89, baseVol: 28.5, liq: 2.4 }
];

const generateRandomSnipe = () => {
  const tokens = ['WIF', 'BONK', 'BOME', 'POPCAT', 'JUP', 'SLERF', 'TREMP'];
  const token = tokens[Math.floor(Math.random() * tokens.length)];
  const amount = (Math.random() * 50 + 1).toFixed(1);
  const sol = (Math.random() * 20 + 0.5).toFixed(2);
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let wallet = '';
  for(let i=0; i<4; i++) wallet += chars.charAt(Math.floor(Math.random() * chars.length));
  wallet += '...';
  for(let i=0; i<4; i++) wallet += chars.charAt(Math.floor(Math.random() * chars.length));
  
  return {
    id: Math.random().toString(36).substring(7),
    wallet,
    token,
    amount: `${amount}${Math.random() > 0.5 ? 'M' : 'K'}`,
    sol,
    time: 'Just now'
  };
};

export default function AnalyticsPage() {
  const [tokens, setTokens] = useState([]);
  const [snipes, setSnipes] = useState(() => Array.from({ length: 5 }, generateRandomSnipe));
  const [stats, setStats] = useState({ volume: '$0.0M', pools: '0' });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Simulated WebSocket Data Feed
  useEffect(() => {
    const updateMarketData = () => {
      const newTokens = MOCK_POOLS.map((pool, idx) => {
        // Randomize price by +/- 2%
        const priceChange = 1 + (Math.random() * 0.04 - 0.02);
        const currentPrice = pool.basePrice * priceChange;
        
        // Randomize 24h change
        const changePct = (Math.random() * 20 - 5).toFixed(2);
        const isUp = parseFloat(changePct) >= 0;
        
        return {
          rank: idx + 1,
          symbol: pool.symbol,
          price: `$${currentPrice < 0.01 ? currentPrice.toFixed(6) : currentPrice.toFixed(3)}`,
          volume: `$${(pool.baseVol + Math.random() * 5).toFixed(1)}M`,
          change: `${isUp ? '+' : ''}${changePct}%`,
          isUp,
          liquidity: `$${pool.liq.toFixed(1)}M`
        };
      }).sort((a, b) => parseFloat(b.volume.slice(1)) - parseFloat(a.volume.slice(1)));
      
      setTokens(newTokens);
      setStats({
        volume: `$4.2B`,
        pools: '1,402'
      });
      setLastUpdated(new Date());
      setIsLoading(false);
    };

    updateMarketData(); // initial load
    const interval = setInterval(updateMarketData, 2500); // update every 2.5s
    return () => clearInterval(interval);
  }, []);

  // Live Feed Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSnipes(prev => {
        const newSnipe = generateRandomSnipe();
        const updated = [newSnipe, ...prev].slice(0, 8); // keep max 8
        // Update times for older snipes to look realistic
        return updated.map((s, idx) => ({
          ...s,
          time: idx === 0 ? 'Just now' : `${idx * 2 + Math.floor(Math.random() * 3)}s ago`
        }));
      });
    }, 3500); // New snipe every 3.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen pt-28 pb-12 px-6 max-w-6xl mx-auto z-10 text-white flex flex-col gap-6">
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-cosmic-blue" size={24} />
          <h1 className="text-2xl font-bold tracking-tight">Market Analytics</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <span className="text-xs text-green-400 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Live Feed
            </span>
          )}
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InteractiveCard className="flex flex-col justify-center">
          <span className="label-text flex items-center gap-2">24h Tracked Volume</span>
          <div className="text-3xl font-bold tracking-tight text-white mt-1">{isLoading ? '...' : stats.volume}</div>
          <div className="text-sm text-copper-orange mt-2 flex items-center gap-1"><ArrowUpRight size={14}/> Top {stats.pools} pools</div>
        </InteractiveCard>
        
        <InteractiveCard className="flex flex-col justify-center">
          <span className="label-text flex items-center gap-2">Solana TPS</span>
          <div className="text-3xl font-bold tracking-tight text-white mt-1">2,842</div>
          <div className="text-sm text-cosmic-blue mt-2 flex items-center gap-1"><Activity size={14}/> Network Stable</div>
        </InteractiveCard>

        <InteractiveCard className="flex flex-col justify-center">
          <span className="label-text flex items-center gap-2">Tracked Pools</span>
          <div className="text-3xl font-bold tracking-tight text-white mt-1">{isLoading ? '...' : stats.pools}</div>
          <div className="text-sm text-solar-amber mt-2 flex items-center gap-1"><TrendingUp size={14}/> Active monitoring</div>
        </InteractiveCard>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        
        {/* Live Snipe Feed */}
        <div className="lg:col-span-2">
          <InteractiveCard className="h-full min-h-[400px] flex flex-col p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                Live Network Snipes
              </h2>
              <span className="text-xs text-white/40 flex items-center gap-1"><Clock size={12}/> Real-time feed</span>
            </div>
            
            <div className="flex-1 overflow-hidden flex flex-col gap-3 relative">
              <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-[#0f1115] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#0f1115] to-transparent z-10 pointer-events-none" />
              
              {snipes.map((snipe) => (
                <div 
                  key={snipe.id} 
                  className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex items-center justify-between group hover:bg-white/[0.05] transition-all duration-500 hover:border-white/10 shrink-0 animate-in fade-in slide-in-from-top-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-cosmic-blue/10 border border-cosmic-blue/20 flex items-center justify-center text-cosmic-blue group-hover:scale-110 transition-transform duration-300">
                      <Crosshair size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white/90">
                        <span className="text-cosmic-blue font-mono">{snipe.wallet}</span> sniped <span className="font-bold text-white tracking-wide">{snipe.amount} ${snipe.token}</span>
                      </div>
                      <div className="text-xs text-white/40 mt-1 flex items-center gap-2">
                        <span>Paid <span className="text-white/70">{snipe.sol} SOL</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-copper-orange font-mono bg-copper-orange/10 px-2 py-1 rounded border border-copper-orange/20 whitespace-nowrap">
                    {snipe.time}
                  </div>
                </div>
              ))}
            </div>
          </InteractiveCard>
        </div>

        {/* Trending Table */}
        <div className="lg:col-span-1 flex flex-col">
          <InteractiveCard className="flex-1 p-0 overflow-hidden flex flex-col min-h-[400px]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-lg font-bold">Top Trending Pools</h2>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse min-w-[300px]">
                <thead>
                  <tr>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-white/40 border-b border-white/5">Token</th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-white/40 border-b border-white/5 text-right">Vol (24h)</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="2" className="px-6 py-12 text-center text-white/40">
                        <Loader2 size={24} className="animate-spin mx-auto mb-2" />
                        Fetching live data...
                      </td>
                    </tr>
                  ) : tokens.map((token) => (
                    <tr key={token.symbol} className="border-b border-white/5 last:border-0 hover:bg-white/5 cursor-pointer transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm flex items-center gap-2">
                            {token.symbol}
                            <span className="text-[10px] text-white/30 font-normal bg-white/5 px-1.5 py-0.5 rounded">{token.price}</span>
                          </span>
                          <span className={`text-xs flex items-center gap-1 ${token.isUp ? 'text-copper-orange' : 'text-red-500'}`}>
                            {token.isUp ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
                            {token.change}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-mono text-sm">{token.volume}</span>
                          <span className="text-xs text-white/30 font-mono">Liq: {token.liquidity}</span>
                        </div>
                      </td>
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
