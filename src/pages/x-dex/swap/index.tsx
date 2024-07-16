import { LiquidityIcon, SwapIcon } from '@/components/icons';
import SwapPanel from '@/pages/x-dex/swap/SwapPanel.tsx';
import useSwap from '@/pages/x-dex/hooks/useSwap.ts';
import ConfirmPanel from '@/pages/x-dex/swap/ConfirmPanel.tsx';
import RouteTabs from '@/components/RouteTabs.tsx';
import useXWriteContract from '@/hooks/useXWriteContract.ts';
import { WriteContractMutateAsync } from '@wagmi/core/query';

function Swap() {
  const { swapStep, onFillSwap, ...rest } = useSwap();
  const { writeContractAsync, isSubmittedLoading } = useXWriteContract({
    onSubmitted: () => {
      onFillSwap?.();
    },
  });
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
      {swapStep === 'FILL' ? (
        <SwapPanel {...rest} />
      ) : (
        <ConfirmPanel
          {...rest}
          onFillSwap={onFillSwap}
          writeContractAsync={
            writeContractAsync as WriteContractMutateAsync<any>
          }
          isSubmittedLoading={isSubmittedLoading}
        />
      )}
    </div>
  );
}

export default Swap;
