import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SniperPage from './pages/SniperPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AmbientBackground from './components/AmbientBackground';
import GlassNav from './components/GlassNav';
import { Toaster } from 'react-hot-toast';
import './App.css';

import { WalletContextProvider } from './components/WalletContextProvider';

function App() {
  return (
    <WalletContextProvider>
      <Router>
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#18181b',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
            },
          }}
        />
        <AmbientBackground />
        <GlassNav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sniper" element={<SniperPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </Router>
    </WalletContextProvider>
  );
}

export default App;
