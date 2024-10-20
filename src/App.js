import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth'; // Correct import from Privy React SDK
import MemecoinCard from './components/MemecoinCard'; // Ensure this is correct
import './App.css';

const App = () => {
  return (
    <PrivyProvider
      appId={process.env.REACT_APP_PRIVY_API_KEY} // Ensure your Privy API key is set in environment variables
      config={{
        appearance: {
          accentColor: '#6A6FF5',
          theme: '#FFFFFF',
          showWalletLoginFirst: false,
        },
        loginMethods: ['telegram'], // Customize the login methods if needed
      }}
    >
      <div className="App">
        <MemecoinCard />
      </div>
    </PrivyProvider>
  );
};

export default App;
