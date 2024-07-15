import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';
import { writeTxNotification } from '@/components/notices/writeTxNotification.tsx';
import useTxStore from '@/store/transaction.ts';
import { WriteContractErrorType } from 'viem';
import { writeTxErrorNotification } from '@/components/notices/writeTxErrorNotification.tsx';

const useXWriteContract = ({
  showSubmittedModal = true,
  globalNotice = true,
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
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
      onError?.(submittedError as WriteContractErrorType);
      const reasonMatch = submittedError?.message.match(/reason: (.*)/);
      writeTxErrorNotification(hash, reasonMatch?.[1]);
    }
  }, [submittedError, isError]);

  useEffect(() => {
    if (isWriteError) {
      setLoading(false);
      onError?.(writeError as WriteContractErrorType);
      const reasonMatch = writeError?.message.match(/reason: (.*)/);
      writeTxErrorNotification(hash, reasonMatch?.[1]);
    }
  }, [writeError, isWriteError]);

  useEffect(() => {
    if (isSuccess && hash && globalNotice) {
      setLoading(false);
      // pendingPool
      // TODO collect 2 pools
      writeTxNotification(hash);
      onWriteSuccess?.(writeEvent);
    }
  }, [isSuccess, hash, globalNotice]);

  useEffect(() => {
    if (isSubmitted && showSubmittedModal) {
      setLoading(true);
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
    loading,
    isSubmittedLoading,
    writeContractAsync,
  };
};

export default useXWriteContract;
