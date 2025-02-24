import { useReadContract } from 'wagmi';

import { Address } from 'viem';

import { SLCToken, XUNION_LENDING_CONTRACT } from '@/contracts';
import { useMemo } from 'react';
import { BorrowModeType } from '@/types/slc';

const useCalcRiskValue = (address: Address, mode: BorrowModeType) => {
  const { data: assetsBaseInfo } = useReadContract({
    address: XUNION_LENDING_CONTRACT.interface.address,
    abi: XUNION_LENDING_CONTRACT.interface.abi,
    functionName: 'assetsBaseInfo',
    args: [address!],
    query: {
      enabled: !!address && mode === BorrowModeType.RiskIsolation,
    },
  });

  const { data: riskIsolationModeLendingNetAmount } = useReadContract({
    address: XUNION_LENDING_CONTRACT.interface.address,
    abi: XUNION_LENDING_CONTRACT.interface.abi,
    functionName: 'riskIsolationModeLendingNetAmount',
    args: [SLCToken.address],
    query: {
      enabled: !!address && mode === BorrowModeType.RiskIsolation,
    },
  });

  const availableAmount = useMemo(() => {
    return (
      ((assetsBaseInfo as bigint[])?.[2] || 0n) -
      ((riskIsolationModeLendingNetAmount as bigint) || 0n)
    );
  }, [assetsBaseInfo, riskIsolationModeLendingNetAmount]);

  return {
    availableAmount,
  };
};

export default useCalcRiskValue;
