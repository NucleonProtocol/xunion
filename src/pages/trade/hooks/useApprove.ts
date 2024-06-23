import { Address, erc20Abi } from 'viem';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { formatUnits, parseUnits } from 'ethers';
import { useEffect, useMemo } from 'react';
import { writeTxNotification } from '@/components/notices/writeTxNotification.tsx';
import useTxStore from '@/store/transaction.ts';
import { isNumeric } from '@/utils/isNumeric.ts';

const useApprove = ({
  tokenAddress,
  amount,
  spenderAddress,
}: {
  tokenAddress: Address;
  amount: string;
  spenderAddress: Address;
}) => {
  const updateSubmitted = useTxStore((state) => state.updateSubmitted);
  const { address: ownerAddress } = useAccount();
  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    refetch,
  } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [ownerAddress!, spenderAddress],
    query: {
      enabled: !!tokenAddress,
    },
  });
  const { data: decimals, isLoading: isDecimalsLoading } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'decimals',
    query: {
      enabled: !!tokenAddress,
    },
  });

  const {
    data: hash,
    writeContractAsync,
    isSuccess: isSubmitted,
  } = useWriteContract();

  const {
    isSuccess,
    isError,
    isLoading: isTxLoading,
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  useEffect(() => {
    if (isSuccess && hash) {
      writeTxNotification(hash);
      refetch();
    }
    if (isError) {
      console.log(isError);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSubmitted) {
      updateSubmitted({ hash });
    }
  }, [isSubmitted]);

  const isApproved = useMemo(() => {
    if (allowance && isNumeric(amount) && decimals) {
      const allowanceAmount = formatUnits(allowance.toString(), decimals);
      return Number(amount) <= Number(allowanceAmount);
    }
    return false;
  }, [allowance, amount, decimals]);

  const approve = () => {
    writeContractAsync({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [spenderAddress, parseUnits(amount, decimals)],
    });
  };

  const loading = isAllowanceLoading || isDecimalsLoading || isTxLoading;
  return {
    isApproved,
    approve,
    loading,
  };
};

export default useApprove;
