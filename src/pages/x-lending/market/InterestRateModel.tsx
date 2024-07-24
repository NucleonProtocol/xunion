import LendingCard from '@/components/LendingCard.tsx';
import InterestRateLine from '@/pages/x-lending/market/charts/InterestRateLine.tsx';

const InterestRateModel = () => {
  return (
    <LendingCard title="Interest rate model" collapsible={false}>
      <div className="px-[6px] py-[16px]">
        <div className="mb-[20px] flex flex-col gap-[5px]">
          <span className="text-[14px] text-tc-secondary">
            Utilization rate
          </span>
          <span className="text-[16px] font-[500] ">14.39%</span>
        </div>
        <div className="flex gap-[40px]">
          <div className="flex items-center gap-[10px]">
            <div className="h-[10px] w-[10px] rounded-full bg-theme" />
            <span className="text-[16px] font-[500]">Borrow APY, variable</span>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="h-[10px] w-[10px] rounded-full bg-[#E65D5D]" />
            <span className="text-[16px] font-[500]">Borrow APY, variable</span>
          </div>
        </div>
        <InterestRateLine />
      </div>
    </LendingCard>
  );
};

export default InterestRateModel;
