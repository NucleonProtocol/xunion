import LendingCard from '@/components/LendingCard.tsx';
import InterestRateLine from '@/pages/x-lending/market/charts/InterestRateLine.tsx';
import { useTranslate } from '@/i18n';

const InterestRateModel = () => {
  const { t } = useTranslate();
  return (
    <LendingCard
      title={t('x-lending.market.detail.interest.rate.model')}
      collapsible={false}
    >
      <div className="px-[6px] py-[16px]">
        <div className="mb-[20px] flex flex-col gap-[5px]">
          <span className="text-[14px] text-tc-secondary">
            {t('x-lending.market.detail.utilization')}
          </span>
          <span className="text-[16px] font-[500] ">14.39%</span>
        </div>
        <div className="flex gap-[40px]">
          <div className="flex items-center gap-[10px]">
            <div className="h-[10px] w-[10px] rounded-full bg-theme" />
            <span className="text-[16px] font-[500]">
              {t('x-lending.market.supply.variable')}
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="h-[10px] w-[10px] rounded-full bg-[#E65D5D]" />
            <span className="text-[16px] font-[500]">
              {t('x-lending.market.borrow.variable')}
            </span>
          </div>
        </div>
        <InterestRateLine />
      </div>
    </LendingCard>
  );
};

export default InterestRateModel;
