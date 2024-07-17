import { useAccount, useReadContract } from 'wagmi';
import { XUNION_LENDING_CONTRACT } from '@/contracts';
import { Address } from 'viem';
import { useMemo } from 'react';

const useDashboard = () => {
  const { address } = useAccount();

  const { data: userProfile } = useReadContract({
    address: XUNION_LENDING_CONTRACT.interface.address as Address,
    abi: XUNION_LENDING_CONTRACT.interface.abi,
    functionName: 'userProfile',
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  const { data: health } = useReadContract({
    address: XUNION_LENDING_CONTRACT.interface.address as Address,
    abi: XUNION_LENDING_CONTRACT.interface.abi,
    functionName: 'viewUsersHealthFactor',
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  const netWorth = useMemo(() => {
    return userProfile ? (userProfile as bigint[])[0] : 0n;
  }, [userProfile]);
  const netApy = useMemo(() => {
    return userProfile ? (userProfile as bigint[])[1] : 0n;
  }, [userProfile]);

  return { netWorth, netApy, health: Number(String(health || 0n)) };
};

export default useDashboard;
