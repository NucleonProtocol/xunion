import { RightOutlined, UpOutlined } from '@ant-design/icons';
import { SlippageValue } from '@/pages/trade/swap/component/Slippage.tsx';
import { RateInfo, Token } from '@/types/swap.ts';
import { useState } from 'react';
import { cn } from '@/utils/classnames.ts';

const SwapInfo = ({
  slippage,
  rate,
  priceImpact,
  fee,
  feeAmount,
  estReceived,
  minReceived,
  outputToken,
  inputToken,
}: {
  slippage: string;
  priceImpact: number;
  fee: number;
  feeAmount: number;
  estReceived: number;
  minReceived: number;
  rate: RateInfo;
  outputToken?: Token;
  inputToken?: Token;
}) => {
  const [fold, setFold] = useState(true);
  return (
    <div>
      <div className="flex-center-between">
        <span>
          {`${rate.fromUnit}${inputToken?.symbol}=${rate.toUnit}${outputToken?.symbol}`}
          {/*<span className="text-tc-secondary">($1.00)</span>*/}
        </span>
        <div
          className="flex-center cursor-pointer gap-[5px]"
          onClick={() => {
            setFold(!fold);
          }}
        >
          <span className="text-tc-secondary">${rate.usdt}</span>
          <UpOutlined
            className={cn(
              'rotate-180 text-[12px] text-tc-secondary transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)]',
              { 'rotate-0': fold }
            )}
          />
        </div>
      </div>
      {fold && (
        <div className="mt-[10px] flex flex-col gap-[6px]">
          <div className="flex-center-between">
            <span className="text-tc-secondary">Price impact</span>
            <span>~{priceImpact}%</span>
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
      )}
    </div>
  );
};

export default SwapInfo;
