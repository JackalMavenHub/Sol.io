import React from 'react';
import { Activity, Briefcase, Zap, Settings, LogOut, Wallet } from 'lucide-react';
import logo from '../logo-rug.png';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Utilizing our glassmorphism styles
import '../Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar glass-panel">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <h2>Sol.io</h2>
        </div>
        
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active"><Activity size={18} /> Dashboard</a>
          <a href="#" className="nav-item"><Zap size={18} /> Sniper Tools</a>
          <a href="#" className="nav-item"><Briefcase size={18} /> Portfolio</a>
          <a href="#" className="nav-item"><Settings size={18} /> Settings</a>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={() => navigate('/')}>
            <LogOut size={18} /> Disconnect
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top bar */}
        <header className="topbar glass-panel">
          <div className="topbar-title">
            <h1>Overview</h1>
          </div>
          <div className="topbar-actions">
            <div className="wallet-badge">
              <Wallet size={16} /> Connected: DqJ1...pKA7
            </div>
            <div className="network-badge">Mainnet-Beta</div>
          </div>
        </header>

        {/* Dashboard Widgets */}
        <div className="dashboard-grid">
          
          <div className="widget glass-panel">
            <h3>Total Profit</h3>
            <div className="widget-value text-green">+42.5 SOL</div>
            <p className="widget-sub">Last 30 days</p>
          </div>

          <div className="widget glass-panel">
            <h3>Active Snipes</h3>
            <div className="widget-value">3</div>
            <p className="widget-sub">Monitoring mempool...</p>
          </div>

          <div className="widget glass-panel">
            <h3>Win Rate</h3>
            <div className="widget-value">84.2%</div>
            <p className="widget-sub">Based on 142 trades</p>
          </div>

          <div className="widget glass-panel span-2">
            <div className="widget-header">
              <h3>Live Activity Feed</h3>
              <div className="live-indicator"></div>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <span className="time">10:42 AM</span>
                <span className="action buy">BUY</span>
                <span className="token">PEPE</span>
                <span className="amount">1.5 SOL</span>
              </div>
              <div className="activity-item">
                <span className="time">10:15 AM</span>
                <span className="action sell">SELL</span>
                <span className="token">WIF</span>
                <span className="amount text-green">+0.8 SOL</span>
              </div>
              <div className="activity-item">
                <span className="time">09:30 AM</span>
                <span className="action scan">SCAN</span>
                <span className="token">New Liquidity Pool detected...</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
