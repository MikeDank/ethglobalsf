const API_URL = 'https://sepolia.api.0x.org/swap/v1/quote';

/**
 * Fetches the swap quote from the 0x Swap API.
 * @param {string} buyTokenAddress - The address of the token to buy.
 * @param {number} sellAmount - The amount of ETH to sell (in ETH, not wei).
 * @param {string} walletAddress - The wallet address of the user performing the swap.
 */
export const initiateSwap = async (buyTokenAddress, sellAmount, walletAddress) => {
  try {
    const queryParams = new URLSearchParams({
      buyToken: buyTokenAddress,
      sellToken: 'ETH',
      sellAmount: (sellAmount * 1e18).toString(), // Convert ETH to wei
      takerAddress: walletAddress,
      slippagePercentage: 0.01, // 1% slippage tolerance
    });

    const response = await fetch(`${API_URL}?${queryParams.toString()}`, {
      headers: {
        '0x-api-key': '6f30ccc1-fcb8-4951-9e65-28fe974fdd21',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch swap quote: ${response.statusText}`);
    }

    const swapData = await response.json();
    console.log('Swap quote data:', swapData);

    // Return the swap data that will be used to sign and send the transaction
    return swapData;
  } catch (error) {
    console.error('Error fetching swap quote:', error);
    throw error;
  }
};
