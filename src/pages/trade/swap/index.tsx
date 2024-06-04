import { LiquidityIcon, SwapIcon } from '@/components/icons';
import SwapPanel from '@/pages/trade/swap/SwapPanel.tsx';
import useSwap from '@/pages/trade/swap/hooks/useSwap.ts';
import ConfirmPanel from '@/pages/trade/swap/ConfirmPanel.tsx';

function Swap() {
  const { swapStep, ...rest } = useSwap();
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-[70px]">
      <div className="flex-center gap-[40px]">
        <div className="flex-center h-[40px] cursor-pointer gap-[12px] rounded-[20px] bg-theme-non-opaque px-[16px] text-theme">
          <SwapIcon />
          <span>Swap</span>
        </div>
        <div className="flex-center h-[40px] cursor-pointer gap-[12px] rounded-[20px] px-[16px] hover:bg-theme-non-opaque hover:text-theme">
          <LiquidityIcon />
          <span>Liquidity</span>
        </div>
      </div>
      {swapStep === 'FILL' ? (
        <SwapPanel {...rest} />
      ) : (
        <ConfirmPanel {...rest} />
      )}
    </div>
  );
}

export default Swap;
