import axios from 'axios';

const API_URL = 'https://sepolia.api.0x.org/swap/v1/quote';

/**
 * Initiates a swap using the 0x Swap API.
 * @param {string} buyTokenAddress - The address of the token to buy.
 * @param {number} sellAmount - The amount of ETH to sell (in ETH, not wei).
 * @param {string} walletAddress - The wallet address of the user performing the swap.
 */
export const initiateSwap = async (buyTokenAddress, sellAmount, walletAddress) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        buyToken: buyTokenAddress, // The token we're buying (WETH, UNI, LINK)
        sellToken: 'ETH', // We're selling ETH
        sellAmount: (sellAmount * 1e18).toString(), // Convert ETH to wei
        takerAddress: walletAddress, // Hardcoded wallet address as the taker
        slippagePercentage: 0.01, // 1% slippage tolerance
      },
      headers: {
        '0x-api-key': '6f30ccc1-fcb8-4951-9e65-28fe974fdd21', // Add your 0x API key here
      },
    });

    const swapData = response.data;
    console.log('Swap data:', swapData);

    // Here, you would integrate the signing and sending of the transaction
    // using Metamask or another wallet provider with the Privy wallet.
  } catch (error) {
    console.error('Error initiating swap:', error);
    throw error;
  }
};
