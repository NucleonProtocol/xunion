import LendingCard from '@/components/LendingCard.tsx';
import BorrowAPYLine from '@/pages/x-lending/market/charts/BorrowAPYLine';
import { ExclamationCircleOutlined, FundViewOutlined } from '@ant-design/icons';
import { LendingAsset } from '@/types/Lending.ts';
import { Button } from 'antd';

const TokenSupplyInfo = ({ asset }: { asset?: LendingAsset }) => {
  return (
    <LendingCard title="Borrow info" collapsible={false}>
      <div className="w-full px-[6px] py-[16px]">
        <div className="flex w-full justify-between">
          <div className="flex h-[90px] w-full gap-[10px]">
            <div className="flex h-full flex-1 items-center gap-[10px] rounded-[8px] border border-line-primary p-[10px]">
              <div className="flex flex-col gap-[2px]">
                <div className="flex gap-[5px] text-[14px] text-tc-secondary">
                  <span>Total supplied</span>
                  <ExclamationCircleOutlined />
                </div>
                <span className="text-[16px] font-[500]">33.94K/43.00K</span>
                <span className="text-[12px] text-tc-secondary">
                  $3.09M/3.56M
                </span>
              </div>
            </div>
            <div className="flex h-full  w-[130px] flex-col items-start justify-center gap-[5px] rounded-[8px] border border-line-primary pl-[10px]">
              <span className="text-[14px] text-tc-secondary">Borrow cap</span>
              <span className="text-[14px] font-[500]">
                {asset?.depositInterest || 0}%
              </span>
              <span className="text-[12px] text-tc-secondary">$3.09M</span>
            </div>
            <div className="flex h-full  w-[130px] flex-col items-start justify-center gap-[5px] rounded-[8px] border border-line-primary pl-[10px]">
              <div className="flex gap-[5px] text-[14px] text-tc-secondary">
                <span>APY, variable</span>
                <ExclamationCircleOutlined />
              </div>
              <span className="text-[14px] font-[500]">
                {asset?.depositInterest || 0}%
              </span>
            </div>
          </div>
        </div>
        <div className="h-[180px] py-[20px]">
          <span className="text-[14px] font-[500]">Borrow APY, variable</span>
          <BorrowAPYLine />
        </div>
        <div className="mt-[40px]">
          <div className="flex-center-between">
            <span className="text-[14px] font-[500]">Collector info</span>
          </div>
          <div className="mt-[10px] flex h-[65px] gap-[10px]">
            <div className="flex h-full  flex-1 flex-col items-start justify-center  rounded-[8px] border border-line-primary pl-[10px]">
              <div className="flex gap-[5px] text-[14px] text-tc-secondary">
                <span>Reserve factor</span>
                <ExclamationCircleOutlined />
              </div>
              <span className="text-[14px] font-[500]">
                {asset?.depositInterest || 0}%
              </span>
            </div>
            <div className="flex h-full  flex-1 flex-col items-start justify-center  rounded-[8px] border border-line-primary pl-[10px]">
              <div className="flex gap-[5px] text-[14px] text-tc-secondary">
                <span>Collector contract</span>
              </div>
              <Button
                size="small"
                type="text"
                className="text-[14px] text-tc-secondary"
              >
                <span> View</span>
                <FundViewOutlined />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LendingCard>
  );
};

export default TokenSupplyInfo;
