import SwapTVL from './SwapTVL';
import useExplore from '../hooks/useExplore';
import Swap from '../swap';

function TokenDetail() {
  const { tvls, getTvls } = useExplore();

  return (
    <div className="mt-[30px] flex  min-h-[420px]  flex-col items-center p-[20px] max-md:mt-0 max-md:p-[16px] max-md:pb-[80px]">
      <div className="max-md:mx-0 max-md:w-[calc(100%)] md:min-w-[1200px]">
        <div className="flex w-full gap-[20px] max-md:flex-col">
          <SwapTVL data={tvls?.items || []} getData={getTvls} />
          <Swap />
        </div>
        <div className="mt-[40px] flex flex-col gap-[20px]"></div>
      </div>
    </div>
  );
}

export default TokenDetail;
