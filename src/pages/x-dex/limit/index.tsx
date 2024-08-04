import { LiquidityIcon, SwapIcon } from '@/components/icons';
import SwapPanel from './SwapPanel.tsx';
import useSwap from '@/pages/x-dex/hooks/useSwap.ts';
import RouteTabs from '@/components/RouteTabs.tsx';
import { useTranslate } from '@/i18n';

function Swap() {
  const { ...rest } = useSwap();
  const { t } = useTranslate();
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-[40px] max-md:pt-[40px] ">
      <RouteTabs
        tabs={[
          { name: t('x-dex.swap.title'), path: '/', icon: <SwapIcon /> },
          {
            name: t('x-dex.liquidity.title'),
            path: '/x-dex/liquidity',
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
