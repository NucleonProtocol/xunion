import { useCallback } from 'react';
import useInterfaceContract from '@/hooks/useInterfaceContract.ts';
import { formatUnits } from 'ethers';
import { isSLCToken, XUNION_SWAP_CONTRACT, ZERO_ADDRESS } from '@/contracts';
import { Token } from '@/types/swap.ts';
import useNativeToken from '@/hooks/useNativeToken.ts';

const useLP = () => {
  const contract = useInterfaceContract();
  const { isNativeToken, getGasTokenAddress, getRealAddress } =
    useNativeToken();

  const getSLCPairAddress = async (token: Token) => {
    let tokenAddress = token?.address;
    if (isSLCToken(token?.address)) {
      tokenAddress = XUNION_SWAP_CONTRACT.usdt.address;
    }

    if (isNativeToken(token)) {
      tokenAddress = getGasTokenAddress(token);
    }
    return await contract
      .getCoinToStableLpPair(tokenAddress)
      .then((res) => (res === ZERO_ADDRESS ? '' : res));
  };
  const getLpReserve = async (lpAddress: string) => {
    return await contract.getLpReserve(lpAddress);
  };

  const getLpPair = async (lpAddress: string): Promise<string[]> => {
    return await contract.getLpPair(lpAddress);
  };
  const getPairAddress = async (tokenA: Token, tokenB: Token) => {
    return await contract
      .getPair(getRealAddress(tokenA), getRealAddress(tokenB))
      .then((res) => (res === ZERO_ADDRESS ? '' : res));
  };

  const getLpPrice = useCallback(async (lpAddress: string) => {
    const lpPrice = await contract.getLpPrice(lpAddress);
    return Number(formatUnits(lpPrice));
  }, []);

  return {
    getLpPrice,
    getSLCPairAddress,
    getLpReserve,
    getLpPair,
    getPairAddress,
  };
};

export default useLP;
