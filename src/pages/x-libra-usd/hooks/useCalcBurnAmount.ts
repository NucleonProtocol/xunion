import useSLCContract from '@/hooks/useSLCContract.ts';
import { useCallback } from 'react';
import { Token } from '@/types/swap.ts';
import { formatEther, parseEther } from 'ethers';
import { formatNumber } from '@/hooks/useErc20Balance.ts';

import { isNumeric } from '@/utils/isNumeric.ts';
import useNativeToken from '@/hooks/useNativeToken.ts';

const useCalcBurnAmount = ({
  setIsInsufficientLiquidity,
  setReceiveAmount,
  setOutputTokenTotalPrice,
}: {
  setIsInsufficientLiquidity: (value: boolean) => void;
  setReceiveAmount: (value: string) => void;
  setOutputTokenTotalPrice: (value: number) => void;
}) => {
  const contract = useSLCContract();

  const { getRealAddress } = useNativeToken();

  const getOutputAmount = async (address: string, amount: string) => {
    return await contract.burnSLCEst(address, amount);
  };

  const autoGetReceiveAmount = useCallback(
    ({
      outputToken,
      payAmount,
    }: {
      outputToken?: Token;
      inputToken?: Token;
      payAmount: string;
    }) => {
      setIsInsufficientLiquidity(false);
      if (outputToken?.address && isNumeric(payAmount)) {
        getOutputAmount(
          getRealAddress(outputToken!),
          parseEther(payAmount).toString()
        )
          .then((amount) => {
            const amountStr = formatEther(amount.toString());
            setReceiveAmount(formatNumber(Number(amountStr), 8).toString());
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
    autoGetReceiveAmount,
  };
};

export default useCalcBurnAmount;
