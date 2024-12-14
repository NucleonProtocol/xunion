import { Token } from '@/types/swap.ts';
import { useEffect, useState } from 'react';
import { formatUnits } from 'ethers';
import useErc20Balance, { formatNumber } from '@/hooks/useErc20Balance.ts';
import { useAccount } from 'wagmi';
import useNativeToken from '@/hooks/useNativeToken.ts';
import { SLCToken, USDTToken, USDCToken } from '@/contracts';
import useSLCContract from '@/hooks/useSLCContract.ts';

const useXUSDWithPrice = () => {
  const { getRealAddress, isNativeToken, getNativeTokenBalance } =
    useNativeToken();
  const { address } = useAccount();
  const [tokens, setTokens] = useState<Token[]>([
    SLCToken,
    USDTToken,
    USDCToken,
  ]);
  const [loading, setLoading] = useState(false);
  const contract = useSLCContract();
  const { getBalance } = useErc20Balance();

  useEffect(() => {
    if (address) {
      setLoading(true);
      const calls2 = tokens.map((token) => getBalance(getRealAddress(token)));

      contract
        .getSlcValue()
        .then(async (basePrice) => {
          return Promise.all(calls2).then(async (allBalance) => {
            const newData = [];
            for (let index = 0; index < tokens.length; index++) {
              const item = tokens[index];
              const unitPrice = Number(formatUnits(basePrice));
              const amount = allBalance[index];
              if (isNativeToken(item)) {
                const balance = await getNativeTokenBalance();
                newData.push({
                  ...item,
                  amount: formatNumber(balance, 6),
                  price: formatNumber(balance * unitPrice, 6),
                });
              } else {
                newData.push({
                  ...item,
                  amount: formatNumber(amount, 6),
                  price: formatNumber(amount * unitPrice, 6),
                });
              }
            }
            setTokens(newData);
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [address]);

  return {
    tokens,
    loading,
  };
};

export default useXUSDWithPrice;
