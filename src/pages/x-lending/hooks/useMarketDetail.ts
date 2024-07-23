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
import { useParams } from 'react-router-dom';

const useMarketDetail = () => {
  const params = useParams<{ address: string }>();
  const tokenAddress = params.address;
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

  const { data: userMode } = useReadContract({
    address: XUNION_LENDING_CONTRACT.interface.address as Address,
    abi: XUNION_LENDING_CONTRACT.interface.abi,
    functionName: 'userMode',
    args: [address!],
    query: {
      enabled: !!address,
    },
  });
  const { data: userProfile } = useReadContract({
    address: XUNION_LENDING_CONTRACT.interface.address as Address,
    abi: XUNION_LENDING_CONTRACT.interface.abi,
    functionName: 'userProfile',
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
    if (userAssets && data?.items?.length && address && userMode) {
      setLoading(true);
      const tokens = (userAssets as string[][])[0];
      const totalAvailableAmounts = (userAssets as bigint[][])[5];
      const calls: ContractCall[] = tokens.map((tokenAddress) => ({
        name: 'getPrice',
        abi: XUNION_SLC_CONTRACT.oracle.abi,
        address: XUNION_SLC_CONTRACT.oracle.address as Address,
        values: [getRealAddress({ address: tokenAddress } as Token)],
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

              const availableAmount = Number(
                formatUnits(totalAvailableAmounts[index])
              );
              const availableTotalPrice = formatNumber(
                availableAmount * unitPrice,
                6
              );
              const mode = String((userMode as number[])[0]);
              const canCollateral =
                (mode === '0' && asset.lending_mode_num !== '1') ||
                (mode === '1' && asset.lending_mode_num === '1') ||
                (mode !== '0' &&
                  mode !== '1' &&
                  asset.lending_mode_num === mode);

              const data = {
                ...asset,
                availableTotalPrice,
                availableAmount,
                canCollateral,
              };
              newData.push(data);
            }
          }
          setLendingAssets(newData);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userAssets, address, data, userMode]);

  const netWorth = useMemo(() => {
    return userProfile ? (userProfile as bigint[])[0] : 0n;
  }, [userProfile]);

  const tokenAsset = (lendingAssets || []).find(
    (item) => item.token.address.toLowerCase() === tokenAddress?.toLowerCase()
  );

  return {
    netWorth,
    loading: isLoading || isPending || loading,
    tokenAsset,
    lendingAssets,
  };
};

export default useMarketDetail;
