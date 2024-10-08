import useProvider from '@/hooks/useProvider.ts';
import { Contract } from 'ethers';
import { XUNION_SLC_CONTRACT } from '@/contracts';

const useSLCContract = () => {
  const provider = useProvider();

  const { address, abi } = XUNION_SLC_CONTRACT.interface;

  return new Contract(address, abi, provider);
};

export default useSLCContract;
