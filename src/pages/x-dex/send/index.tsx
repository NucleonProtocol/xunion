import { LiquidityIcon, SwapIcon } from '@/components/icons';
import SendingPanel from './SendingPanel.tsx';
import RouteTabs from '@/components/RouteTabs.tsx';

function Swap() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-[40px] max-md:pt-[40px] ">
      <RouteTabs
        tabs={[
          { name: 'Swap', path: '/', icon: <SwapIcon /> },
          {
            name: 'Liquidity',
            path: '/x-dex/liquidity',
            icon: <LiquidityIcon />,
          },
        ]}
        active="Swap"
      />
      <SendingPanel />
    </div>
  );
}

export default Swap;