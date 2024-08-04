import useMarketDetail from '@/pages/x-lending/hooks/useMarketDetail.ts';
import AssetInfo from '@/pages/x-lending/market/AssetInfo.tsx';
import { LeftOutlined } from '@ant-design/icons';
import { CHAINS } from '@/contracts/chains.tsx';
import { useNavigate } from 'react-router-dom';
import { Button, Skeleton } from 'antd';
import TokenBorrowInfo from '@/pages/x-lending/market/TokenBorrowInfo.tsx';
import TokenSupplyInfo from '@/pages/x-lending/market/TokenSupplyInfo.tsx';
import InterestRateModel from '@/pages/x-lending/market/InterestRateModel.tsx';
import { useTranslate } from '@/i18n';

function MarketDetail() {
  const { tokenAsset, loading } = useMarketDetail();
  const navigate = useNavigate();

  const { t } = useTranslate();
  return (
    <div className="mt-[30px] flex  flex-col items-center p-[20px] max-md:mt-0 max-md:p-[16px] max-md:pb-[80px]">
      <div className="w-full max-w-[1200px]  overflow-hidden max-md:mx-[20px]">
        <div className="relative flex h-[50px] items-start justify-between">
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
          <div className="max-md: right-[20px] flex items-center justify-end gap-[10px] max-md:absolute max-md:top-[50px]">
            <Button
              type="primary"
              className="rounded-[8px] text-[12px]"
              onClick={() => {}}
            >
              {t('x-lending.supply')}
            </Button>
            <Button
              type="primary"
              className="rounded-[8px] text-[12px]"
              onClick={() => {}}
            >
              {t('x-lending.borrow')}
            </Button>
          </div>
        </div>
        <div className="flex-center-between h-[140px] pb-[20px] max-md:h-[auto]">
          {loading || !tokenAsset ? (
            <Skeleton active avatar={false} />
          ) : (
            <AssetInfo asset={tokenAsset} />
          )}
        </div>
        <div className="flex w-full flex-col gap-[24px]">
          <div className="flex  flex-shrink-0  gap-[24px] overflow-hidden max-md:flex-col">
            <TokenSupplyInfo asset={tokenAsset} />
            <TokenBorrowInfo asset={tokenAsset} />
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
