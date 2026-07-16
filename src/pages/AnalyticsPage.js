import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Activity, ArrowUpRight, ArrowDownRight, RefreshCw, Loader2 } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import { toast } from 'react-hot-toast';

// WIF, BONK, BOME, POPCAT, JUP
const TOKEN_ADDRESSES = "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm,DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263,ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82,7GCihgDB8fe6KNjn2g4X3f8Nq4X4Q7u2kE6pX2aGv63t,JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbZedPFTEPsCz";

export default function AnalyticsPage() {
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchTokenData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESSES}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const data = await response.json();
      
      if (data.pairs) {
        // Dexscreener can return multiple pairs per token (e.g. USDC, SOL pairs). 
        // We'll filter to get the highest volume pair for each base token.
        const uniqueTokensMap = new Map();
        
        data.pairs.forEach(pair => {
          if (pair.chainId !== 'solana') return;
          const address = pair.baseToken.address;
          const currentVol = pair.volume?.h24 || 0;
          
          if (!uniqueTokensMap.has(address) || uniqueTokensMap.get(address).volume.h24 < currentVol) {
            uniqueTokensMap.set(address, pair);
          }
        });

        const formattedTokens = Array.from(uniqueTokensMap.values())
          .sort((a, b) => (b.volume?.h24 || 0) - (a.volume?.h24 || 0))
          .map((pair, index) => ({
            rank: index + 1,
            symbol: pair.baseToken.symbol,
            price: `$${parseFloat(pair.priceUsd).toPrecision(4)}`,
            volume: `$${((pair.volume?.h24 || 0) / 1000000).toFixed(1)}M`,
            change: `${pair.priceChange?.h24 >= 0 ? '+' : ''}${pair.priceChange?.h24 || 0}%`,
            isUp: pair.priceChange?.h24 >= 0,
            liquidity: `$${((pair.liquidity?.usd || 0) / 1000000).toFixed(1)}M`
          }));
          
        setTokens(formattedTokens);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Error fetching market data:", error);
      toast.error("Failed to sync live market data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenData();
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
            <span className="text-xs text-white/40 hidden sm:block">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button 
            onClick={fetchTokenData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium transition-all disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            {isLoading ? 'Syncing...' : 'Refresh Data'}
          </button>
        </div>
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
                <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer relative h-full">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 z-20 whitespace-nowrap shadow-xl">
                    ${height * 5.5}M
                  </div>
                  <div 
                    className="w-full bg-gradient-to-t from-cosmic-blue/20 to-cosmic-blue/80 rounded-t-sm transition-all group-hover:opacity-100 opacity-60" 
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
