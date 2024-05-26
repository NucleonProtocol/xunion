import { JsonRpcProvider } from 'ethers';
import { E_SPACE_TEST_RPC } from '@/contracts';

const useProvider = () => {
  return new JsonRpcProvider(E_SPACE_TEST_RPC);
};

export default useProvider;
