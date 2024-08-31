import { Address, erc20Abi, isAddress } from 'viem';
import { useAccount, usePublicClient } from 'wagmi';

const useErc20Info = () => {
  const publicClient = usePublicClient();
  const { chain } = useAccount();

  const fetchTokenInfo = async (address: string) => {
    if (!isAddress(address) || !publicClient) {
      return;
    }
    try {
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        publicClient.readContract({
          address: address as Address,
          abi: erc20Abi,
          functionName: 'name',
        }),
        publicClient.readContract({
          address: address as Address,
          abi: erc20Abi,
          functionName: 'symbol',
        }),
        publicClient.readContract({
          address: address as Address,
          abi: erc20Abi,
          functionName: 'decimals',
        }),
        publicClient.readContract({
          address: address as Address,
          abi: erc20Abi,
          functionName: 'totalSupply',
        }),
      ]);

      return {
        address,
        name,
        symbol,
        decimals,
        totalSupply: totalSupply.toString(),
        chainId: chain?.id,
      };
    } catch (err) {
      console.error(err);
    }
  };

  return { fetchTokenInfo };
};

export default useErc20Info;
