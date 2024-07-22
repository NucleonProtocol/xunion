import ChainSelector from '@/pages/x-lending/dashboad/ChainSelector.tsx';
import MarketInfo from '@/pages/x-lending/dashboad/MarketInfo.tsx';
import Supplies from '@/pages/x-lending/dashboad/Supplies.tsx';
import AssetsToSupply from '@/pages/x-lending/dashboad/AssetsToSupply.tsx';
import Borrows from '@/pages/x-lending/dashboad/Borrows.tsx';
import AssetsToBorrow from '@/pages/x-lending/dashboad/AssetsToBorrow.tsx';
import useDashboard from '@/pages/x-lending/hooks/useDashboard.ts';
import BorrowMode from '@/components/Borrow/BorrowMode.tsx';
import { XUNION_LENDING_CONTRACT } from '@/contracts';
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
function Dashboard() {
  const {
    netWorth,
    netApy,
    health,
    lendingAssets,
    loading,
    userMode,
    depositTotalCollateralBalance,
    depositTotalAPY,
    depositTotalBalance,
    lendingTotalBalance,
    lendingTotalAPY,
    lendingPowerUsed,
    refetch,
  } = useDashboard();
  return (
    <div className="mt-[30px] flex  flex-col items-center p-[20px] ">
      <div className="max-w-[1200px] overflow-hidden  max-md:mx-[20px]">
        <div className="flex-center-between pb-[20px]">
          <ChainSelector />
        </div>
        <div className="flex-center-between pb-[20px]">
          <MarketInfo netWorth={netWorth} netApy={netApy} health={health} />
          <div className="flex h-[84px] flex-col">
            <span className="flex h-[52px] items-center justify-end text-tc-secondary">
              Borrow mode
            </span>
            <div className="flex items-center gap-[10px] text-[16px]">
              <BorrowMode
                onSuccess={refetch}
                contact={{ ...XUNION_LENDING_CONTRACT.interface }}
                options={options}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-[24px]">
          <div className="flex w-[580px] flex-shrink-0 flex-col gap-[24px] overflow-hidden">
            <Supplies
              assets={lendingAssets}
              loading={loading}
              userMode={userMode}
              depositTotalBalance={depositTotalBalance}
              depositTotalCollateralBalance={depositTotalCollateralBalance}
              depositTotalAPY={depositTotalAPY}
            />
            <AssetsToSupply
              assets={lendingAssets}
              loading={loading}
              userMode={userMode}
            />
          </div>
          <div className="flex w-[580px] flex-shrink-0 flex-col gap-[24px] overflow-hidden">
            <Borrows
              assets={lendingAssets}
              loading={loading}
              lendingTotalBalance={lendingTotalBalance}
              lendingTotalAPY={lendingTotalAPY}
              lendingPowerUsed={lendingPowerUsed}
            />
            <AssetsToBorrow assets={lendingAssets} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
