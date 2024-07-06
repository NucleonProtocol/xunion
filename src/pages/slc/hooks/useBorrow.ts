import { useAccount, useReadContract } from 'wagmi';
import { Address } from 'viem';
import { XUNION_SLC_CONTRACT } from '@/contracts';
import { useMemo } from 'react';
import { formatUnits } from 'ethers';

const useBorrow = () => {
  const { address } = useAccount();
  const { data: overview, isLoading: isOverviewLoading } = useReadContract({
    address: XUNION_SLC_CONTRACT.interface.address as Address,
    abi: XUNION_SLC_CONTRACT.interface.abi,
    functionName: 'licensedAssetOverview',
  });
  const { data: health, isLoading: isHealthLoading } = useReadContract({
    address: XUNION_SLC_CONTRACT.interface.address as Address,
    abi: XUNION_SLC_CONTRACT.interface.abi,
    functionName: 'viewUsersHealthFactor',
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  const { data: userAssets, isLoading: isAssetsLoading } = useReadContract({
    address: XUNION_SLC_CONTRACT.interface.address as Address,
    abi: XUNION_SLC_CONTRACT.interface.abi,
    functionName: 'userAssetOverview',
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  const tvlAmount = useMemo(() => {
    if (overview) {
      const amount = (overview as bigint[])[0];
      return Number(formatUnits(amount, 18));
    }
    return 0;
  }, [overview]);

  const totalSupply = useMemo(() => {
    if (overview) {
      const amount = (overview as bigint[])[1];
      return Number(formatUnits(amount, 18));
    }
    return 0;
  }, [overview]);

  const unitPrice = useMemo(() => {
    if (overview) {
      const amount = (overview as bigint[])[2];
      return Number(formatUnits(amount, 18));
    }
    return 0;
  }, [overview]);

  return {
    tvlAmount,
    totalSupply,
    unitPrice,
    health,
    userAssets,
    isAssetsLoading,
    isHealthLoading,
    isOverviewLoading,
  };
};

export default useBorrow;
