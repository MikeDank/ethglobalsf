/**
 * Returns the wallet address of the authenticated user.
 * The wallet address must be passed to this function from the component that uses `usePrivy`.
 * @param {string} walletAddress - The wallet address of the authenticated user.
 * @returns {string} The wallet address or throws an error if not available.
 */
export const getPrivyWalletAddress = (walletAddress) => {
  if (!walletAddress) {
    throw new Error('No wallet address found for the user.');
  }

  return walletAddress;
};
