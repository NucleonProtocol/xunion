import { useEffect, useMemo, useState } from 'react';
import { RateInfo, Token } from '@/types/swap.ts';
import useErc20Balance from '@/hooks/useErc20Balance.ts';
import usePair from '@/pages/trade/swap/usePair.ts';
import { XUNION_SWAP_CONTRACT } from '@/contracts';
import useLP from '@/pages/trade/swap/useLP.ts';
import { formatNumber } from '@/hooks/useErc20Balance.ts';
import useExchangeAmount from '@/pages/trade/swap/useExchangeAmount.ts';

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
  const [deadline, setDeadline] = useState('600');
  const [inputTokenTotalPrice, setInputTokenTotalPrice] = useState(0);
  const [outputTokenTotalPrice, setOutputTokenTotalPrice] = useState(0);

  const { getOutputAmount, getInputAmount } = useExchangeAmount();

  const { pairAddress: fromWithSLCPairAddress } = usePair({
    fromToken: inputToken,
    toToken: { address: XUNION_SWAP_CONTRACT.slc.address },
  });

  const { pairAddress: toWithSLCPairAddress } = usePair({
    fromToken: outputToken,
    toToken: { address: XUNION_SWAP_CONTRACT.slc.address },
  });

  const { getLpPrice } = useLP();

  useEffect(() => {
    if (fromWithSLCPairAddress && payAmount) {
      getLpPrice(fromWithSLCPairAddress).then((unitPrice) => {
        setInputTokenTotalPrice(formatNumber(Number(payAmount) * unitPrice, 2));
      });
    }
  }, [fromWithSLCPairAddress, payAmount]);

  useEffect(() => {
    if (toWithSLCPairAddress && receiveAmount) {
      getLpPrice(toWithSLCPairAddress).then((unitPrice) => {
        setOutputTokenTotalPrice(
          formatNumber(Number(receiveAmount) * unitPrice, 2)
        );
      });
    }
  }, [toWithSLCPairAddress, receiveAmount]);

  useEffect(() => {
    if (inputToken?.address && outputToken?.address && payAmount) {
      getOutputAmount(
        [inputToken?.address, outputToken?.address],
        payAmount
      ).then((amount) => {
        console.log(amount);
        // setReceiveAmount(
        //   formatNumber(Number(payAmount) * unitPrice, 2).toString()
        // );
      });
    }
  }, [inputToken?.address, outputToken?.address, payAmount]);

  // useEffect(() => {
  //   if (inputToken?.address && outputToken?.address && payAmount) {
  //     getOutputAmount(
  //       [inputToken?.address, outputToken?.address],
  //       payAmount
  //     ).then((amount) => {
  //       console.log(amount);
  //       // setReceiveAmount(
  //       //   formatNumber(Number(payAmount) * unitPrice, 2).toString()
  //       // );
  //     });
  //   }
  // }, [inputToken?.address, outputToken?.address, payAmount]);

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
    deadline,
    setDeadline,
    inputTokenTotalPrice,
    outputTokenTotalPrice,
  };
};

export default useSwap;
