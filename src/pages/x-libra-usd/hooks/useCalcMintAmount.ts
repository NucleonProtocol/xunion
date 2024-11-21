import useSLCContract from '@/hooks/useSLCContract.ts';
import { useCallback } from 'react';
import { Token } from '@/types/swap.ts';
import { formatEther, parseEther } from 'ethers';
import { formatNumber } from '@/hooks/useErc20Balance.ts';

import { isNumeric } from '@/utils/isNumeric.ts';
import useNativeToken from '@/hooks/useNativeToken.ts';

const useCalcMintAmount = ({
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
    return await contract.mintSLCEst(address, amount);
  };

  const autoGetReceiveAmount = useCallback(
    ({
      inputToken,
      payAmount,
    }: {
      outputToken?: Token;
      inputToken?: Token;
      payAmount: string;
    }) => {
      setIsInsufficientLiquidity(false);
      if (inputToken?.address && isNumeric(payAmount)) {
        getOutputAmount(
          getRealAddress(inputToken!),
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

export default useCalcMintAmount;
