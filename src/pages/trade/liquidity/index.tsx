import { Link } from 'react-router-dom';
import { LiquidityIcon, SwapIcon } from '@/components/icons';
import SwapPanel from './SwapPanel.tsx';
import ConfirmPanel from './ConfirmPanel.tsx';
import useAddLP from '@/pages/trade/hooks/useAddLP.ts';

function Liquidity() {
  const props = useAddLP();
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
      {props.step === 'FILL' ? (
        <SwapPanel {...props} />
      ) : (
        <ConfirmPanel {...props} />
      )}
    </div>
  );
}

export default Liquidity;
