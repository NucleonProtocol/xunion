import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { useEffect } from 'react';
import { writeTxNotification } from '@/components/notices/writeTxNotification.tsx';
import { writeTxErrorNotification } from '@/components/notices/writeTxErrorNotification.tsx';
import useTxStore from '@/store/transaction.ts';
import { WriteContractErrorType } from 'viem';

const useXSendTransaction = ({
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
    sendTransactionAsync,
    isError,
    error: submittedError,
    data: hash,
    isSuccess: isSubmitted,
    isPending: isSubmittedLoading,
  } = useSendTransaction();
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
      writeTxErrorNotification(hash);
      onError?.(submittedError as WriteContractErrorType);
    }
  }, [submittedError, isError]);

  useEffect(() => {
    if (isWriteError) {
      writeTxErrorNotification(hash);
      onError?.(writeError as WriteContractErrorType);
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
    sendTransactionAsync,
  };
};

export default useXSendTransaction;
