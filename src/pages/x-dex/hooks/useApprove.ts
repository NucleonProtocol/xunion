import { Address, erc20Abi } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits, parseUnits } from 'ethers';
import { useMemo, useState } from 'react';
import { isNumeric } from '@/utils/isNumeric.ts';
import { Token } from '@/types/swap.ts';
import useNativeToken from '@/hooks/useNativeToken.ts';
import useXWriteContract from '@/hooks/useXWriteContract.ts';
import { formatNumber } from '@/utils';

const useApprove = ({
  token,
  amount,
  spenderAddress,
  hf = 1.1,
}: {
  token: Token;
  amount: string;
  spenderAddress: Address;
  hf?: number;
}) => {
  const { isNativeToken } = useNativeToken();
  const [approveLoading, setApproveLoading] = useState(false);

  const isNative = useMemo(() => isNativeToken(token), [token]);

  const { address: ownerAddress } = useAccount();

  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    refetch,
  } = useReadContract({
    address: token?.address as Address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [ownerAddress!, spenderAddress],
    query: {
      enabled: !!token?.address && !isNative,
    },
  });
  console.log(allowance, isAllowanceLoading);
  const { data: decimals, isLoading: isDecimalsLoading } = useReadContract({
    address: token?.address as Address,
    abi: erc20Abi,
    functionName: 'decimals',
    query: {
      enabled: !!token?.address && !isNative,
    },
  });

  const {
    writeContractAsync,
    loading: isWriteLoading,
    isSubmittedLoading,
  } = useXWriteContract({
    onSoftWriteSuccess: () => {
      refetch();
    },
    forceReload: false,
  });
  const isApproved = useMemo(() => {
    if (isNativeToken(token)) return true;
    if (allowance && isNumeric(amount) && decimals) {
      return Number(formatUnits(allowance, decimals)) > Number(amount);
    }
    return false;
  }, [allowance, amount, decimals, token]);

  const approve = () => {
    setApproveLoading(true);

    const amountIn = (
      formatNumber(Number(amount) < 0.0001 ? 0.001 : Number(amount), 4) *
      hf *
      10 ** (decimals || 18)
    ).toFixed(0);

    writeContractAsync({
      address: token?.address as Address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [spenderAddress, amountIn as unknown as bigint],
    }).finally(() => {
      setApproveLoading(false);
    });
  };

  const loading =
    isAllowanceLoading ||
    isDecimalsLoading ||
    approveLoading ||
    isWriteLoading ||
    isSubmittedLoading;

  return {
    isApproved,
    approve,
    loading,
  };
};

export default useApprove;
