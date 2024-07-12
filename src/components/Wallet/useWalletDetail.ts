import { useMutation } from '@tanstack/react-query';
import { getActivity } from '@/services/wallet.ts';
import { useEffect, useMemo, useState } from 'react';
import { getTokenList } from '@/services/token.ts';
import { useAccount } from 'wagmi';
import useMulticall, { ContractCall } from '@/hooks/useMulticall.ts';
import { XUNION_SLC_CONTRACT } from '@/contracts';
import { Address, erc20Abi } from 'viem';
import { formatUnits } from 'ethers';
import { formatNumber } from '@/hooks/useErc20Balance.ts';
import { Token } from '@/types/swap.ts';
import { formatCurrency } from '@/utils';

const useWalletDetail = () => {
  const { address } = useAccount();
  const { multiCall } = useMulticall();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    isPending: isTokenLoading,
    mutate: getTokens,
    data: tokenData,
  } = useMutation({
    mutationFn: getTokenList,
  });
  const {
    isPending: isActivityLoading,
    mutate: getList,
    data: activities,
  } = useMutation({
    mutationFn: getActivity,
  });

  useEffect(() => {
    if (address) {
      getTokens({
        pageNum: 1,
        pageSize: 50,
      });
      getList({ address, pageNum: 1, pageSize: 50 });
    }
  }, [address]);

  useEffect(() => {
    if (tokenData && tokenData.items?.length && address) {
      setLoading(true);
      const calls: ContractCall[] = tokenData.items?.map((token) => ({
        name: 'getPrice',
        abi: XUNION_SLC_CONTRACT.oracle.abi,
        address: XUNION_SLC_CONTRACT.oracle.address as Address,
        values: [token.address],
      }));
      const calls2: ContractCall[] = tokenData.items?.map((item) => ({
        name: 'balanceOf',
        abi: erc20Abi,
        address: item.address,
        values: [address],
      }));
      multiCall(calls)
        .then(async (allUnitPrice) => {
          return multiCall(calls2).then((allBalance) => {
            const newData = tokenData.items.map((item, index) => {
              const unitPrice = Number(
                formatUnits(allUnitPrice.returnData[index])
              );
              const amount = Number(formatUnits(allBalance.returnData[index]));
              return {
                ...item,
                amount: formatNumber(amount, 6),
                price: formatNumber(amount * unitPrice, 6),
              };
            });
            setTokens(newData);
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [tokenData, address]);

  const totalPrice = useMemo(() => {
    const sum = (tokens || []).reduce(
      (prev, next) => prev + (next?.price || 0),
      0
    );
    return formatCurrency(sum, 4);
  }, [tokens]);

  return {
    isTokenLoading,
    isActivityLoading,
    tokens,
    activities,
    loading,
    totalPrice,
  };
};

export default useWalletDetail;
