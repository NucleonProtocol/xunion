import useSLCContract from '@/hooks/useSLCContract.ts';
import { useAccount } from 'wagmi';
import { XUNION_SWAP_CONTRACT } from '@/contracts';
import { formatUnits } from 'ethers';

const useHealthFactor = () => {
  const contract = useSLCContract();

  const { address } = useAccount();

  const getBorrowHealth = async (amount: string) => {
    if (address && amount) {
      return contract
        .usersHealthFactorEstimate(
          address,
          XUNION_SWAP_CONTRACT.slc.address,
          String(Number(amount) * 10 ** 18),
          0
        )
        .then((factor) => formatUnits(factor, 18));
    }
  };
  const getRepayHealth = async (amount: string) => {
    if (address && amount) {
      return contract
        .usersHealthFactorEstimate(
          address,
          XUNION_SWAP_CONTRACT.slc.address,
          String(Number(amount) * 10 ** 18),
          1
        )
        .then((factor) => formatUnits(factor, 18));
    }
  };

  return {
    getBorrowHealth,
    getRepayHealth,
  };
};

export default useHealthFactor;
