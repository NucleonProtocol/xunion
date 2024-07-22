import { formatCurrency } from '@/utils';
import HealthFactor from '@/components/Borrow/HealthFactor.tsx';
import { useState } from 'react';
import RiskModal from '@/components/Borrow/RiskModal.tsx';
import { Button } from 'antd';
import { XUNION_LENDING_CONTRACT } from '@/contracts';
import { formatUnits } from 'ethers';

const MarketInfo = ({
  netWorth,
  netApy,
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
        <span className="text-[16px] text-tc-secondary">Net worth</span>
        <span className="text-[20px] font-bold">
          {formatCurrency(Number(formatUnits(netWorth.toString())), true)}
        </span>
      </div>

      <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px]  py-[12px] pr-[16px]  ">
        <span className="text-[16px] text-tc-secondary">Net APY</span>
        <span className="text-[20px] font-bold">{`${netApy}%`}</span>
      </div>
      <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px]  py-[12px] pr-[16px]  ">
        <span className="text-[16px] text-tc-secondary">Health factor</span>
        <div className="flex items-end gap-[10px] text-[16px] ">
          <HealthFactor value={`${health}`} />
          <Button
            type="text"
            ghost
            className="text-theme"
            size="small"
            onClick={() => setRiskOpen(true)}
          >
            Rist detail
          </Button>
        </div>
      </div>
    </div>
  );
};
export default MarketInfo;
