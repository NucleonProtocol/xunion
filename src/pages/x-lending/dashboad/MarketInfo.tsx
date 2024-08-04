import { formatCurrency } from '@/utils';
import HealthFactor from '@/components/Borrow/HealthFactor.tsx';
import { useState } from 'react';
import RiskModal from '@/components/Borrow/RiskModal.tsx';
import { Button } from 'antd';
import { XUNION_LENDING_CONTRACT } from '@/contracts';
import { formatUnits } from 'ethers';
import BorrowMode from '@/components/Borrow/BorrowMode.tsx';
import { BorrowModeType } from '@/types/slc.ts';

const options = [
  {
    label: 'High liquidity mode',
    description: 'Use high liquidity collateral for borrowing',
    value: BorrowModeType.HighLiquidity,
  },
  {
    label: 'Risk isolation mode',
    description: 'Only use one high-risk asset to borrow SLC',
    value: BorrowModeType.RiskIsolation,
  },
  {
    label: 'Homogenous mode',
    description: 'Only use homogenous asset for borrowing',
    value: BorrowModeType.Homogenous,
  },
];

const MarketInfo = ({
  netWorth,
  netApy,
  health,
  refetch,
}: {
  netWorth: bigint;
  netApy: bigint;
  health: number;
  refetch: () => void;
}) => {
  const [riskOpen, setRiskOpen] = useState(false);
  return (
    <div className="flex w-full items-center justify-start max-md:flex-row max-md:flex-wrap">
      <RiskModal
        open={riskOpen}
        onClose={() => setRiskOpen(false)}
        userHealthFactor={health}
        contact={{
          ...XUNION_LENDING_CONTRACT.interface,
        }}
      />
      <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px] py-[12px] pr-[16px] max-md:min-w-[160px] max-md:flex-1">
        <span className="text-[16px] text-tc-secondary">Net worth</span>
        <span className="text-[20px] font-bold">
          {formatCurrency(Number(formatUnits(netWorth.toString())), true)}
        </span>
      </div>

      <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px]  py-[12px] pr-[16px] max-md:min-w-[160px] max-md:flex-1">
        <span className="text-[16px] text-tc-secondary">Net APY</span>
        <span className="text-[20px] font-bold">{`${Number(netApy.toString()) / 10000}%`}</span>
      </div>
      <div className="flex flex-1 justify-between">
        <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px]  py-[12px] pr-[16px] max-md:min-w-[160px] max-md:flex-1">
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
        <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px]  py-[12px] pr-[16px] max-md:min-w-[160px] max-md:flex-1">
          <span className="flex  items-center justify-end text-tc-secondary max-md:justify-start">
            Borrow mode
          </span>
          <div className="flex items-center justify-end gap-[10px] text-[16px] max-md:justify-start">
            <BorrowMode
              onSuccess={refetch}
              contact={{ ...XUNION_LENDING_CONTRACT.interface }}
              options={options}
              description="The mode can only be changed when there are no deposits or loans."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MarketInfo;
