import { useMutation } from '@tanstack/react-query';
import { getActivity } from '@/services/wallet.ts';
import { useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { formatCurrency } from '@/utils';
import useTokensWithPrice from '@/hooks/useTokensWithPrice.ts';

const useWalletDetail = () => {
  const { address } = useAccount();
  const { tokens, loading, isTokenLoading } = useTokensWithPrice();

  const {
    isPending: isActivityLoading,
    mutate: getList,
    data: activities,
  } = useMutation({
    mutationFn: getActivity,
  });

  useEffect(() => {
    if (address) {
      getList({ address, pageNum: 1, pageSize: 50 });
    }
  }, [address]);

  const totalPrice = useMemo(() => {
    const sum = (tokens || []).reduce(
      (prev, next) => prev + (next?.price || 0),
      0
    );
    return formatCurrency(sum, true);
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
