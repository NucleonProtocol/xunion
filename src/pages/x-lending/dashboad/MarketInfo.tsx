import { formatCurrency } from '@/utils';
import HealthFactor from '@/components/Borrow/HealthFactor.tsx';
import { useState } from 'react';
import RiskModal from '@/components/Borrow/RiskModal.tsx';
import { Button } from 'antd';

const MarketInfo = ({
  netWorth = 81231233,
  apy = 69.97,
  healthFactor = 2.7,
}: {
  netWorth?: number;
  apy?: number;
  healthFactor?: number;
}) => {
  const [riskOpen, setRiskOpen] = useState(false);
  return (
    <div className="flex items-center justify-start">
      <RiskModal
        open={riskOpen}
        onClose={() => setRiskOpen(false)}
        userHealthFactor={healthFactor}
      />
      <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px] py-[12px] pr-[16px]">
        <span className="text-[16px] text-tc-secondary">Net worth</span>
        <span className="text-[20px] font-bold">
          {formatCurrency(netWorth, true)}
        </span>
      </div>

      <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px]  py-[12px] pr-[16px]  ">
        <span className="text-[16px] text-tc-secondary">Net APY</span>
        <span className="text-[20px] font-bold">{`${apy}%`}</span>
      </div>
      <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px]  py-[12px] pr-[16px]  ">
        <span className="text-[16px] text-tc-secondary">Health factor</span>
        <div className="flex items-end gap-[10px] text-[16px] ">
          <HealthFactor value={`${healthFactor}`} />
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
