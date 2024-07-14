import { Address, erc20Abi } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits, parseUnits } from 'ethers';
import { useMemo, useState } from 'react';
import { isNumeric } from '@/utils/isNumeric.ts';
import { Token } from '@/types/swap.ts';
import useNativeToken from '@/hooks/useNativeToken.ts';
import useXWriteContract from '@/hooks/useXWriteContract.ts';

const useApprove = ({
  token,
  amount,
  spenderAddress,
}: {
  token: Token;
  amount: string;
  spenderAddress: Address;
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
    onWriteSuccess: refetch,
  });
  const isApproved = useMemo(() => {
    if (isNativeToken(token)) return true;
    if (allowance && isNumeric(amount) && decimals) {
      const allowanceAmount = formatUnits(allowance.toString(), decimals);
      return Number(amount) <= Number(allowanceAmount);
    }
    return false;
  }, [allowance, amount, decimals, token]);

  const approve = () => {
    setApproveLoading(true);
    writeContractAsync({
      address: token?.address as Address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [spenderAddress, parseUnits(amount, decimals)],
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
