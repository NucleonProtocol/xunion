import { formatCurrency } from '@/utils';
import { useState } from 'react';
import RiskModal from '@/components/Borrow/RiskModal.tsx';
import { XUNION_LENDING_CONTRACT } from '@/contracts';
import { formatUnits } from 'ethers';

const MarketInfo = ({
  netWorth,
  health,
}: {
  netWorth: bigint;
  netApy: bigint;
  health: number;
}) => {
  const [riskOpen, setRiskOpen] = useState(false);
  return (
    <div className="flex items-center justify-start">
      <RiskModal
        open={riskOpen}
        onClose={() => setRiskOpen(false)}
        userHealthFactor={health}
        contact={{
          ...XUNION_LENDING_CONTRACT.interface,
        }}
      />
      <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px] py-[12px] pr-[16px]">
        <span className="text-[16px] text-tc-secondary">Total market size</span>
        <span className="text-[20px] font-bold">
          {formatCurrency(Number(formatUnits(netWorth.toString())), true)}
        </span>
      </div>

      <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px]  py-[12px] pr-[16px]  ">
        <span className="text-[16px] text-tc-secondary">Total available</span>
        <span className="text-[20px] font-bold">
          {formatCurrency(Number(formatUnits(netWorth.toString())), true)}
        </span>
      </div>
      <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px]  py-[12px] pr-[16px]  ">
        <span className="text-[16px] text-tc-secondary">Total borrows</span>
        <span className="text-[20px] font-bold">
          {formatCurrency(Number(formatUnits(netWorth.toString())), true)}
        </span>
      </div>
    </div>
  );
};
export default MarketInfo;
