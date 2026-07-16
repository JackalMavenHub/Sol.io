import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MessageCircle, Key, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useWallet } from '@solana/wallet-adapter-react';
import InteractiveCard from '../components/InteractiveCard';
import { PaymentButton } from '../components/PaymentButton';
import logo from '../logo-rug.png';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [telegramName, setTelegramName] = useState('');
  const [subscription, setSubscription] = useState('');
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [transactionCompleted, setTransactionCompleted] = useState(false);
  const navigate = useNavigate();
  const { connected } = useWallet();

  // Validate form and button state
  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isTelegramValid = telegramName.startsWith('@') && telegramName.length > 2;
    
    if (email && !isEmailValid) {
      setErrors(prev => ({ ...prev, email: true }));
    } else {
      setErrors(prev => ({ ...prev, email: false }));
    }

    if (telegramName && !isTelegramValid) {
      setErrors(prev => ({ ...prev, telegram: true }));
    } else {
      setErrors(prev => ({ ...prev, telegram: false }));
    }

    if (isEmailValid && isTelegramValid && subscription && transactionCompleted) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, telegramName, subscription, transactionCompleted]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'telegram') setTelegramName(value);
    else if (name === 'subscription') setSubscription(value);
  };

  const getPriceInSOL = () => {
    if (subscription === '1-month') return 1;
    if (subscription === 'lifetime') return 7;
    return 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const loadingToastId = toast.loading('Provisioning your access...');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Registration complete! Welcome.', { id: loadingToastId });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please contact support.', { id: loadingToastId });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 z-10">
      
      {/* Container without stagger animations */}
      <div className="w-full max-w-lg flex flex-col items-center">
        <InteractiveCard className="w-full relative" disableEntryAnimation={true}>
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <img src={logo} alt="Logo" className="w-16 h-16 relative z-10 rounded-2xl shadow-xl border border-white/5" />
            </div>
            <h1 className="text-3xl font-extrabold text-clay-text mb-2 text-center tracking-tight">
              Deploy Your Instance
            </h1>
            <p className="text-clay-muted text-sm font-bold text-center max-w-sm">
              Securely register and authenticate via Solana. Access the most powerful mempool sniper interface.
            </p>
          </div>

          <form 
            className="flex flex-col gap-5 w-full" 
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <span className="label-text">Email Address</span>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-clay-muted" size={18} />
                <input
                  type="email"
                  name="email"
                  className={`clay-input pl-12 ${errors.email ? 'ring-2 ring-red-500/50' : ''}`}
                  placeholder="admin@sol.io"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && <p className="text-red-500/80 text-xs mt-1 absolute -bottom-5 left-0">Please enter a valid email address.</p>}
              </div>
            </div>

            <div className="form-group">
              <span className="label-text">Telegram Handle</span>
              <div className="relative">
                <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-clay-muted" size={18} />
                <input
                  type="text"
                  name="telegram"
                  className={`clay-input pl-12 ${errors.telegram ? 'ring-2 ring-red-500/50' : ''}`}
                  placeholder="@username"
                  value={telegramName}
                  onChange={handleInputChange}
                  required
                />
                {errors.telegram && <p className="text-red-500/80 text-xs mt-1 absolute -bottom-5 left-0">Please enter a valid Telegram handle.</p>}
              </div>
            </div>

            <div className="form-group">
              <span className="label-text">Subscription Tier</span>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-clay-muted z-10" size={18} />
                <select
                  name="subscription"
                  className="clay-input pl-12 relative z-0"
                  value={subscription}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled className="text-black bg-white">Select a tier...</option>
                  <option value="1-month" className="text-black bg-white">1 Month License (1 SOL)</option>
                  <option value="lifetime" className="text-black bg-white">Lifetime License (7 SOL)</option>
                </select>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
              {!connected ? (
                <div className="p-4 rounded-xl clay-panel text-center text-sm font-bold text-clay-muted">
                  Please connect your wallet using the top navigation bar to proceed.
                </div>
              ) : (
                <PaymentButton 
                  updateButtonState={setTransactionCompleted} 
                  priceInSOL={getPriceInSOL()}
                  disabled={!email || !telegramName || !subscription || errors.email || errors.telegram}
                />
              )}
            </div>

            {/* Visual Proceed Button - enabled after transaction completes */}
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`clay-btn py-4 mt-2 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'clay-btn-primary hover:-translate-y-1'}`}
            >
              <ShieldCheck size={18} className="mr-2" /> 
              {transactionCompleted ? 'Enter Dashboard' : 'Complete Payment to Proceed'}
            </button>
          </form>
        </InteractiveCard>
      </div>
    </div>
  );
}
