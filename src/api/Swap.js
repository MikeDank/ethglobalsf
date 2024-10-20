import Web3 from 'web3';
import axios from 'axios';

// Initialize Web3 with the public Sepolia RPC endpoint
const web3 = new Web3('https://rpc.sepolia.org'); // Public Sepolia RPC

/**
 * Fetches the swap data from 0x API.
 * @param {string} buyTokenAddress - The address of the token to buy.
 * @param {number} sellAmount - The amount of ETH to sell (in ETH, not wei).
 * @param {string} walletAddress - The wallet address of the user.
 */
const initiateSwap = async (buyTokenAddress, sellAmount, walletAddress) => {
  try {
    // Convert sellAmount to wei (1 ETH = 10^18 wei)
    const sellAmountWei = web3.utils.toWei(sellAmount.toString(), 'ether');

    // Fetch swap quote from 0x API
    const response = await axios.get('https://sepolia.api.0x.org/swap/v1/quote', {
      params: {
        buyToken: buyTokenAddress, // Token to buy
        sellToken: 'ETH', // Selling ETH for the token
        sellAmount: sellAmountWei, // Amount of ETH to sell
        takerAddress: walletAddress, // The wallet address to receive the tokens
        slippagePercentage: 0.01, // 1% slippage allowed
      },
      headers: {
        '0x-api-key': process.env.REACT_APP_0X_API_KEY, // Use your 0x API key from .env file
      },
    });

    // Return the swap data from 0x
    return response.data;
  } catch (error) {
    console.error('Error fetching swap data from 0x API:', error);
    throw error;
  }
};

/**
 * Signs and sends the transaction to complete the swap using Privy's signing service.
 * @param {object} swapData - The data returned by the 0x API containing transaction details.
 * @param {object} privy - The Privy SDK object with the user's wallet and signing methods.
 * @param {string} walletAddress - The user's wallet address managed by Privy.
 */
const signAndSendTransaction = async (swapData, privy, walletAddress) => {
  try {
    // Prepare the transaction data
    const transactionParams = {
      from: walletAddress,
      to: swapData.to, // The contract address to call (e.g., the Uniswap or 0x contract)
      data: swapData.data, // The encoded function call data
      value: web3.utils.toHex(swapData.value), // ETH to send with the transaction (in wei)
      gas: swapData.gas || '21000', // Use gas estimate from the 0x API or a default value
    };

    // Estimate gas
    const gasEstimate = await web3.eth.estimateGas(transactionParams);
    transactionParams.gas = gasEstimate;

    // Use Privy to sign the transaction
    const signedTransaction = await privy.wallet.signTransaction(transactionParams);

    // Send the signed transaction using Web3.js
    const txReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    console.log('Transaction successful:', txReceipt);

    return txReceipt;
  } catch (error) {
    console.error('Error signing or sending transaction:', error);
    throw error;
  }
};

/**
 * Main function to handle the entire swap process.
 * @param {string} buyTokenAddress - The address of the token to buy.
 * @param {number} sellAmount - The amount of ETH to sell (in ETH, not wei).
 * @param {string} walletAddress - The user's wallet address.
 * @param {object} privy - The Privy SDK object with the user's wallet and signing methods.
 */
export const executeSwap = async (buyTokenAddress, sellAmount, walletAddress, privy) => {
  try {
    // Step 1: Fetch swap quote from the 0x API
    const swapData = await initiateSwap(buyTokenAddress, sellAmount, walletAddress);

    // Step 2: Sign and send the transaction using Privy
    const txReceipt = await signAndSendTransaction(swapData, privy, walletAddress);

    console.log('Swap completed successfully:', txReceipt);
    return txReceipt;
  } catch (error) {
    console.error('Swap failed:', error);
    throw error;
  }
};
