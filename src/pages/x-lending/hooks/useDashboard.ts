import { useAccount, useReadContract } from 'wagmi';
import { XUNION_LENDING_CONTRACT, XUNION_SLC_CONTRACT } from '@/contracts';
import { Address } from 'viem';
import { useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getLendingAssets } from '@/services/lending.ts';
import useMulticall, { ContractCall } from '@/hooks/useMulticall.ts';
import { formatUnits } from 'ethers';
import { formatNumber } from '@/hooks/useErc20Balance.ts';
import useNativeToken from '@/hooks/useNativeToken.ts';
import { LendingAsset } from '@/types/Lending.ts';
import { Token } from '@/types/swap.ts';

const useDashboard = () => {
  const { getRealAddress } = useNativeToken();
  const { address } = useAccount();
  const { multiCall } = useMulticall();
  const [lendingAssets, setLendingAssets] = useState<LendingAsset[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    mutate: getAssets,
    data,
    isPending,
  } = useMutation({
    mutationFn: getLendingAssets,
  });

  useEffect(() => {
    getAssets({ pageSize: 20, pageNum: 1 });
  }, []);

  const { data: userProfile } = useReadContract({
    address: XUNION_LENDING_CONTRACT.interface.address as Address,
    abi: XUNION_LENDING_CONTRACT.interface.abi,
    functionName: 'userProfile',
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  const { data: health } = useReadContract({
    address: XUNION_LENDING_CONTRACT.interface.address as Address,
    abi: XUNION_LENDING_CONTRACT.interface.abi,
    functionName: 'viewUsersHealthFactor',
    args: [address!],
    query: {
      enabled: !!address,
    },
  });
  const { data: userAssets, isLoading } = useReadContract({
    address: XUNION_LENDING_CONTRACT.interface.address as Address,
    abi: XUNION_LENDING_CONTRACT.interface.abi,
    functionName: 'userAssetDetail',
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    if (userAssets && data?.items?.length && address) {
      setLoading(true);
      const tokens = (userAssets as string[][])[0];
      const depositAmounts = (userAssets as bigint[][])[1];
      const lendingAmounts = (userAssets as bigint[][])[2];
      const depositInterests = (userAssets as bigint[][])[3];
      const lendingInterests = (userAssets as bigint[][])[4];
      const calls: ContractCall[] = tokens.map((address) => ({
        name: 'getPrice',
        abi: XUNION_SLC_CONTRACT.oracle.abi,
        address: XUNION_SLC_CONTRACT.oracle.address as Address,
        values: [getRealAddress({ address } as Token)],
      }));

      multiCall(calls)
        .then(async (allUnitPrice) => {
          const newData = [];
          for (let index = 0; index < tokens.length; index++) {
            const tokenAddress = tokens[index];
            const asset = (data.items || []).find(
              (n) =>
                n.token.address?.toLowerCase() === tokenAddress?.toLowerCase()
            );
            if (asset) {
              const unitPrice = Number(
                formatUnits(allUnitPrice.returnData[index])
              );
              const depositAmount = Number(formatUnits(depositAmounts[index]));
              const lendingAmount = Number(formatUnits(lendingAmounts[index]));
              const lendingInterest = Number(
                formatUnits(lendingInterests[index])
              );
              const depositInterest = Number(
                formatUnits(depositInterests[index])
              );
              newData.push({
                ...asset,
                depositAmount,
                depositInterest,
                lendingAmount,
                lendingInterest,
                depositTotalPrice: formatNumber(depositAmount * unitPrice, 6),
                lendingTotalPrice: formatNumber(lendingAmount * unitPrice, 6),
              });
            }
          }
          console.log(newData);
          setLendingAssets(newData);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userAssets, address, data]);

  const netWorth = useMemo(() => {
    return userProfile ? (userProfile as bigint[])[0] : 0n;
  }, [userProfile]);
  const netApy = useMemo(() => {
    return userProfile ? (userProfile as bigint[])[1] : 0n;
  }, [userProfile]);

  return {
    netWorth,
    netApy,
    health: Number(String(health || 0n)),
    loading: loading || isLoading || isPending,
    lendingAssets,
  };
};

export default useDashboard;
