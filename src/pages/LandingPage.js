import React, { useState, useEffect } from 'react';
import logo from '../logo-rug.png';
import '../App.css';
import { WalletProviderComponent } from '../components/WalletProviderComponent.tsx';
import Lottie from 'lottie-react';
import blockchainAnimation from '../animations/blockchain.json';
import { toast } from 'react-hot-toast';
import { Mail, MessageCircle, Key, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [telegramName, setTelegramName] = useState('');
  const [subscription, setSubscription] = useState('');
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [transactionCompleted, setTransactionCompleted] = useState(false);
  const navigate = useNavigate();

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

  const handleInputChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToastId = toast.loading('Provisioning your access...');
    
    try {
      // Simulate registration
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success('Registration complete! Welcome.', { id: loadingToastId });
      
      // Navigate to the dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please contact support.', { id: loadingToastId });
    }
  };

  const updateTransactionState = (completed) => {
    setTransactionCompleted(completed);
  };

  return (
    <div className="App">
      <header className="App-header fade-in">
        <div className="logo-container">
          <div className="lottie-container">
            <Lottie
              animationData={blockchainAnimation}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <img src={logo} alt="Logo" className="logo" />
        </div>
        
        <h1>Secure Registration</h1>
        
        <div className="description-container">
          <p>Complete your registration by filling out the form below. Upon completion, you'll receive instant access to the tool via email.</p>
        </div>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                id="email"
                name="email"
                className={errors.email ? 'input-error' : (email ? 'input-success' : '')}
                placeholder="Enter your email"
                value={email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="telegram">Telegram Handle</label>
            <div className="input-wrapper">
              <MessageCircle className="input-icon" size={18} />
              <input
                type="text"
                id="telegram"
                name="telegram"
                className={errors.telegram ? 'input-error' : (telegramName ? 'input-success' : '')}
                placeholder="@username"
                value={telegramName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="subscription">Subscription Tier</label>
            <div className="input-wrapper">
              <Key className="input-icon" size={18} />
              <select
                id="subscription"
                name="subscription"
                className={subscription ? 'input-success' : ''}
                value={subscription}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a tier...</option>
                <option value="1-month">1 Month Subscription (1 SOL)</option>
                <option value="lifetime">Lifetime Subscription (7 SOL)</option>
              </select>
            </div>
          </div>
          
          <WalletProviderComponent 
            updateButtonState={updateTransactionState} 
            priceInSOL={getPriceInSOL()}
          />
          
          <button
            type="submit"
            className="submit-button"
            disabled={isButtonDisabled}
          >
            <span><ShieldCheck size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }}/> Complete Registration</span>
          </button>
          
        </form>
      </header>
    </div>
  );
}
