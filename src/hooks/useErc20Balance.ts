import { Contract, formatUnits, JsonRpcProvider } from 'ethers';
import { E_SPACE_TEST_RPC } from '@/contracts';
import { erc20Abi } from 'viem';
import { useAccount } from 'wagmi';

export function formatNumber(number: number, decimals: number) {
  const factor = Math.pow(10, decimals);
  return Math.floor(number * factor) / factor;
}

const useErc20Balance = () => {
  const { address: account } = useAccount();
  const provider = new JsonRpcProvider(E_SPACE_TEST_RPC);

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

  return {
    getBalance,
  };
};

export default useErc20Balance;
