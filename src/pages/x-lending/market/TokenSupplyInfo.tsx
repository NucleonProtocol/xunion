import LendingCard from '@/components/LendingCard.tsx';
import TotalSupplyPie from '@/pages/x-lending/market/charts/TotalSupplyPie.tsx';
import DepositAPYLine from '@/pages/x-lending/market/charts/DepositAPYLine.tsx';

const TokenSupplyInfo = () => {
  return (
    <LendingCard title="Supply info" collapsible={false}>
      <div className="flex justify-between">
        <div className="h-[200px] w-[200px]">
          <TotalSupplyPie />
        </div>
        <div></div>
      </div>
      <DepositAPYLine />
    </LendingCard>
  );
};

export default TokenSupplyInfo;
