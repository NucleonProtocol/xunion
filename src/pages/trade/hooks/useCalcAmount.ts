import useSwapContract from '@/hooks/useSwapContract.ts';
import { useCallback } from 'react';
import { Token } from '@/types/swap.ts';
import { formatEther, parseEther } from 'ethers';
import { formatNumber } from '@/hooks/useErc20Balance.ts';

import { isNumeric } from '@/utils/isNumeric.ts';
import useNativeToken from '@/hooks/useNativeToken.ts';

const useCalcAmount = ({
  setIsInsufficientLiquidity,
  setPayAmount,
  setFee,
  setPriceImpact,
  setInputTokenTotalPrice,
  setReceiveAmount,
  setOutputTokenTotalPrice,
}: {
  setIsInsufficientLiquidity: (value: boolean) => void;
  setPayAmount: (value: string) => void;
  setReceiveAmount: (value: string) => void;
  setFee: (value: number) => void;
  setPriceImpact: (value: number) => void;
  setInputTokenTotalPrice: (value: number) => void;
  setOutputTokenTotalPrice: (value: number) => void;
}) => {
  const contract = useSwapContract();

  const { getRealAddress } = useNativeToken();

  const getInputAmount = async (tokens: string[], amount: string) => {
    return await contract.xExchangeEstimateOutput(tokens, amount);
  };

  const getOutputAmount = async (tokens: string[], amount: string) => {
    return await contract.xExchangeEstimateInput(tokens, amount);
  };
  const autoGetPayAmount = useCallback(
    ({
      outputToken,
      inputToken,
      receiveAmount,
    }: {
      outputToken?: Token;
      inputToken?: Token;
      receiveAmount: string;
    }) => {
      setIsInsufficientLiquidity(false);
      if (
        inputToken?.address &&
        outputToken?.address &&
        isNumeric(receiveAmount)
      ) {
        getInputAmount(
          [getRealAddress(inputToken!), getRealAddress(outputToken!)],
          parseEther(receiveAmount).toString()
        )
          .then((amount) => {
            const amountStr = formatEther(amount[0].toString());
            setPayAmount(formatNumber(Number(amountStr), 8).toString());
            const info = amount[1];
            setFee((Number(info[0].toString()) / 10000) * 100);
            setPriceImpact(
              Number((info[1] - info[2]).toString()) /
                Number(info[2].toString())
            );
          })
          .catch((e) => {
            console.log(e);
            setIsInsufficientLiquidity(true);
            setPayAmount('');
            setInputTokenTotalPrice(0);
          });
      }
    },
    []
  );

  const autoGetReceiveAmount = useCallback(
    ({
      outputToken,
      inputToken,
      payAmount,
    }: {
      outputToken?: Token;
      inputToken?: Token;
      payAmount: string;
    }) => {
      setIsInsufficientLiquidity(false);
      if (inputToken?.address && outputToken?.address && isNumeric(payAmount)) {
        getOutputAmount(
          [getRealAddress(inputToken!), getRealAddress(outputToken!)],
          parseEther(payAmount).toString()
        )
          .then((amount) => {
            const amountStr = formatEther(amount[0].toString());

            setReceiveAmount(formatNumber(Number(amountStr), 8).toString());

            const info = amount[1];
            const impact = formatNumber(
              (Number((info[1] - info[2]).toString()) /
                Number(info[2].toString())) *
                100,
              2
            );
            setFee((Number(info[0].toString()) / 10000) * 100);
            setPriceImpact(impact);
          })
          .catch(() => {
            setIsInsufficientLiquidity(true);
            setReceiveAmount('');
            setOutputTokenTotalPrice(0);
          });
      }
    },
    []
  );

  return {
    autoGetPayAmount,
    autoGetReceiveAmount,
  };
};

export default useCalcAmount;
