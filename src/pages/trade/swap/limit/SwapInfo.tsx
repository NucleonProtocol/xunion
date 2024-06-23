import { RightOutlined, UpOutlined } from '@ant-design/icons';
import { SlippageValue } from '@/pages/trade/swap/Slippage.tsx';
import { Token } from '@/types/swap.ts';
import { useState } from 'react';
import { cn } from '@/utils/classnames.ts';
import { ExchangeIcon } from '@/components/icons/tokens';

interface SwapInfoProps {
  slippage: string;
  priceImpact: number;
  fee: number;
  feeAmount: number;
  estReceived: number;
  minReceived: number;
  outputToken?: Token;
  inputToken?: Token;
  toPairUnit?: { amount: number; price: number };
  fromPairUnit?: { amount: number; price: number };
}

export const ConfirmContent = ({
  slippage,
  priceImpact,
  fee,
  feeAmount,
  estReceived,
  minReceived,
  outputToken,
  inputToken,
}: SwapInfoProps) => {
  return (
    <div className="mt-[10px] flex flex-col gap-[6px]">
      <div className="flex-center-between">
        <span className="text-tc-secondary">Price impact</span>
        <span className={cn({ 'text-red-600': Math.abs(priceImpact) > 3 })}>
          ≈ {priceImpact}%
        </span>
      </div>
      <div className="flex-center-between">
        <span className="text-tc-secondary">Slippage tolerance</span>
        <SlippageValue value={Number(slippage || 0)} />
      </div>
      <div className="flex-center-between">
        <span className="text-tc-secondary">Fee({fee}%)</span>
        <span>${feeAmount}</span>
      </div>
      <div className="flex-center-between">
        <span className="text-tc-secondary">Est.received</span>
        <span>{estReceived} USDT</span>
      </div>
      <div className="flex-center-between">
        <span className="text-tc-secondary">Min.received</span>
        <span>{minReceived} USDT</span>
      </div>
      <div className="flex-center-between">
        <span className="text-tc-secondary">Route</span>
        <div className="flex-center gap-[5px]">
          <span className="flex-center gap-[5px]">
            {inputToken?.icon}
            {inputToken?.symbol}
          </span>
          <RightOutlined className="mx-[10px] text-[12px] text-tc-secondary" />
          <span className="flex-center gap-[5px]">
            {outputToken?.icon}
            {outputToken?.symbol}
          </span>
        </div>
      </div>
    </div>
  );
};

const SwapInfo = ({
  outputToken,
  inputToken,
  toPairUnit,
  fromPairUnit,
  ...rest
}: SwapInfoProps) => {
  const [fold, setFold] = useState(true);
  const [route, setRoute] = useState<'FROM' | 'TO'>('FROM');
  const onUnitChange = () => {
    setRoute(route === 'FROM' ? 'TO' : 'FROM');
  };

  return (
    <div>
      <div className="flex-center-between">
        <div className="flex-center cursor-pointer" onClick={onUnitChange}>
          <ExchangeIcon />
          <span>
            {route === 'FROM'
              ? ` 1${inputToken?.symbol} = ${fromPairUnit?.amount || 0}${outputToken?.symbol}`
              : ` 1${outputToken?.symbol} = ${toPairUnit?.amount || 0}${inputToken?.symbol}`}
          </span>
        </div>
        <div
          className="flex-center cursor-pointer gap-[5px]"
          onClick={() => {
            setFold(!fold);
          }}
        >
          <span className="text-tc-secondary">
            $
            {route === 'FROM'
              ? fromPairUnit?.price || 0
              : toPairUnit?.price || 0}
          </span>
          <UpOutlined
            className={cn(
              'rotate-180 text-[12px] text-tc-secondary transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)]',
              { 'rotate-0': fold }
            )}
          />
        </div>
      </div>
      {fold && (
        <ConfirmContent
          {...rest}
          inputToken={inputToken}
          outputToken={outputToken}
        />
      )}
    </div>
  );
};

export default SwapInfo;
