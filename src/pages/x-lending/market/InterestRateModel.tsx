import LendingCard from '@/components/LendingCard.tsx';
import InterestRateLine from '@/pages/x-lending/market/charts/InterestRateLine.tsx';

const InterestRateModel = () => {
  return (
    <LendingCard title="Interest rate model" collapsible={false}>
      <InterestRateLine />
    </LendingCard>
  );
};

export default InterestRateModel;
