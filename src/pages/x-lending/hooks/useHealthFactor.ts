import { useAccount } from 'wagmi';
import { formatUnits } from 'ethers';
import useLendingContract from '@/hooks/useLendingContract.ts';
import { LendingAsset } from '@/types/Lending.ts';
import { formatNumber } from '@/hooks/useErc20Balance';

const useHealthFactor = (asset: LendingAsset) => {
  const contract = useLendingContract();

  const { address } = useAccount();

  const getDepositHealth = async (amount: string) => {
    if (address && amount) {
      return contract
        .usersHealthFactorEstimate(
          address,
          asset.token.address,
          String(formatNumber(Number(amount), 6) * 10 ** 18),
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
          String(formatNumber(Number(amount), 6) * 10 ** 18),
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
          String(formatNumber(Number(amount), 6) * 10 ** 18),
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
          String(formatNumber(Number(amount), 6) * 10 ** 18),
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
