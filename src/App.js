import React, { useEffect } from 'react';
import MemecoinCard from './components/MemecoinCard';
import Wallet from './components/Wallet';
import './App.css';
import { PrivyProvider } from '@privy-io/react-auth';

const App = () => {
  useEffect(() => {
    // Initialize Telegram WebApp API safely
    if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      console.log('Telegram WebApp is ready.');
    } else {
      console.error('Telegram WebApp is not available or the app is not running inside Telegram.');
    }
  }, []);

  return (
    <PrivyProvider
      appId={process.env.REACT_APP_PRIVY_API_KEY}
      config={{
        appearance: {
          accentColor: '#6A6FF5',
          theme: '#FFFFFF',
          showWalletLoginFirst: false,
          logo: 'https://auth.privy.io/logos/privy-logo.png',
          walletChainType: 'ethereum-and-solana',
        },
        loginMethods: ['telegram'],
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true,
          },
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          requireUserPasswordOnCreate: false,
        },
        mfa: {
          noPromptOnMfaRequired: false,
        },
      }}
    >
      <div className="App">
        <Wallet />
        <MemecoinCard />
      </div>
    </PrivyProvider>
  );
};

export default App;
