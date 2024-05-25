import { useTranslate } from '@/i18n';
import { LiquidityIcon, SwapIcon } from '@/components/icons';
import TokenInput from '@/pages/trade/swap/component/TokenInput.tsx';
import { Button } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import Slippage from '@/pages/trade/swap/component/Slippage.tsx';
import useSwap from '@/pages/trade/swap/useSwap.ts';
import SwapInfo from '@/pages/trade/swap/component/SwapInfo.tsx';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';

function Home() {
  const { t } = useTranslate();
  const {
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
    rate,
    feeAmount,
  } = useSwap();
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-[70px]">
      <div className="flex-center gap-[40px]">
        <div className="flex-center h-[40px] cursor-pointer gap-[12px] rounded-[20px] bg-theme-non-opaque px-[16px] text-theme">
          <SwapIcon />
          <span>Swap</span>
        </div>
        <div className="flex-center h-[40px] cursor-pointer gap-[12px] rounded-[20px] px-[16px] hover:bg-theme-non-opaque hover:text-theme">
          <LiquidityIcon />
          <span>Liquidity</span>
        </div>
      </div>
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
          <Slippage value={slippage} onChange={setSlippage} />
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
          />
          <div
            className="relative h-[20px] cursor-pointer hover:opacity-75"
            onClick={onExchange}
          >
            <div className="flex-center  absolute left-[50%]  top-[-8px] h-[36px] w-[36px] -translate-x-[50%] transform rounded-[2px] border-[3px] border-white bg-background-primary">
              <ArrowDownOutlined />
            </div>
          </div>
          <TokenInput
            title="You receive"
            token={outputToken}
            onTokenChange={setOutputToken}
            amount={receiveAmount}
            onAmountChange={setReceiveAmount}
            disabledToken={inputToken}
          />
        </div>
        {inputToken && outputToken && (
          <div className="px-[10px] py-[20px] text-[14px]">
            <SwapInfo
              slippage={slippage}
              priceImpact={priceImpact}
              fee={fee}
              feeAmount={feeAmount}
              estReceived={estReceived}
              minReceived={minReceived}
              rate={rate}
              inputToken={inputToken}
              outputToken={outputToken}
            />
          </div>
        )}

        <div className="mt-[20px] w-full">
          <WithAuthButton
            onClick={() => {
              console.log(123);
            }}
          >
            <Button className="w-full" type="primary" size="large">
              Swap
            </Button>
          </WithAuthButton>
        </div>
      </div>
    </div>
  );
}

export default Home;
