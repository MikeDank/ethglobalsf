import React from 'react';
import TinderCard from 'react-tinder-card';
import './styles/MemecoinCard.css';

// Hardcoded memecoin data with token addresses and GeckoTerminal chart URLs
const memecoins = [
  {
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.06,
    supply: '140B',
    marketCap: '$8.4B',
    volume: '$500M',
    FDV: '$9B',
    address: '0xADDRESS_OF_DOGE_ON_SEPOLIA', // Replace with actual Dogecoin testnet address
    chartUrls: {
      geckoTerminal: 'https://www.geckoterminal.com/eth/pools/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640?embed=1&info=0&theme=dark',
    },
  },
  // Add more memecoins as needed with the same structure
];

const MemecoinCard = () => {
  // Function to handle card swipe
  const onSwipe = async (direction, coin) => {
    if (direction === 'right') {
      console.log(`Swiped right on ${coin.name}. Initiating swap...`);

      try {
        // Swap logic here (connect to Metamask, perform swap, etc.)
      } catch (error) {
        console.error('Swap failed', error);
      }
    }
  };

  return (
    <div className="memecoin-cards">
      {memecoins.map((coin) => (
        <TinderCard
          key={coin.name}
          className="swipe"
          onSwipe={(dir) => onSwipe(dir, coin)}
        >
          <div className="card">
            <h2>{coin.name} ({coin.symbol})</h2>
            <p>Price: ${coin.price}</p>
            <p>Supply: {coin.supply}</p>
            <p>Market Cap: {coin.marketCap}</p>
            <p>Volume: {coin.volume}</p>
            <p>FDV: {coin.FDV}</p>

            {/* GeckoTerminal chart inside the Tinder card */}
            <div className="chart-container">
              <iframe
                src={coin.chartUrls.geckoTerminal}
                title="GeckoTerminal Chart"
                className="chart-iframe"
              />
            </div>

            {/* Links to external resources */}
            <div className="links">
              <a href={coin.website}>Website</a> |
              <a href={coin.twitter}>Twitter</a> |
              <a href={coin.telegram}>Telegram</a>
            </div>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default MemecoinCard;
