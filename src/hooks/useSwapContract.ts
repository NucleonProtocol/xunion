import useProvider from '@/hooks/useProvider.ts';
import { Contract } from 'ethers';
import { XUNION_SWAP_CONTRACT } from '@/contracts';

const useSwapContract = () => {
  const provider = useProvider();

  const { address, abi } = XUNION_SWAP_CONTRACT.interface;

  return new Contract(address, abi, provider);
};

export default useSwapContract;
