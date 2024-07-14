import { Token } from '@/types/swap.ts';

interface SwapInfoProps {
  outputToken?: Token;
  inputToken?: Token;
  fromPairUnit?: { amount: number; price: number };
}

const SwapInfo = ({ outputToken, inputToken, fromPairUnit }: SwapInfoProps) => {
  return (
    <div className="flex-center-between">
      <span className="text-tc-secondary">Price</span>
      <span>
        {` 1${inputToken?.symbol} = ${fromPairUnit?.amount || 0}${outputToken?.symbol}`}
        {` $(${fromPairUnit?.price || 0})`}
      </span>
    </div>
  );
};

export default SwapInfo;
