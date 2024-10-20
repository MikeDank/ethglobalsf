import axios from 'axios';
import { getPrivyWalletAddress } from './Wallet';

const API_URL = 'https://sepolia.api.0x.org/swap/v1/quote';

/**
 * Initiates a swap using the 0x Swap API.
 * @param {string} buyTokenAddress - The address of the token to buy.
 * @param {number} sellAmount - The amount of ETH to sell (in ETH, not wei).
 */
export const initiateSwap = async (buyTokenAddress, sellAmount) => {
  try {
    const walletAddress = await getPrivyWalletAddress(); // Fetch the user's Privy wallet address

    const response = await axios.get(API_URL, {
      params: {
        buyToken: buyTokenAddress, // The token we're buying (WETH, UNI, LINK)
        sellToken: 'ETH', // We're selling ETH
        sellAmount: (sellAmount * 1e18).toString(), // Convert ETH to wei
        takerAddress: walletAddress, // Privy wallet address as the taker
        slippagePercentage: 0.01, // 1% slippage tolerance
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
