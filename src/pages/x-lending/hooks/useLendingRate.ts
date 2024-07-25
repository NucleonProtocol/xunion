import { useMemo } from 'react';

const useLendingRate = () => {
  const assetsBaseInfo = () => {
    return {
      maximumLTV: 9600,
      bestLendingRatio: 8500,
      lendingModeNum: 2,
      bestDepositInterestRate: 400,
    };
  };

  const depositInterestRate = (lendingRatio: number) => {
    const { bestLendingRatio, bestDepositInterestRate } = assetsBaseInfo();
    let _rate = 0;
    if (lendingRatio <= bestLendingRatio + 500) {
      _rate =
        (((bestDepositInterestRate * lendingRatio) / bestLendingRatio) *
          lendingRatio) /
        bestLendingRatio;
    } else if (lendingRatio <= 9500) {
      _rate =
        (((((bestDepositInterestRate * lendingRatio) / bestLendingRatio) *
          lendingRatio) /
          bestLendingRatio) *
          (lendingRatio - bestLendingRatio)) /
        500;
    } else if (lendingRatio <= 10000) {
      _rate =
        (((((((bestDepositInterestRate * lendingRatio) / bestLendingRatio) *
          lendingRatio) /
          bestLendingRatio) *
          (lendingRatio - bestLendingRatio)) /
          500) *
          (lendingRatio - 9400)) /
        100;
    }
    return _rate;
  };
  const lendingInterestRate = (lendingRatio: number) => {
    const { bestLendingRatio, bestDepositInterestRate, maximumLTV } =
      assetsBaseInfo();
    let _rate = 0;
    if (lendingRatio <= bestLendingRatio + 500) {
      _rate =
        (((((bestDepositInterestRate * lendingRatio) / bestLendingRatio) *
          10500) /
          bestLendingRatio) *
          10000) /
        maximumLTV;
    } else if (lendingRatio <= 9500) {
      _rate =
        (((((((((bestDepositInterestRate * lendingRatio) / bestLendingRatio) *
          10500) /
          bestLendingRatio) *
          10000) /
          maximumLTV) *
          (lendingRatio - bestLendingRatio)) /
          500) *
          lendingRatio) /
        (bestLendingRatio + 500);
    } else if (lendingRatio <= 10000) {
      _rate =
        (((((((((((bestDepositInterestRate * lendingRatio) / bestLendingRatio) *
          10500) /
          bestLendingRatio) *
          10000) /
          maximumLTV) *
          (lendingRatio - bestLendingRatio)) /
          500) *
          lendingRatio) /
          (bestLendingRatio + 500)) *
          (lendingRatio - 9400) *
          (lendingRatio - 9400)) /
        10000;
    }
    return _rate;
  };

  const depositInterestRates = useMemo(
    () =>
      [...new Array(99)].map(
        (_, index) => depositInterestRate((index + 1) * 100) / 100
      ),
    []
  );
  const lendingInterestRates = useMemo(
    () =>
      [...new Array(99)].map(
        (_, index) => lendingInterestRate((index + 1) * 100) / 100
      ),
    []
  );

  return {
    depositInterestRates,
    lendingInterestRates,
  };
};

export default useLendingRate;
