import { LeftOutlined } from '@ant-design/icons';
import { ConfirmContent } from '@/pages/trade/swap/component/SwapInfo.tsx';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import { Button } from 'antd';
import { SwapReturnType } from '@/pages/trade/swap/hooks/useSwap.ts';
import { Token } from '@/types/swap.ts';
import useApprove from '@/pages/trade/swap/hooks/useApprove.ts';
import { XUNION_SWAP_CONTRACT } from '@/contracts';
import { Address } from 'viem';
import useConfirm from '@/pages/trade/swap/hooks/useConfirm.ts';

const TokenItem = ({
  token,
  amount,
  title,
}: {
  token?: Token;
  amount?: string;
  title?: string;
}) => {
  return (
    <div className="flex flex-col">
      <p className="text-[14px] text-tc-secondary">{title}</p>
      <div className="flex items-center py-[10px]">
        <span className="flex-1 text-[26px] font-bold">{amount}</span>
        <div className="flex-center gap-[5px]">
          <span className="text-[20px]">{token?.icon}</span>
          <span>{token?.symbol}</span>
        </div>
      </div>
    </div>
  );
};

const ConfirmPanel = ({
  slippage,
  inputToken,
  outputToken,
  payAmount,
  receiveAmount,
  priceImpact,
  fee,
  estReceived,
  minReceived,
  feeAmount,
  isInsufficient,
  isReady,
  onFillSwap,
  deadline,
}: SwapReturnType) => {
  const { isApproved, loading, approve } = useApprove({
    inputToken,
    payAmount,
    spenderAddress: XUNION_SWAP_CONTRACT.interface.address as Address,
  });
  const { confirm, isSubmittedLoading } = useConfirm({
    inputToken,
    outputToken,
    payAmount,
    receiveAmount,
    slippage,
    deadline,
    onFillSwap,
  });

  return (
    <div className="mt-[30px] min-h-[420px] w-[500px] rounded-[20px] bg-fill-niubi  p-[20px]">
      <a
        className="inline-block w-auto cursor-pointer font-bold hover:text-theme"
        onClick={onFillSwap}
      >
        <LeftOutlined />
        <span className="pl-[10px]">Confirm Swap</span>
      </a>
      <div className="mt-[20px]">
        <TokenItem token={inputToken} amount={payAmount} title="You pay" />
        <TokenItem
          token={outputToken}
          amount={receiveAmount}
          title="You receive"
        />
      </div>
      <div className="px-[10px] py-[20px] text-[14px]">
        <ConfirmContent
          slippage={slippage}
          priceImpact={priceImpact}
          fee={fee}
          feeAmount={feeAmount}
          estReceived={estReceived}
          minReceived={minReceived}
          inputToken={inputToken}
          outputToken={outputToken}
        />
      </div>
      <div className="rounded-[8px] bg-status-warning-non-opaque p-[10px]">
        <span className="text-[14px]">
          Output is estimated. You will receive at least
          <span className="px-[5px] text-status-error">
            {receiveAmount} {outputToken?.symbol}
          </span>
          or the transaction will revert.
        </span>
      </div>
      <div className="mt-[20px] w-full">
        <WithAuthButton
          disabled={!isReady || isInsufficient}
          onClick={() => {
            if (!isApproved) {
              approve();
            } else {
              confirm();
            }
          }}
        >
          <Button
            className="w-full"
            type="primary"
            size="large"
            loading={loading || isSubmittedLoading}
          >
            {!isApproved
              ? `Give permission to use ${inputToken?.symbol}`
              : 'Swap'}
          </Button>
        </WithAuthButton>
      </div>
    </div>
  );
};

export default ConfirmPanel;
