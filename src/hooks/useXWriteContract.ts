import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useEffect } from 'react';
import { writeTxNotification } from '@/components/notices/writeTxNotification.tsx';
import useTxStore from '@/store/transaction.ts';
import { WriteContractErrorType } from 'viem';
import { writeTxErrorNotification } from '@/components/notices/writeTxErrorNotification.tsx';

const useXWriteContract = ({
  showSubmittedModal = true,
  globalNotice = true,
  pendingPool = true,
  onSubmitted,
  onWriteSuccess,
  onError,
}: {
  showSubmittedModal?: boolean;
  globalNotice?: boolean;
  pendingPool?: boolean;
  onSubmitted?: (hash: string) => void;
  onWriteSuccess?: (e: any) => void;
  onError?: (e: WriteContractErrorType) => void;
}) => {
  const updateSubmitted = useTxStore((state) => state.updateSubmitted);
  const {
    data: hash,
    isPending: isSubmittedLoading,
    writeContractAsync,
    isSuccess: isSubmitted,
    error: submittedError,
    isError,
  } = useWriteContract();

  const {
    isSuccess,
    data: writeEvent,
    error: writeError,
    isError: isWriteError,
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  useEffect(() => {
    if (isError) {
      onError?.(submittedError as WriteContractErrorType);
      writeTxErrorNotification(hash);
    }
  }, [submittedError, isError]);

  useEffect(() => {
    if (isWriteError) {
      onError?.(writeError as WriteContractErrorType);
      writeTxErrorNotification(hash);
    }
  }, [writeError, isWriteError]);

  useEffect(() => {
    if (isSuccess && hash && globalNotice) {
      console.log(pendingPool);
      // pendingPool
      // TODO collect 2 pools
      writeTxNotification(hash);
      onWriteSuccess?.(writeEvent);
    }
  }, [isSuccess, hash, globalNotice]);

  useEffect(() => {
    if (isSubmitted && showSubmittedModal) {
      updateSubmitted({ hash });
      onSubmitted?.(hash);
    }
    return () => {
      updateSubmitted(null);
    };
  }, [isSubmitted, showSubmittedModal]);

  return {
    hash,
    submittedError,
    writeError,
    writeEvent,
    isSubmitted,
    isSuccess,
    isSubmittedLoading,
    writeContractAsync,
  };
};

export default useXWriteContract;
