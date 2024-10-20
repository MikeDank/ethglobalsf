import { ethers } from 'ethers';
import axios from 'axios';

const swapApiUrl = 'https://sepolia.api.0x.org/swap/v1/quote';

/**
 * Perform a token swap using 0x Swap API
 * @param {string} fromToken - The token address you want to sell (e.g., ETH address).
 * @param {string} toToken - The token address you want to buy.
 * @param {string} amount - The amount to sell in base units (wei).
 * @param {string} walletAddress - The address of the taker's wallet.
 * @param {object} provider - The ethers.js provider instance.
 */
export const swapTokens = async (fromToken, toToken, amount, walletAddress, provider) => {
  try {
    // Step 1: Get a quote from the 0x API
    const response = await axios.get(swapApiUrl, {
      params: {
        buyToken: toToken,
        sellToken: fromToken,
        sellAmount: amount, // The amount to sell in base units (wei)
        takerAddress: walletAddress, // Address of the wallet performing the swap
      },
    });

    const quote = response.data;

    // Step 2: Send the swap transaction to Ethereum Sepolia network using ethers.js
    const signer = provider.getSigner();
    const tx = {
      from: walletAddress,
      to: quote.to, // The contract address provided in the quote
      data: quote.data, // The data field provided by 0x
      value: ethers.BigNumber.from(quote.value || '0'), // Use the value provided by the quote if any
      gasPrice: ethers.BigNumber.from(quote.gasPrice), // Gas price suggested in the quote
      gasLimit: ethers.BigNumber.from(quote.gas), // Gas limit suggested in the quote
    };

    // Step 3: Sign and send the transaction
    const txResponse = await signer.sendTransaction(tx);
    console.log('Transaction hash:', txResponse.hash);

    // Wait for the transaction to be confirmed
    const receipt = await txResponse.wait();
    console.log('Transaction confirmed:', receipt);

    return receipt; // Return the transaction receipt
  } catch (error) {
    console.error('Error performing swap:', error);
    throw error;
  }
};
