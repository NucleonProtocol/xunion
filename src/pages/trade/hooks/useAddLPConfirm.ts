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
import useNativeToken from '@/hooks/useNativeToken.ts';
import { Token } from '@/types/swap.ts';

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

  const { getRealAddress, isNativeToken } = useNativeToken();

  const { data: tokenADecimals } = useReadContract({
    address: getRealAddress(tokenA!) as Address,
    abi: erc20Abi,
    functionName: 'decimals',
  });

  const { data: tokenBDecimals } = useReadContract({
    address: getRealAddress(tokenB!) as Address,
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
            getAddress(
              getRealAddress(token as Token) as Address
            ).toLowerCase() === getAddress(address).toLowerCase()
        )?.amount
    );
  }, [lpPairInfo, tokenAAmount, tokenBAmount, tokenADecimals, tokenBDecimals]);

  const txValue = useMemo(() => {
    if (isNativeToken(tokenA!) && tokenADecimals) {
      return Number(tokenAAmount) * 10 ** tokenADecimals;
    }
    if (isNativeToken(tokenB!) && tokenBDecimals) {
      return Number(tokenBAmount) * 10 ** tokenBDecimals;
    }
    return 0;
  }, [tokenAAmount, tokenBAmount, tokenADecimals, tokenBDecimals]);

  const confirm = () => {
    if (tokenADecimals && tokenBDecimals) {
      const { address, abi } = XUNION_SWAP_CONTRACT.interface;
      writeContractAsync({
        address: address as Address,
        abi,
        functionName: 'xLpSubscribe2',
        args: [lpPairInfo?.pairAddress, sortedAmounts],
        value: `${txValue}` as unknown as bigint,
      });
    }
  };

  return {
    confirm,
    isSubmittedLoading,
  };
};

export default useAddLPConfirm;
