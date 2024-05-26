import { useCallback } from 'react';
import useInterfaceContract from '@/hooks/useInterfaceContract.ts';
import { formatUnits } from 'ethers';

const useLP = () => {
  const contract = useInterfaceContract();

  const getLpPrice = useCallback(async (lpAddress: string) => {
    const lpPrice = await contract.getLpPrice(lpAddress);
    return Number(formatUnits(lpPrice));
  }, []);

  return {
    getLpPrice,
  };
};

export default useLP;
