import Slippage from '@/pages/x-dex/swap/Slippage.tsx';

import useWalletAuth from '@/components/Wallet/useWalletAuth.ts';
import { SwapReturnType } from '@/pages/x-dex/hooks/useSwap.ts';
import SecondTabs from '@/pages/x-dex/swap/SecondTabs.tsx';

const SwapPanel = ({
  slippage,
  setSlippage,
  deadline,
  setDeadline,
}: SwapReturnType) => {
  const { disabled } = useWalletAuth();

  return (
    <div className="mt-[30px] min-h-[420px] w-[500px]  rounded-[20px] bg-fill-niubi p-[20px] max-md:mx-[20px] max-md:w-[calc(100%-40px)]">
      <div className="flex items-center justify-between ">
        <SecondTabs active="Limit" />
        <Slippage
          value={slippage}
          onChange={setSlippage}
          disabled={disabled}
          deadline={deadline}
          onDeadlineChange={setDeadline}
        />
      </div>
      <div className="mt-[20px]">....</div>
    </div>
  );
};

export default SwapPanel;
