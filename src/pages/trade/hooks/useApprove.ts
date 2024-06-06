import { Address, erc20Abi } from 'viem';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { Token } from '@/types/swap.ts';
import { formatUnits, parseUnits } from 'ethers';
import { useEffect, useMemo } from 'react';
import { isNumeric } from '@/pages/trade/hooks/useSwap.ts';
import { writeTxNotification } from '@/components/notices/writeTxNotification.tsx';
import useTxStore from '@/store/transaction.ts';

const useApprove = ({
  inputToken,
  payAmount,
  spenderAddress,
}: {
  inputToken?: Token;
  payAmount: string;
  spenderAddress: Address;
}) => {
  const tokenAddress = inputToken?.address as Address;
  const updateSubmitted = useTxStore((state) => state.updateSubmitted);
  const { address: ownerAddress } = useAccount();
  const {
    data: allowance,
    isPending: isAllowanceLoading,
    refetch,
  } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [ownerAddress!, spenderAddress],
  });
  const { data: decimals, isPending: isDecimalsLoading } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'decimals',
  });

  const {
    data: hash,
    isPending: isApproveLoading,
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
    if (allowance && isNumeric(payAmount) && decimals) {
      const allowanceAmount = formatUnits(allowance.toString(), decimals);
      return Number(payAmount) <= Number(allowanceAmount);
    }
    return false;
  }, [allowance, payAmount, decimals]);

  const approve = () => {
    writeContractAsync({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [spenderAddress, parseUnits(payAmount, decimals)],
    });
  };

  const loading =
    isAllowanceLoading || isDecimalsLoading || isApproveLoading || isTxLoading;
  return {
    isApproved,
    approve,
    loading,
  };
};

export default useApprove;
