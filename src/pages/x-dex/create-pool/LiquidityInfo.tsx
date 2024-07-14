import { Token } from '@/types/swap.ts';
import { isNumeric } from '@/utils/isNumeric.ts';
import { formatNumber } from '@/hooks/useErc20Balance.ts';

export const getPerAmount = (amountA: string, amountB: string) => {
  if (!isNumeric(amountA) || !isNumeric(amountB)) return 0;
  return formatNumber(Number(amountB) / Number(amountA), 6);
};

const LiquidityInfo = ({
  tokenA,
  tokenB,
  tokenAAmount,
  tokenBAmount,
  shareOfPool,
}: {
  tokenA?: Token;
  tokenB?: Token;
  tokenAAmount: string;
  tokenBAmount: string;
  shareOfPool: number;
}) => {
  return (
    <div className="mt-[10px] flex flex-col gap-[6px]">
      <div className="flex-center-between">
        <span className="text-tc-secondary">
          {tokenA?.symbol} per {tokenB?.symbol}
        </span>
        <span>{getPerAmount(tokenAAmount, tokenBAmount)}</span>
      </div>
      <div className="flex-center-between">
        <span className="text-tc-secondary">
          {tokenB?.symbol} per {tokenA?.symbol}
        </span>
        <span>{getPerAmount(tokenBAmount, tokenAAmount)}</span>
      </div>
      <div className="flex-center-between">
        <span className="text-tc-secondary">Share of pool</span>
        <span>{shareOfPool}%</span>
      </div>
    </div>
  );
};

export default LiquidityInfo;
