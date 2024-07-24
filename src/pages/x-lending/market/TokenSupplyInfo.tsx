import LendingCard from '@/components/LendingCard.tsx';
import TotalSupplyPie from '@/pages/x-lending/market/charts/TotalSupplyPie.tsx';
import DepositAPYLine from '@/pages/x-lending/market/charts/DepositAPYLine.tsx';
import {
  CheckCircleFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { LendingAsset } from '@/types/Lending.ts';

const TokenSupplyInfo = ({ asset }: { asset?: LendingAsset }) => {
  return (
    <LendingCard title="Supply info" collapsible={false}>
      <div className="w-full px-[6px] py-[16px]">
        <div className="flex w-full justify-between">
          <div className="flex h-[90px] w-full gap-[10px]">
            <div className="flex h-full flex-1 items-center gap-[10px] rounded-[8px] border border-line-primary">
              <TotalSupplyPie />
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
              <span className="text-[14px] text-tc-secondary">APY</span>
              <span className="text-[14px] font-[500]">
                {asset?.depositInterest || 0}%
              </span>
            </div>
          </div>
        </div>
        <div className="h-[180px] py-[20px]">
          <span className="text-[14px] font-[500]">Supply APR</span>
          <DepositAPYLine />
        </div>
        <div className="mt-[40px]">
          <div className="flex-center-between">
            <span className="text-[14px] font-[500]">Collateral usage</span>
            <div className="flex items-center gap-[5px] text-[14px] text-theme">
              <CheckCircleFilled />
              <span>Can be collateral</span>
            </div>
          </div>
          <div className="mt-[10px] flex h-[65px] gap-[10px]">
            <div className="flex h-full  flex-1 flex-col items-start justify-center  rounded-[8px] border border-line-primary pl-[10px]">
              <div className="flex gap-[5px] text-[14px] text-tc-secondary">
                <span>Max LTV</span>
                <ExclamationCircleOutlined />
              </div>
              <span className="text-[14px] font-[500]">
                {asset?.depositInterest || 0}%
              </span>
            </div>
            <div className="flex h-full  flex-1 flex-col items-start justify-center  rounded-[8px] border border-line-primary pl-[10px]">
              <div className="flex gap-[5px] text-[14px] text-tc-secondary">
                <span>Liquidation threshold</span>
                <ExclamationCircleOutlined />
              </div>
              <span className="text-[14px] font-[500]">
                {asset?.depositInterest || 0}%
              </span>
            </div>
            <div className="flex h-full  flex-1 flex-col items-start justify-center  rounded-[8px] border border-line-primary pl-[10px]">
              <div className="flex gap-[5px] text-[14px] text-tc-secondary">
                <span>Liquidation penalty</span>
                <ExclamationCircleOutlined />
              </div>
              <span className="text-[14px] font-[500]">
                {asset?.depositInterest || 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </LendingCard>
  );
};

export default TokenSupplyInfo;
