import { useAccount } from 'wagmi';
import { formatUnits, parseUnits } from 'ethers';
import useLendingContract from '@/hooks/useLendingContract.ts';
import { LendingAsset } from '@/types/Lending.ts';

const useHealthFactor = (asset: LendingAsset) => {
  const contract = useLendingContract();

  const { address } = useAccount();

  const getDepositHealth = async (amount: string) => {
    if (address && amount) {
      return contract
        .usersHealthFactorEstimate(
          address,
          asset.token.address,
          parseUnits(amount),
          0
        )
        .then((factor) => formatUnits(factor, 18));
    }
  };

  const getWithdrawHealth = async (amount: string) => {
    if (address && amount) {
      return contract
        .usersHealthFactorEstimate(
          address,
          asset.token.address,
          parseUnits(amount),
          1
        )
        .then((factor) => formatUnits(factor, 18));
    }
  };

  const getLendingHealth = async (amount: string) => {
    if (address && amount) {
      return contract
        .usersHealthFactorEstimate(
          address,
          asset.token.address,
          parseUnits(amount),
          2
        )
        .then((factor) => formatUnits(factor, 18));
    }
  };
  const getRepayHealth = async (amount: string) => {
    if (address && amount) {
      return contract
        .usersHealthFactorEstimate(
          address,
          asset.token.address,
          parseUnits(amount),
          3
        )
        .then((factor) => formatUnits(factor, 18));
    }
  };

  return {
    getDepositHealth,
    getRepayHealth,
    getLendingHealth,
    getWithdrawHealth,
  };
};

export default useHealthFactor;
