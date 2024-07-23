import { formatCurrency } from '@/utils';
import { formatUnits } from 'ethers';

const MarketInfo = ({ netWorth }: { netWorth: bigint }) => {
  return (
    <div className="flex items-center justify-start">
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
