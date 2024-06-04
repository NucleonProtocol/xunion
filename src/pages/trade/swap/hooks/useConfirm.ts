import { Address, erc20Abi } from 'viem';
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { Token } from '@/types/swap.ts';
import { useEffect } from 'react';
import { writeTxNotification } from '@/components/notices/writeTxNotification.tsx';
import useTxStore from '@/store/transaction.ts';
import dayjs from 'dayjs';
import { XUNION_SWAP_CONTRACT } from '@/contracts';

const useConfirm = ({
  inputToken,
  payAmount,
  deadline,
  slippage,
  receiveAmount,
  outputToken,
  onFillSwap,
}: {
  inputToken?: Token;
  outputToken?: Token;
  payAmount: string;
  receiveAmount: string;
  slippage: string;
  deadline: string;
  onFillSwap?: () => void;
}) => {
  const updateSubmitted = useTxStore((state) => state.updateSubmitted);

  const { data: fromDecimals } = useReadContract({
    address: inputToken?.address as Address,
    abi: erc20Abi,
    functionName: 'decimals',
  });

  const { data: toDecimals } = useReadContract({
    address: outputToken?.address as Address,
    abi: erc20Abi,
    functionName: 'decimals',
  });

  const {
    data: hash,
    isPending: isSubmittedLoading,
    writeContractAsync,
    isSuccess: isSubmitted,
  } = useWriteContract();

  const { isSuccess } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  useEffect(() => {
    if (isSuccess && hash) {
      writeTxNotification(hash);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSubmitted) {
      updateSubmitted({ hash });
      onFillSwap?.();
    }
  }, [isSubmitted]);

  const confirm = () => {
    if (fromDecimals && toDecimals) {
      const { address, abi } = XUNION_SWAP_CONTRACT.interface;

      const amountIn = Number(payAmount) * 10 ** fromDecimals;
      const amountOut = Number(receiveAmount) * 10 ** toDecimals;
      const limits =
        Number(slippage === '-1' ? '0.5' : slippage) *
        Number(receiveAmount) *
        0.01 *
        10 ** toDecimals;

      const date = dayjs().add(Number(deadline), 'minute').unix() + 100;

      writeContractAsync({
        address: address as Address,
        abi,
        functionName: 'xexchange',
        args: [
          [inputToken?.address, outputToken?.address],
          amountIn,
          amountOut,
          limits,
          date,
        ],
      });
    }
  };

  return {
    confirm,
    isSubmittedLoading,
  };
};

export default useConfirm;
