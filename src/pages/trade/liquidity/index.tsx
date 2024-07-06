import { LiquidityIcon, SwapIcon } from '@/components/icons';
import SwapPanel from './SwapPanel.tsx';
import ConfirmPanel from './ConfirmPanel.tsx';
import useAddLP from '@/pages/trade/hooks/useAddLP.ts';
import RouteTabs from '@/components/RouteTabs.tsx';

function Liquidity() {
  const props = useAddLP();
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
        active="Liquidity"
      />
      {props.step === 'FILL' ? (
        <SwapPanel {...props} />
      ) : (
        <ConfirmPanel {...props} />
      )}
    </div>
  );
}

export default Liquidity;
