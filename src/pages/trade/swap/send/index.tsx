import { LiquidityIcon, SwapIcon } from '@/components/icons';
import SendingPanel from './SendingPanel.tsx';
import useSwap from '@/pages/trade/hooks/useSwap.ts';
import RouteTabs from '@/pages/trade/component/RouteTabs.tsx';

function Swap() {
  const { ...rest } = useSwap();
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-[70px] max-md:pt-[40px] ">
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
      <SendingPanel {...rest} />
    </div>
  );
}

export default Swap;
