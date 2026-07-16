import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Shield, ChevronRight } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';

const mockData = [
  { id: 1, action: 'BUY', token: 'PEPE', amount: '1.5 SOL', time: '10:42:15', status: 'Success' },
  { id: 2, action: 'SELL', token: 'WIF', amount: '0.8 SOL', time: '10:15:33', status: 'Success' },
  { id: 3, action: 'SCAN', token: 'New LP', amount: '--', time: '09:30:11', status: 'Active' },
  { id: 4, action: 'BUY', token: 'BONK', amount: '5.0 SOL', time: '08:12:05', status: 'Failed' },
  { id: 5, action: 'SELL', token: 'BOME', amount: '12.4 SOL', time: '07:45:59', status: 'Success' },
];

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="relative min-h-screen pt-28 pb-12 px-6 max-w-7xl mx-auto z-10 text-white">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col gap-6"
      >
        {/* Header / Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={itemVariants}>
            <InteractiveCard className="h-full flex flex-col justify-center">
              <span className="label-text flex items-center gap-2"><Activity size={14} className="text-copper-orange"/> Total PnL</span>
              <div className="text-4xl font-bold tracking-tight text-white mt-1">+42.50 <span className="text-xl text-white/50">SOL</span></div>
              <div className="text-sm text-copper-orange mt-2">+12% this week</div>
            </InteractiveCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <InteractiveCard className="h-full flex flex-col justify-center">
              <span className="label-text flex items-center gap-2"><Zap size={14} className="text-solar-amber"/> Active Snipes</span>
              <div className="text-4xl font-bold tracking-tight text-white mt-1">3 <span className="text-xl text-white/50">Bots</span></div>
              <div className="text-sm text-solar-amber mt-2">Monitoring 4 liquidity pools</div>
            </InteractiveCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <InteractiveCard className="h-full flex flex-col justify-center">
              <span className="label-text flex items-center gap-2"><Shield size={14} className="text-cosmic-blue"/> Win Rate</span>
              <div className="text-4xl font-bold tracking-tight text-white mt-1">84.2 <span className="text-xl text-white/50">%</span></div>
              <div className="text-sm text-cosmic-blue mt-2">Across 142 total trades</div>
            </InteractiveCard>
          </motion.div>
        </div>

        {/* Main Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          
          {/* Left: Control Deck */}
          <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col gap-6">
            <InteractiveCard className="flex-1">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                Quick Execute
              </h2>
              
              <div className="flex flex-col gap-5">
                <div className="form-group">
                  <span className="label-text">Target Contract Address</span>
                  <input type="text" className="glass-input font-mono text-sm" placeholder="Paste Solana address..." />
                </div>
                
                <div className="form-group">
                  <span className="label-text flex justify-between">
                    <span>Amount (SOL)</span>
                    <span className="text-white">1.50 SOL</span>
                  </span>
                  {/* Custom Slider Simulation */}
                  <div className="h-2 w-full bg-black/50 rounded-full mt-2 relative border border-white/5">
                    <div className="absolute left-0 top-0 h-full w-[30%] bg-gradient-to-r from-copper-orange to-solar-amber rounded-full shadow-[0_0_10px_rgba(224,122,95,0.5)]"></div>
                    <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border border-copper-orange"></div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="glass-btn glass-btn-primary flex-1 py-3">
                    Snipe Now
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="glass-btn bg-white/5 border border-white/10 hover:bg-white/10 flex-1 py-3 text-white/80">
                    Queue
                  </motion.button>
                </div>
              </div>
            </InteractiveCard>
          </motion.div>

          {/* Right: Live Visualization / Telemetry */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col">
            <InteractiveCard className="flex-1 overflow-hidden flex flex-col p-0">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-lg font-bold flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                  Live Telemetry
                </h2>
                <button className="text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white transition-colors flex items-center">
                  View All <ChevronRight size={14} />
                </button>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="pb-4 font-semibold text-xs uppercase tracking-wider text-white/40 border-b border-white/5">Action</th>
                      <th className="pb-4 font-semibold text-xs uppercase tracking-wider text-white/40 border-b border-white/5">Token</th>
                      <th className="pb-4 font-semibold text-xs uppercase tracking-wider text-white/40 border-b border-white/5">Amount</th>
                      <th className="pb-4 font-semibold text-xs uppercase tracking-wider text-white/40 border-b border-white/5 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.map((row) => (
                      <motion.tr 
                        key={row.id}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                        className="group border-b border-white/5 last:border-0 transition-colors cursor-pointer"
                      >
                        <td className="py-4">
                          <span className={`text-xs font-bold px-2 py-1 rounded-md border ${
                            row.action === 'BUY' ? 'bg-copper-orange/10 border-copper-orange/20 text-copper-orange' : 
                            row.action === 'SELL' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 
                            'bg-cosmic-blue/10 border-cosmic-blue/20 text-cosmic-blue'
                          }`}>
                            {row.action}
                          </span>
                        </td>
                        <td className="py-4 font-medium">{row.token}</td>
                        <td className="py-4 font-mono text-sm">{row.amount}</td>
                        <td className="py-4 font-mono text-sm text-right text-white/50">{row.time}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </InteractiveCard>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
