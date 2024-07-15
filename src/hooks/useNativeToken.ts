import { Token } from '@/types/swap.ts';
import {
  NATIVE_GAS_TOKENS,
  NATIVE_SWAP_TOKENS,
  NATIVE_TOKENS,
} from '@/contracts';
import { useAccount } from 'wagmi';
import useProvider from '@/hooks/useProvider.ts';
import { formatUnits } from 'ethers';

const useNativeToken = () => {
  const { chainId = 71, address } = useAccount();

  const provider = useProvider();
  const getGasTokenAddress = (token: Token) => {
    return NATIVE_GAS_TOKENS[token?.chainId || chainId];
  };

  const getSwapTokenAddress = (token: Token) => {
    return NATIVE_SWAP_TOKENS[token?.chainId || chainId];
  };
  const isNativeToken = (token: Token) => {
    if (
      token?.address.toLowerCase() ===
      NATIVE_SWAP_TOKENS[token?.chainId || chainId]?.toLowerCase?.()
    ) {
      if (token?.symbol === NATIVE_TOKENS[token?.chainId || chainId]) {
        return true;
      }
    }
    return false;
  };

  const getRealAddress = (token: Token) => {
    if (isNativeToken(token)) {
      return getGasTokenAddress(token);
    }
    return token?.address;
  };

  const getRealSwapAddress = (token: Token) => {
    if (isNativeToken(token)) {
      return getSwapTokenAddress(token);
    }
    return token?.address;
  };

  const getNativeTokenBalance = async () => {
    if (address) {
      const amount = await provider.getBalance(address).catch(() => 0n);
      return Number(formatUnits(amount, 18));
    }
    return 0;
  };

  return {
    getGasTokenAddress,
    isNativeToken,
    getRealAddress,
    getSwapTokenAddress,
    getRealSwapAddress,
    getNativeTokenBalance,
  };
};

export default useNativeToken;
