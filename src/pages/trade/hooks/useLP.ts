import { useCallback } from 'react';
import useInterfaceContract from '@/hooks/useInterfaceContract.ts';
import { formatUnits } from 'ethers';
import { isSLCToken } from '@/contracts';

const useLP = () => {
  const contract = useInterfaceContract();

  const getSLCPairAddress = async (coinAddress: string) => {
    if (isSLCToken(coinAddress)) {
      return '0x0000000000000000000000000000000000000000';
    }
    return await contract
      .getCoinToStableLpPair(coinAddress)
      .then((res) =>
        res === '0x0000000000000000000000000000000000000000' ? '' : res
      );
  };
  const getLpReserve = async (lpAddress: string) => {
    return await contract.getLpReserve(lpAddress);
  };

  const getLpPair = async (lpAddress: string): Promise<string[]> => {
    return await contract.getLpPair(lpAddress);
  };
  const getPairAddress = async (
    tokenAAddress: string,
    tokenBAddress: string
  ) => {
    return await contract
      .getPair(tokenAAddress, tokenBAddress)
      .then((res) =>
        res === '0x0000000000000000000000000000000000000000' ? '' : res
      );
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
