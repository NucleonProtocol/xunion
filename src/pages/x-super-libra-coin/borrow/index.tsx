import { BuySellIcon, BorrowIcon } from '@/components/icons';
import RouteTabs from '@/components/RouteTabs.tsx';
import AmountCard from '@/components/AmountCard.tsx';
import useBorrow from '@/pages/x-super-libra-coin/hooks/useBorrow.ts';
import Position from '@/pages/x-super-libra-coin/borrow/Position.tsx';
import Collateral from '@/pages/x-super-libra-coin/borrow/Collateral.tsx';

const Borrow = () => {
  const {
    isHealthLoading,
    isOverviewLoading,
    tvlAmount,
    totalSupply,
    unitPrice,
    health,
    refresh,
    sentinel,
  } = useBorrow();
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center pt-[40px] max-md:pt-[40px] "
      key={sentinel}
    >
      <RouteTabs
        tabs={[
          {
            name: 'Buy',
            path: '/x-super-libra-coin/mint',
            icon: <BuySellIcon />,
            label: 'Mint & Burn',
          },
          {
            name: 'Borrow',
            path: '/x-super-libra-coin/borrow',
            icon: <BorrowIcon />,
          },
        ]}
        active="Borrow"
      />
      <div className="mt-[30px] min-h-[420px] p-[20px]  max-md:mx-[16px] max-md:w-[calc(100%-40px)] max-md:p-0 max-md:pb-[80px] md:min-w-[1200px]">
        <div className="flex items-center justify-between max-md:flex-col max-md:gap-[10px]">
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
          <Position
            loading={isHealthLoading}
            health={health as bigint[]}
            refresh={refresh}
          />
        </div>
        <div className="mt-[30px]">
          <Collateral refresh={refresh} />
        </div>
      </div>
    </div>
  );
};

export default Borrow;
