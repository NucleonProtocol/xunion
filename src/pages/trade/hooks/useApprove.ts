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
import { Token } from '@/types/swap.ts';
import useNativeToken from '@/hooks/useNativeToken.ts';

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

  const isNative = useMemo(() => isNativeToken(token), [token]);

  const updateSubmitted = useTxStore((state) => state.updateSubmitted);
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
    if (isNativeToken(token)) return true;
    if (allowance && isNumeric(amount) && decimals) {
      const allowanceAmount = formatUnits(allowance.toString(), decimals);
      return Number(amount) <= Number(allowanceAmount);
    }
    return false;
  }, [allowance, amount, decimals, token]);

  const approve = () => {
    writeContractAsync({
      address: token?.address as Address,
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
