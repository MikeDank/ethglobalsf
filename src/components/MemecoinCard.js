import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import './styles/MemecoinCard.css';
import { getPrivyWalletAddress } from '../api/Wallet';
import { initiateSwap } from '../api/Swap';
import { usePrivy } from '@privy-io/react-auth'; // Correct hook usage

// Hardcoded testnet tokens with addresses and logos
const memecoins = [
  {
    name: 'Wrapped ETH',
    symbol: 'WETH',
    price: 'Testnet Price',
    address: '0xfff9976782d46cc05630d1f6ebab18b2324d6b14',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', // WETH logo
    chartUrls: {
      geckoTerminal: 'https://www.geckoterminal.com/eth/pools/0xfff9976782d46cc05630d1f6ebab18b2324d6b14?embed=1&info=0&theme=dark',
    },
  },
  {
    name: 'Uniswap',
    symbol: 'UNI',
    price: 'Testnet Price',
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.png', // UNI logo
    chartUrls: {
      geckoTerminal: 'https://www.geckoterminal.com/eth/pools/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984?embed=1&info=0&theme=dark',
    },
  },
  {
    name: 'Chainlink',
    symbol: 'LINK',
    price: 'Testnet Price',
    address: '0x779877a7b0d9e8603169ddbd7836e478b4624789',
    logo: 'https://cryptologos.cc/logos/chainlink-link-logo.png', // LINK logo
    chartUrls: {
      geckoTerminal: 'https://www.geckoterminal.com/eth/pools/0x779877a7b0d9e8603169ddbd7836e478b4624789?embed=1&info=0&theme=dark',
    },
  },
];

const MemecoinCard = () => {
  const { user, ready } = usePrivy(); // Ensure Privy is ready before accessing user data
  const walletAddress = user?.walletAddress;
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current memecoin
  const currentCoin = memecoins[currentIndex]; // Get the current memecoin
  const [loading, setLoading] = useState(true);

  // Wait until Privy is ready and the wallet address is available
  useEffect(() => {
    if (ready && walletAddress) {
      setLoading(false); // Wallet is ready and available
    }
  }, [ready, walletAddress]);

  // Function to handle card swipe
  const onSwipe = async (direction) => {
    if (loading) {
      console.log('Wallet is not ready yet. Cannot initiate swap.');
      return; // Do not initiate a swap if the wallet is not ready
    }

    if (direction === 'right') {
      console.log(`Swiped right on ${currentCoin.name}. Initiating swap...`);
      try {
        const privyWalletAddress = getPrivyWalletAddress(walletAddress); // Get the wallet address from Privy
        await initiateSwap(currentCoin.address, 0.001, privyWalletAddress); // Swap 0.001 ETH
      } catch (error) {
        console.error('Swap failed:', error);
      }
    } else if (direction === 'left') {
      // Load next memecoin
      setCurrentIndex((prevIndex) => (prevIndex + 1) % memecoins.length);
    }
  };

  // Function to handle refresh or manually load the next card
  const handleNextCoin = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % memecoins.length);
  };

  if (loading) {
    return <div>Loading wallet...</div>; // Show loading message while waiting for wallet
  }

  return (
    <div className="memecoin-card-container">
      <TinderCard
        key={currentCoin.name}
        className="swipe"
        onSwipe={(dir) => onSwipe(dir)}
      >
        <div className="card">
          <div className="card-header">
            <img src={currentCoin.logo} alt={`${currentCoin.name} logo`} className="coin-logo" />
            <h2>{currentCoin.name} ({currentCoin.symbol})</h2>
          </div>
          
          <div className="card-content">
            <p><strong>Price:</strong> {currentCoin.price}</p>
          </div>

          {/* GeckoTerminal chart inside the Tinder card */}
          <div className="chart-container">
            <iframe
              src={currentCoin.chartUrls.geckoTerminal}
              title="GeckoTerminal Chart"
              className="chart-iframe"
            />
          </div>

          {/* Tinder-style buttons */}
          <div className="card-actions">
            <button className="action-btn dislike-btn" onClick={() => onSwipe('left')}>❌</button>
            <button className="action-btn refresh-btn" onClick={handleNextCoin}>🔄</button>
            <button className="action-btn like-btn" onClick={() => onSwipe('right')}>❤️</button>
          </div>
        </div>
      </TinderCard>
    </div>
  );
};

export default MemecoinCard;
