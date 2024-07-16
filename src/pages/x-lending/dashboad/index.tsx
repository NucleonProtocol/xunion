import ChainSelector from '@/pages/x-lending/dashboad/ChainSelector.tsx';
import MarketInfo from '@/pages/x-lending/dashboad/MarketInfo.tsx';
import BorrowMode from '@/pages/x-lending/dashboad/BorrowMode.tsx';
import Supplies from '@/pages/x-lending/dashboad/Supplies.tsx';
import AssetsToSupply from '@/pages/x-lending/dashboad/AssetsToSupply.tsx';
import Borrows from '@/pages/x-lending/dashboad/Borrows.tsx';
import AssetsToBorrow from '@/pages/x-lending/dashboad/AssetsToBorrow.tsx';

function Dashboard() {
  return (
    <div className="mt-[30px] flex  flex-col items-center p-[20px] ">
      <div className="max-w-[1200px] overflow-hidden  max-md:mx-[20px]">
        <div className="flex-center-between pb-[20px]">
          <ChainSelector />
        </div>
        <div className="flex-center-between pb-[20px]">
          <MarketInfo />
          <BorrowMode refresh={() => {}} />
        </div>
        <div className="flex gap-[24px]">
          <div className="flex w-[580px] flex-shrink-0 flex-col gap-[24px] overflow-hidden">
            <Supplies />
            <AssetsToSupply />
          </div>
          <div className="flex w-[580px] flex-shrink-0 flex-col gap-[24px] overflow-hidden">
            <Borrows />
            <AssetsToBorrow />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
