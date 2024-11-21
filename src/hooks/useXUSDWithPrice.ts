import { Token } from '@/types/swap.ts';
import { useEffect, useState } from 'react';
import useMulticall, { ContractCall } from '@/hooks/useMulticall.ts';
import { XUNION_SLC_CONTRACT } from '@/contracts';
import { Address, erc20Abi } from 'viem';
import { formatUnits } from 'ethers';
import { formatNumber } from '@/hooks/useErc20Balance.ts';
import { useAccount } from 'wagmi';
import useNativeToken from '@/hooks/useNativeToken.ts';
import { SLCToken, USDTToken, USDCToken } from '@/contracts';
const useXUSDWithPrice = () => {
  const { getRealAddress, isNativeToken, getNativeTokenBalance } =
    useNativeToken();
  const { address } = useAccount();
  const { multiCall } = useMulticall();
  const [tokens, setTokens] = useState<Token[]>([
    SLCToken,
    USDTToken,
    USDCToken,
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    const calls: ContractCall[] = tokens?.map((token) => ({
      name: 'getPrice',
      abi: XUNION_SLC_CONTRACT.oracle.abi,
      address: XUNION_SLC_CONTRACT.oracle.address as Address,
      values: [getRealAddress(token)],
    }));
    const calls2: ContractCall[] = tokens.map((token) => ({
      name: 'balanceOf',
      abi: erc20Abi,
      address: getRealAddress(token),
      values: [address],
    }));
    multiCall(calls)
      .then(async (allUnitPrice) => {
        return multiCall(calls2).then(async (allBalance) => {
          const newData = [];
          for (let index = 0; index < tokens.length; index++) {
            const item = tokens[index];
            const unitPrice = Number(
              formatUnits(allUnitPrice.returnData[index])
            );
            const amount = Number(formatUnits(allBalance.returnData[index]));
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
  }, [address]);

  return {
    tokens,
    loading,
  };
};

export default useXUSDWithPrice;
