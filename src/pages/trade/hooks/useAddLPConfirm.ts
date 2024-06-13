import { Address, erc20Abi } from 'viem';
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { useEffect, useMemo } from 'react';
import { writeTxNotification } from '@/components/notices/writeTxNotification.tsx';
import useTxStore from '@/store/transaction.ts';
import { XUNION_SWAP_CONTRACT } from '@/contracts';
import { LiquidityReturnType } from '@/pages/trade/hooks/useAddLP.ts';
import { getAddress } from 'ethers';

const useAddLPConfirm = ({
  lpPairInfo,
  tokenAAmount,
  tokenBAmount,
  tokenA,
  tokenB,
  setStep,
}: Pick<
  LiquidityReturnType,
  | 'lpPairInfo'
  | 'tokenAAmount'
  | 'tokenBAmount'
  | 'tokenA'
  | 'tokenB'
  | 'setStep'
>) => {
  const updateSubmitted = useTxStore((state) => state.updateSubmitted);

  const { data: tokenADecimals } = useReadContract({
    address: tokenA?.address as Address,
    abi: erc20Abi,
    functionName: 'decimals',
  });

  const { data: tokenBDecimals } = useReadContract({
    address: tokenB?.address as Address,
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
      setStep('FILL');
    }
  }, [isSubmitted]);

  const sortedAmounts = useMemo(() => {
    if (!tokenADecimals || !tokenBDecimals) return [];
    const amountIn = Number(tokenAAmount) * 10 ** tokenADecimals;
    const amountOut = Number(tokenBAmount) * 10 ** tokenBDecimals;
    return (lpPairInfo?.lpPair || []).map(
      (address) =>
        [
          { ...tokenA, amount: amountIn },
          { ...tokenB, amount: amountOut },
        ].find(
          (token) =>
            getAddress(token?.address as Address).toLowerCase() ===
            getAddress(address).toLowerCase()
        )?.amount
    );
  }, [lpPairInfo?.lpPair, tokenAAmount, tokenBAmount]);

  const confirm = () => {
    if (tokenADecimals && tokenBDecimals) {
      const { address, abi } = XUNION_SWAP_CONTRACT.interface;

      writeContractAsync({
        address: address as Address,
        abi,
        functionName: 'xLpSubscribe',
        args: [lpPairInfo?.pairAddress, sortedAmounts],
      });
    }
  };

  return {
    confirm,
    isSubmittedLoading,
  };
};

export default useAddLPConfirm;
