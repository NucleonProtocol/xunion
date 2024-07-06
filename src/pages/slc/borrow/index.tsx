import { BuySellIcon, BorrowIcon } from '@/components/icons';
import RouteTabs from '@/components/RouteTabs.tsx';
import AmountCard from '@/components/AmountCard.tsx';
import useBorrow from '@/pages/slc/hooks/useBorrow.ts';
import Position from '@/pages/slc/borrow/Position.tsx';
import Collateral from '@/pages/slc/borrow/Collateral.tsx';

const Borrow = () => {
  const {
    isAssetsLoading,
    isHealthLoading,
    isOverviewLoading,
    tvlAmount,
    totalSupply,
    unitPrice,
    health,
  } = useBorrow();
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-[40px] max-md:pt-[40px] ">
      <RouteTabs
        tabs={[
          {
            name: 'Buy',
            path: '/slc/buy',
            icon: <BuySellIcon />,
            label: 'Buy & Sell',
          },
          {
            name: 'Borrow',
            path: '/slc/borrow',
            icon: <BorrowIcon />,
          },
        ]}
        active="Borrow"
      />
      <div className="mt-[30px] min-h-[420px] p-[20px]  max-md:mx-[20px] max-md:w-[calc(100%-40px)] md:min-w-[1200px]">
        <div className="flex items-center justify-between">
          <AmountCard
            title="TVL"
            amount={tvlAmount}
            loading={isOverviewLoading}
          />
          <AmountCard
            title="SLC Supply"
            amount={totalSupply}
            loading={isOverviewLoading}
          />
          <AmountCard
            title="SLC"
            amount={unitPrice}
            loading={isOverviewLoading}
          />
        </div>
        <div className="mt-[30px]">
          <Position loading={isHealthLoading} health={health as bigint[]} />
        </div>
        <div className="mt-[30px]">
          <Collateral loading={isAssetsLoading} assets={[]} />
        </div>
      </div>
    </div>
  );
};

export default Borrow;
