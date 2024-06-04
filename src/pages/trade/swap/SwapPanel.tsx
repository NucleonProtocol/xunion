import Slippage from '@/pages/trade/swap/component/Slippage.tsx';
import TokenInput from '@/pages/trade/swap/component/TokenInput.tsx';
import { ArrowDownOutlined } from '@ant-design/icons';
import SwapInfo from '@/pages/trade/swap/component/SwapInfo.tsx';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import { Button } from 'antd';
import { useTranslate } from '@/i18n';
import useWalletAuth from '@/components/Wallet/useWalletAuth.ts';
import { SwapReturnType } from '@/pages/trade/swap/hooks/useSwap.ts';

const SwapPanel = ({
  slippage,
  setSlippage,
  onExchange,
  inputToken,
  setInputToken,
  setOutputToken,
  outputToken,
  payAmount,
  setPayAmount,
  receiveAmount,
  setReceiveAmount,
  priceImpact,
  fee,
  estReceived,
  minReceived,
  feeAmount,
  inputOwnerAmount,
  outputOwnerAmount,
  deadline,
  setDeadline,
  outputTokenTotalPrice,
  inputTokenTotalPrice,
  toPairUnit,
  fromPairUnit,
  isInsufficient,
  isReady,
  isInsufficientLiquidity,
  onConfirm,
}: SwapReturnType) => {
  const { t } = useTranslate();

  const { disabled } = useWalletAuth();

  const renderSwapText = () => {
    if (isInsufficient) {
      return `Insufficient ${inputToken?.symbol} Balance`;
    }
    if (isInsufficientLiquidity) {
      return 'Insufficient liquidity for this trade.';
    }
    return 'Swap';
  };
  return (
    <div className="mt-[30px] min-h-[420px] w-[500px] rounded-[20px] bg-fill-niubi  p-[20px]">
      <div className="flex items-center justify-between ">
        <div className="flex-center gap-[10px]">
          <div className="flex-center h-[36px] rounded-[20px] bg-fill-primary px-[16px]">
            {t('swap')}
          </div>
          <div className="flex-center h-[36px] rounded-[20px] px-[16px] text-tc-secondary">
            Limit
          </div>
          <div className="flex-center h-[36px] rounded-[20px] px-[16px] text-tc-secondary">
            Send
          </div>
        </div>
        <Slippage
          value={slippage}
          onChange={setSlippage}
          disabled={disabled}
          deadline={deadline}
          onDeadlineChange={setDeadline}
        />
      </div>
      <div className="mt-[20px]">
        <TokenInput
          title="You pay"
          editable
          token={inputToken}
          onTokenChange={setInputToken}
          amount={payAmount}
          onAmountChange={setPayAmount}
          disabledToken={outputToken}
          disabled={disabled}
          onMax={(ownerAmount) => {
            setPayAmount(ownerAmount.toString());
          }}
          ownerAmount={inputOwnerAmount}
          totalPrice={inputTokenTotalPrice}
        />
        <div
          className="relative h-[20px] cursor-pointer hover:opacity-75"
          onClick={onExchange}
        >
          <div className="flex-center  absolute left-[50%]  top-[-8px] h-[36px] w-[36px] -translate-x-[50%] transform rounded-[2px] border-[3px] border-line-primary2 bg-background-primary">
            <ArrowDownOutlined />
          </div>
        </div>
        <TokenInput
          title="You receive"
          editable
          token={outputToken}
          onTokenChange={setOutputToken}
          amount={receiveAmount}
          onAmountChange={setReceiveAmount}
          disabledToken={inputToken}
          disabled={disabled}
          ownerAmount={outputOwnerAmount}
          totalPrice={outputTokenTotalPrice}
        />
      </div>
      {isReady && (
        <div className="px-[10px] py-[20px] text-[14px]">
          <SwapInfo
            slippage={slippage}
            priceImpact={priceImpact}
            fee={fee}
            feeAmount={feeAmount}
            estReceived={estReceived}
            minReceived={minReceived}
            inputToken={inputToken}
            outputToken={outputToken}
            toPairUnit={toPairUnit}
            fromPairUnit={fromPairUnit}
          />
        </div>
      )}

      <div className="mt-[20px] w-full">
        <WithAuthButton onClick={onConfirm}>
          <Button
            className="w-full"
            type="primary"
            size="large"
            disabled={!isReady || isInsufficient || isInsufficientLiquidity}
          >
            {renderSwapText()}
          </Button>
        </WithAuthButton>
      </div>
    </div>
  );
};

export default SwapPanel;
