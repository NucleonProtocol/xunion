import useProvider from '@/hooks/useProvider.ts';
import { Contract } from 'ethers';
import { XUNION_SWAP_CONTRACT } from '@/contracts';

const useInterfaceContract = () => {
  const provider = useProvider();

  const { address, abi } = XUNION_SWAP_CONTRACT.interface;

  return new Contract(address, abi, provider);
};

export default useInterfaceContract;
