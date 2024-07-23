import { useAccount, useReadContract } from 'wagmi';
import { XUNION_LENDING_CONTRACT, XUNION_SLC_CONTRACT } from '@/contracts';
import { Address, erc20Abi } from 'viem';
import { useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getLendingAssets } from '@/services/lending.ts';
import useMulticall, { ContractCall } from '@/hooks/useMulticall.ts';
import { formatUnits } from 'ethers';
import { formatNumber } from '@/hooks/useErc20Balance.ts';
import useNativeToken from '@/hooks/useNativeToken.ts';
import { LendingAsset } from '@/types/Lending.ts';
import { Token } from '@/types/swap.ts';

const useMarket = () => {
  const { getRealAddress, isNativeToken, getNativeTokenBalance } =
    useNativeToken();
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
      const depositAmounts = (userAssets as bigint[][])[1];
      const lendingAmounts = (userAssets as bigint[][])[2];
      const depositInterests = (userAssets as bigint[][])[3];
      const lendingInterests = (userAssets as bigint[][])[4];
      const totalAvailableAmounts = (userAssets as bigint[][])[5];
      const calls: ContractCall[] = tokens.map((tokenAddress) => ({
        name: 'getPrice',
        abi: XUNION_SLC_CONTRACT.oracle.abi,
        address: XUNION_SLC_CONTRACT.oracle.address as Address,
        values: [getRealAddress({ address: tokenAddress } as Token)],
      }));

      const calls2: ContractCall[] = tokens?.map((tokenAddress) => ({
        name: 'balanceOf',
        abi: erc20Abi,
        address: getRealAddress({ address: tokenAddress } as Token),
        values: [address],
      }));

      multiCall(calls)
        .then(async (allUnitPrice) => {
          return multiCall(calls2).then(async (allBalance) => {
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
                const depositAmount = Number(
                  formatUnits(depositAmounts[index])
                );
                const lendingAmount = Number(
                  formatUnits(lendingAmounts[index])
                );
                const depositTotalPrice = formatNumber(
                  depositAmount * unitPrice,
                  6
                );
                const lendingTotalPrice = formatNumber(
                  lendingAmount * unitPrice,
                  6
                );
                const lendingInterest =
                  Number(lendingInterests[index].toString()) / 100;
                const depositInterest =
                  Number(depositInterests[index].toString()) / 100;
                const erc20Balance = Number(
                  formatUnits(allBalance.returnData[index])
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
                  depositAmount,
                  depositInterest,
                  lendingAmount,
                  lendingInterest,
                  depositTotalPrice,
                  lendingTotalPrice,
                  availableTotalPrice,
                  availableAmount,
                  canCollateral,
                };
                if (isNativeToken(asset.token)) {
                  const balance = await getNativeTokenBalance();
                  newData.push({
                    ...data,
                    erc20TotalPrice: formatNumber(balance * unitPrice, 6),
                    erc20Balance: formatNumber(balance, 6),
                  });
                } else {
                  newData.push({
                    ...data,
                    erc20TotalPrice: formatNumber(erc20Balance * unitPrice, 6),
                    erc20Balance,
                  });
                }
              }
            }
            setLendingAssets(newData);
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userAssets, address, data, userMode]);

  const netWorth = useMemo(() => {
    return userProfile ? (userProfile as bigint[])[0] : 0n;
  }, [userProfile]);

  return {
    netWorth,
    loading: loading || isLoading || isPending,
    lendingAssets,
  };
};

export default useMarket;