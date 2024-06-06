import { Link } from 'react-router-dom';
import { LiquidityIcon, SwapIcon } from '@/components/icons';
import SwapPanel from './SwapPanel.tsx';
import useSwap from '@/pages/trade/hooks/useSwap.ts';
import ConfirmPanel from './ConfirmPanel.tsx';

function Swap() {
  const { swapStep, ...rest } = useSwap();
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-[70px]">
      <div className="flex-center gap-[40px]">
        <Link
          to="/trade/swap"
          className="flex-center h-[40px] cursor-pointer gap-[12px] rounded-[20px] px-[16px] hover:bg-theme-non-opaque hover:text-theme"
        >
          <SwapIcon />
          <span>Swap</span>
        </Link>
        <div className="flex-center h-[40px] cursor-pointer gap-[12px] rounded-[20px] bg-theme-non-opaque px-[16px] text-theme">
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
