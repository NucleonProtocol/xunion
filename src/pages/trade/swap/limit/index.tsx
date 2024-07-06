import { LiquidityIcon, SwapIcon } from '@/components/icons';
import SwapPanel from './SwapPanel.tsx';
import useSwap from '@/pages/trade/hooks/useSwap.ts';
import RouteTabs from '@/components/RouteTabs.tsx';

function Swap() {
  const { ...rest } = useSwap();
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-[40px] max-md:pt-[40px] ">
      <RouteTabs
        tabs={[
          { name: 'Swap', path: '/', icon: <SwapIcon /> },
          {
            name: 'Liquidity',
            path: '/trade/liquidity',
            icon: <LiquidityIcon />,
          },
        ]}
        active="Swap"
      />
      <SwapPanel {...rest} />
    </div>
  );
}

export default Swap;
