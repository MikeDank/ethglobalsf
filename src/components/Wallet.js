import React, { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth'; // Correct Import
import './styles/Wallet.css';

const Wallet = () => {
  const { user, login, logout, ready } = usePrivy();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      login({ method: 'telegram' });
    }
  }, [ready, user, login]);

  if (!ready) return <div>Loading...</div>;
  if (!user) return <div>Please log in using Telegram to view your wallet.</div>;

  return (
    <div className="wallet">
      <h1>Welcome, {user.email || 'Telegram User'}!</h1>
      <p>Your wallet address: {user.walletAddress}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Wallet; // Ensure this is exported as default
