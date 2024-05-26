import useProvider from '@/hooks/useProvider.ts';
import { Contract } from 'ethers';
import { erc20Abi } from 'viem';

const useErc20Contract = (address: string) => {
  const provider = useProvider();

  return new Contract(address, erc20Abi, provider);
};

export default useErc20Contract;
