import useSLCContract from '@/hooks/useSLCContract.ts';
import { useCallback } from 'react';
import { Token } from '@/types/swap.ts';
import { formatEther, parseEther } from 'ethers';
import { formatNumber } from '@/hooks/useErc20Balance.ts';
import { isNumeric } from '@/utils/isNumeric.ts';

const useCalcBurnAmount = ({
  setReceiveAmount,
}: {
  setReceiveAmount: (value: string) => void;
}) => {
  const contract = useSLCContract();

  const getOutputAmount = async (address: string, amount: string) => {
    return await contract.burnSLCEst(amount, address);
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
      if (outputToken?.address && isNumeric(payAmount)) {
        getOutputAmount(outputToken.address, parseEther(payAmount).toString())
          .then((amount) => {
            const amountStr = formatEther(amount.toString());
            setReceiveAmount(formatNumber(Number(amountStr), 8).toString());
          })
          .catch(() => {
            setReceiveAmount('');
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
