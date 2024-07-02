import { Token } from '@/types/swap.ts';
import {
  NATIVE_GAS_TOKENS,
  NATIVE_SWAP_TOKENS,
  NATIVE_TOKENS,
  ZERO_ADDRESS,
} from '@/contracts';
import { useAccount } from 'wagmi';

const useNativeToken = () => {
  const { chainId = 71 } = useAccount();

  const getGasTokenAddress = (token: Token) => {
    return NATIVE_GAS_TOKENS[token?.chainId || chainId];
  };

  const getSwapTokenAddress = (token: Token) => {
    return NATIVE_SWAP_TOKENS[token?.chainId || chainId];
  };

  const isNativeToken = (token: Token) => {
    if (token?.address === ZERO_ADDRESS) {
      if (token?.symbol === NATIVE_TOKENS[token.chainId || chainId]) {
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

  return {
    getGasTokenAddress,
    isNativeToken,
    getRealAddress,
    getSwapTokenAddress,
    getRealSwapAddress,
  };
};

export default useNativeToken;
