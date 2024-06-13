import { Contract, formatUnits } from 'ethers';
import { erc20Abi } from 'viem';
import { useAccount } from 'wagmi';
import useProvider from '@/hooks/useProvider.ts';

export function formatNumber(number: number, decimals: number) {
  const factor = Math.pow(10, decimals);
  return Math.floor(number * factor) / factor;
}

const useErc20Balance = () => {
  const { address: account } = useAccount();
  const provider = useProvider();

  const getBalance = async (address: string, fixed = 4) => {
    try {
      const Erc20Contract = new Contract(address, erc20Abi, provider);
      const result = await Erc20Contract.balanceOf(account);
      const decimals = await Erc20Contract.decimals();
      return formatNumber(Number(formatUnits(result, decimals)), fixed);
    } catch (e) {
      return 0;
    }
  };

  const getTotalSupply = async (address: string) => {
    try {
      const Erc20Contract = new Contract(address, erc20Abi, provider);
      return await Erc20Contract.totalSupply();
    } catch (e) {
      return 0;
    }
  };

  return {
    getBalance,
    getTotalSupply,
  };
};

export default useErc20Balance;
