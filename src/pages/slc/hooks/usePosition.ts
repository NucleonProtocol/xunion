import { useMemo } from 'react';
import { formatUnits } from 'ethers';
import { useReadContract } from 'wagmi';
import { XUNION_SLC_CONTRACT, XUNION_SWAP_CONTRACT } from '@/contracts';
import { Address } from 'viem';

const usePosition = ({ health }: { health: bigint[] }) => {
  const userAssetsValue = useMemo(() => {
    if (health) {
      const amount = health[1];
      return Number(formatUnits(amount, 18));
    }
    return 0;
  }, [health]);

  const userBorrowedAmount = useMemo(() => {
    if (health) {
      const amount = health[2];
      return Number(formatUnits(amount, 18));
    }
    return 0;
  }, [health]);

  const userAvailableAmount = useMemo(() => {
    if (health) {
      const amount = health[3];
      return Number(formatUnits(amount, 18));
    }
    return 0;
  }, [health]);

  const healthFactor = useMemo(() => {
    if (health) {
      const amount = health[0];
      return Number(formatUnits(amount, 18));
    }
    return 0;
  }, [health]);

  const { data: slcUnitPrice } = useReadContract({
    address: XUNION_SLC_CONTRACT.oracle.address as Address,
    abi: XUNION_SLC_CONTRACT.oracle.abi,
    functionName: 'getPrice',
    args: [XUNION_SWAP_CONTRACT.slc.address],
  });

  const borrowedTotalPrice = useMemo(() => {
    if (slcUnitPrice && health) {
      return Number(formatUnits(health[2] * (slcUnitPrice as bigint), 18));
    }
    return 0;
  }, [health, slcUnitPrice]);

  const availableTotalPrice = useMemo(() => {
    if (slcUnitPrice && health) {
      return Number(formatUnits(health[3] * (slcUnitPrice as bigint), 18));
    }
    return 0;
  }, [health, slcUnitPrice]);

  return {
    userAvailableAmount,
    userBorrowedAmount,
    userAssetsValue,
    borrowedTotalPrice,
    availableTotalPrice,
    healthFactor,
  };
};

export default usePosition;
