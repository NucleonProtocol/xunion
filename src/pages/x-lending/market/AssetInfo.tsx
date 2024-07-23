import { formatCurrency } from '@/utils';
import { formatUnits } from 'ethers';
import { LendingAsset } from '@/types/Lending.ts';
import { TokenIcon } from '@/components/icons';

const AssetInfo = ({
  netWorth,
  asset,
}: {
  netWorth: bigint;
  asset?: LendingAsset;
}) => {
  return (
    <div className="flex w-full items-center justify-around">
      <div className="mr-[40px] flex h-[76px] min-w-[225px] items-center gap-[20px] border-[2px] border-transparent border-r-line-primary">
        <TokenIcon src={asset?.token.icon} width={50} height={50} />
        <div className="flex flex-col items-center gap-[10px]">
          <span className="text-[16px] text-tc-secondary">
            {asset?.token.name || asset?.token.symbol}
          </span>
          <span className="text-[24px]">{asset?.token.symbol}</span>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px] py-[12px] pr-[16px]">
          <span className="text-[16px] text-tc-secondary">Reserve size</span>
          <span className="text-[20px] font-bold">
            {formatCurrency(Number(formatUnits(netWorth.toString())), true)}
          </span>
        </div>

        <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px]  py-[12px] pr-[16px]  ">
          <span className="text-[16px] text-tc-secondary">
            Available liquidity
          </span>
          <span className="text-[20px] font-bold">
            {formatCurrency(Number(formatUnits(netWorth.toString())), true)}
          </span>
        </div>
        <div className="flex h-[84px] min-w-[200px] flex-col gap-[10px]  py-[12px] pr-[16px]  ">
          <span className="text-[16px] text-tc-secondary">
            Utilization rate
          </span>
          <span className="text-[20px] font-bold">
            {formatCurrency(Number(formatUnits(netWorth.toString())), true)}
          </span>
        </div>
      </div>
      <div className="flex h-[84px] flex-col items-end">
        <span className="flex h-[52px] items-center justify-end text-tc-secondary">
          Oracle price
        </span>
        <span className="text-[20px] font-bold">
          {formatCurrency(Number(formatUnits(netWorth.toString())), true)}
        </span>
      </div>
    </div>
  );
};
export default AssetInfo;
