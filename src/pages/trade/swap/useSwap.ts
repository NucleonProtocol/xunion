import { useEffect, useMemo, useState } from 'react';
import { RateInfo, Token } from '@/types/swap.ts';
import useErc20Balance from '@/hooks/useErc20Balance.ts';

const SWAP_FEE = 0.3;

const useSwap = () => {
  const { getBalance } = useErc20Balance();
  const [slippage, setSlippage] = useState('-1');
  const [inputToken, setInputToken] = useState<Token | undefined>();
  const [outputToken, setOutputToken] = useState<Token | undefined>();
  const [payAmount, setPayAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('');
  const [inputOwnerAmount, setInputOwnerAmount] = useState(0);
  const [outputOwnerAmount, setOutputOwnerAmount] = useState(0);
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

  useEffect(() => {
    if (inputToken?.address) {
      getBalance(inputToken.address).then(setInputOwnerAmount);
    }
  }, [inputToken]);
  useEffect(() => {
    if (outputToken?.address) {
      getBalance(outputToken.address).then(setOutputOwnerAmount);
    }
  }, [outputToken]);

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
    inputOwnerAmount,
    outputOwnerAmount,
  };
};

export default useSwap;
