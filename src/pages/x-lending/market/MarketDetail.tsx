import useMarketDetail from '@/pages/x-lending/hooks/useMarketDetail.ts';
import AssetInfo from '@/pages/x-lending/market/AssetInfo.tsx';
import { LeftOutlined } from '@ant-design/icons';
import { CHAINS } from '@/contracts/chains.tsx';
import { useNavigate } from 'react-router-dom';
import { Button, Skeleton } from 'antd';
import TokenBorrowInfo from '@/pages/x-lending/market/TokenBorrowInfo.tsx';
import TokenSupplyInfo from '@/pages/x-lending/market/TokenSupplyInfo.tsx';
import InterestRateModel from '@/pages/x-lending/market/InterestRateModel.tsx';

function MarketDetail() {
  const { netWorth, tokenAsset, loading } = useMarketDetail();
  const navigate = useNavigate();
  return (
    <div className="mt-[30px] flex  flex-col items-center p-[20px] ">
      <div className="w-full max-w-[1200px]  overflow-hidden max-md:mx-[20px]">
        <div className="flex h-[50px] items-start justify-between">
          <div
            className="flex cursor-pointer items-center gap-[5px] hover:opacity-75"
            onClick={() => {
              navigate(-1);
            }}
          >
            <LeftOutlined className="text-[16px]" />
            <span className="pl-[5px] text-[25px]">
              {CHAINS.eSpaceTest.icon}
            </span>
            <span className="text-[16px] font-[500]">
              {CHAINS.eSpaceTest.name}
            </span>
          </div>
          <div className="flex  items-center justify-end gap-[10px]">
            <Button
              type="primary"
              className="rounded-[8px] text-[12px]"
              onClick={() => {}}
            >
              Supply
            </Button>
            <Button
              type="primary"
              className="rounded-[8px] text-[12px]"
              onClick={() => {}}
            >
              Borrow
            </Button>
          </div>
        </div>
        <div className="flex-center-between h-[140px] pb-[20px]">
          {loading || !tokenAsset ? (
            <Skeleton active avatar={false} />
          ) : (
            <AssetInfo netWorth={netWorth} asset={tokenAsset} />
          )}
        </div>
        <div className="flex w-full flex-col gap-[24px]">
          <div className="flex  flex-shrink-0  gap-[24px] overflow-hidden">
            <TokenSupplyInfo />
            <TokenBorrowInfo />
          </div>
          <div className="flex w-full flex-shrink-0 flex-col gap-[24px] overflow-hidden">
            <InterestRateModel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketDetail;
