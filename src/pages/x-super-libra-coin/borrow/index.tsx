import { BuySellIcon, BorrowIcon } from '@/components/icons';
import RouteTabs from '@/components/RouteTabs.tsx';
import AmountCard from '@/components/AmountCard.tsx';
import useBorrow from '@/pages/x-super-libra-coin/hooks/useBorrow.ts';
import Position from '@/pages/x-super-libra-coin/borrow/Position.tsx';
import Collateral from '@/pages/x-super-libra-coin/borrow/Collateral.tsx';
import { useTranslate } from '@/i18n';
import { formatNumber } from '@/hooks/useErc20Balance';

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
  const { t } = useTranslate();
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
            label: t('x-super-libra-coin.title'),
          },
          {
            name: 'Borrow',
            path: '/x-super-libra-coin/borrow',
            icon: <BorrowIcon />,
            label: t('x-lending.borrow'),
          },
        ]}
        active="Borrow"
      />
      <div className="mt-[30px] min-h-[420px]  w-full p-[20px] max-md:mx-0 max-md:p-[16px] max-md:pb-[80px] md:max-w-[1200px]">
        <div className="flex items-center justify-between max-md:flex-col max-md:gap-[10px]">
          <AmountCard
            title={t('common.tvl')}
            amount={String(formatNumber(tvlAmount, 5))}
            loading={isOverviewLoading}
          />
          <AmountCard
            title={t('x-super-libra-coin.slc.supply')}
            amount={String(formatNumber(totalSupply, 5))}
            loading={isOverviewLoading}
          />
          <AmountCard
            title="xUSD"
            amount={String(formatNumber(unitPrice, 5))}
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
