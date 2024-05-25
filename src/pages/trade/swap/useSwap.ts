import { useMemo, useState } from 'react';
import { RateInfo, Token } from '@/types/swap.ts';

const SWAP_FEE = 0.3;

const useSwap = () => {
  const [slippage, setSlippage] = useState('-1');
  const [inputToken, setInputToken] = useState<Token | undefined>();
  const [outputToken, setOutputToken] = useState<Token | undefined>();
  const [payAmount, setPayAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('');
  const onExchange = () => {
    if (inputToken || outputToken) {
      setOutputToken(inputToken);
      setInputToken(outputToken);

      setPayAmount('');
      setReceiveAmount('');
    }
  };

  const feeAmount = useMemo(() => {
    return Number(receiveAmount || 0) * SWAP_FEE;
  }, [receiveAmount]);

  const estReceived = useMemo(
    () => Number(receiveAmount || 0) - feeAmount,
    [feeAmount, receiveAmount]
  );

  // TODO slippage  calc
  const minReceived = useMemo(
    () => Number(receiveAmount || 0) - feeAmount,
    [feeAmount, receiveAmount]
  );

  const rate = useMemo<RateInfo>(
    () => ({ fromUnit: 1, toUnit: 0.0001, usdt: 8.75 }),
    [receiveAmount]
  );

  return {
    slippage,
    setSlippage,
    onExchange,
    inputToken,
    setInputToken,
    setOutputToken,
    outputToken,
    payAmount,
    setPayAmount,
    receiveAmount,
    setReceiveAmount,
    priceImpact: 0,
    fee: SWAP_FEE,
    feeAmount,
    estReceived,
    minReceived,
    rate,
  };
};

export default useSwap;
