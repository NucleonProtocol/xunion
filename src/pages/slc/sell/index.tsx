import { BuySellIcon, BorrowIcon } from '@/components/icons';
import SwapPanel from './SwapPanel.tsx';
import useSwap from '@/pages/trade/hooks/useSwap.ts';
import ConfirmPanel from '@/pages/trade/swap/ConfirmPanel.tsx';
import RouteTabs from '@/components/RouteTabs.tsx';

function Swap() {
  const { swapStep, ...rest } = useSwap();
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-[70px] max-md:pt-[40px] ">
      <RouteTabs
        tabs={[
          {
            name: 'Buy',
            path: '/slc/buy',
            icon: <BuySellIcon />,
            label: 'Buy & Sell',
          },
          {
            name: 'Borrow',
            path: '/slc/borrow',
            icon: <BorrowIcon />,
          },
        ]}
        active="Buy"
      />
      {swapStep === 'FILL' ? (
        <SwapPanel {...rest} />
      ) : (
        <ConfirmPanel {...rest} />
      )}
    </div>
  );
}

export default Swap;
