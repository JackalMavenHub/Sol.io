import React, { useState, useEffect } from 'react';
import logo from './logo-rug.png';
import './App.css';
import { WalletProviderComponent } from './components/WalletProviderComponent.tsx';
import Lottie from 'lottie-react';
import blockchainAnimation from './animations/blockchain.json';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeIntro, setFadeIntro] = useState(false);
  const [email, setEmail] = useState('');
  const [telegramName, setTelegramName] = useState('');
  const [subscription, setSubscription] = useState('');
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [transactionCompleted, setTransactionCompleted] = useState(false);

  // Intro Screen Splash Timer
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeIntro(true);
    }, 2500); // Start fading out after 2.5s
    
    const removeTimer = setTimeout(() => {
      setShowIntro(false);
    }, 3500); // Completely unmount after 3.5s

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

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
      // Setup your Webhook URL here (Discord or Telegram)
      const WEBHOOK_URL = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN';
      
      const payload = {
        content: `🎉 **New Registration!**\n**Email**: ${email}\n**Telegram**: ${telegramName}\n**Subscription**: ${subscription}`
      };

      // Only execute fetch if the user has replaced the placeholder URL
      if (!WEBHOOK_URL.includes('YOUR_WEBHOOK_ID')) {
        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Failed to send webhook');
      } else {
        // Simulate network request if still using placeholder
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Webhook payload (simulated):', payload);
      }
      
      toast.success('Registration complete! Check your email for the access key.', { id: loadingToastId });
      
      // Reset form
      setEmail('');
      setTelegramName('');
      setSubscription('');
      setTransactionCompleted(false);
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please contact support.', { id: loadingToastId });
    }
  };

  const updateTransactionState = (completed) => {
    setTransactionCompleted(completed);
  };

  return (
    <>
      {showIntro && (
        <div className={`intro-overlay ${fadeIntro ? 'fade-out' : ''}`}>
          <div className="intro-content">
            <Lottie
              animationData={blockchainAnimation}
              loop={true}
              autoplay={true}
              style={{ width: '120px', height: '120px' }}
            />
          </div>
        </div>
      )}
      <div className="App fade-in-app">
      <Toaster position="top-center" />
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
        <div className="description-container">
          <p>Welcome to the Solana MP Rug Tool. Complete your registration by filling out the form below and making a one-time payment. Upon completion, you'll receive instant access to the tool via email, including your unique access key and setup guide.</p>
        </div>
        <h1>Secure Registration</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
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
          <div className="form-group">
            <label htmlFor="telegram">Telegram Handle</label>
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
          <div className="form-group">
            <label htmlFor="subscription">Subscription Tier</label>
            <select
              id="subscription"
              name="subscription"
              className={subscription ? 'input-success' : ''}
              value={subscription}
              onChange={handleInputChange}
              required
            >
              <option value="">Select an option</option>
              <option value="1-month">1 Month Subscription (1 SOL)</option>
              <option value="lifetime">Lifetime Subscription (7 SOL)</option>
            </select>
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
            Complete Registration
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
