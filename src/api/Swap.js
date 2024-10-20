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
    console.log('Initiating swap with the following parameters:', {
      buyTokenAddress,
      sellAmount,
      walletAddress,
    });

    const response = await axios.get(API_URL, {
      params: {
        buyToken: buyTokenAddress, // The token we're buying (e.g. UNI, LINK)
        sellToken: 'ETH', // We're selling ETH
        sellAmount: (sellAmount * 1e18).toString(), // Convert ETH to wei
        takerAddress: walletAddress, // Wallet address for the swap
        slippagePercentage: 0.01, // 1% slippage tolerance
      },
      headers: {
        '0x-api-key': '6f30ccc1-fcb8-4951-9e65-28fe974fdd21', // Make sure to replace this with your actual 0x API key
      },
    });

    const swapData = response.data;
    console.log('Swap successful. Data received:', swapData);

    // You would handle the transaction or any further action here.
  } catch (error) {
    console.error('Error initiating swap:', error);
    throw error;
  }
};
