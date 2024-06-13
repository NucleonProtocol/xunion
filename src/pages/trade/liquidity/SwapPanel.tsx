import TokenInput from '@/pages/trade/component/TokenInput.tsx';
import { PlusOutlined } from '@ant-design/icons';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import { Button } from 'antd';
import useWalletAuth from '@/components/Wallet/useWalletAuth.ts';
import { LiquidityReturnType } from '@/pages/trade/hooks/useAddLP.ts';
import { isNumeric } from '@/utils/isNumeric.ts';
import LiquidityInfo from '@/pages/trade/liquidity/LiquidityInfo.tsx';
import Warning from '@/pages/trade/component/Warning.tsx';
import { Link } from 'react-router-dom';

const SwapPanel = ({
  tokenAAmount,
  tokenBAmount,
  tokenA,
  tokenB,
  onTokenBAmountChange,
  onTokenAAmountChange,
  onTokenBChange,
  onTokenAChange,
  tokenAOwnerAmount,
  tokenBOwnerAmount,
  tokenASLCPairAddress,
  tokenBSLCPairAddress,
  isInsufficientLiquidity,
  invalidPool,
  isReady,
  shareOfPool,
  setStep,
}: LiquidityReturnType) => {
  const { disabled: invalidWallet } = useWalletAuth();

  const renderADDLPText = () => {
    if (tokenA?.address && tokenB?.address) {
      if (!tokenASLCPairAddress) {
        return (
          <div className="flex flex-col gap-[10px]">
            <Warning>
              Initial pool not found. You need to first set up an initial pool
              using the SLC. Swap SLC Initial pool not found. You need to first
              set up an initial pool using the SLC.
            </Warning>
            <Link to="/trade/create-pool?tokenA=0x123123&tokenB=0x881233">
              <Button className="w-full" type="primary" size="large" disabled>
                {`Initialize ${tokenA?.symbol} pool`}
              </Button>
            </Link>
          </div>
        );
      }
      if (!tokenBSLCPairAddress) {
        return (
          <div className="flex flex-col gap-[10px]">
            <Warning>
              Initial pool not found. You need to first set up an initial pool
              using the SLC. Swap SLC Initial pool not found. You need to first
              set up an initial pool using the SLC.
            </Warning>
            <Link to="/trade/create-pool?tokenA=0x123123&tokenB=0x881233">
              <Button className="w-full" type="primary" size="large">
                {`Initialize ${tokenB?.symbol} pool`}
              </Button>
            </Link>
          </div>
        );
      }
      if (invalidPool || isInsufficientLiquidity) {
        return (
          <div className="flex flex-col gap-[10px]">
            <Warning>
              Initial pool not found. You need to first set up an initial pool
              using the SLC.
            </Warning>
            <Link to="/trade/create-pool?tokenA=0x123123&tokenB=0x881233">
              <Button className="w-full" type="primary" size="large">
                Create pool
              </Button>
            </Link>
          </div>
        );
      }
      if (isNumeric(tokenAAmount) && Number(tokenAAmount) > tokenAOwnerAmount) {
        return (
          <Button className="w-full" type="primary" size="large" disabled>
            {`Insufficient ${tokenA?.symbol} balance`}
          </Button>
        );
      }
      if (isNumeric(tokenBAmount) && Number(tokenBAmount) > tokenBOwnerAmount) {
        return (
          <Button className="w-full" type="primary" size="large" disabled>
            {`Insufficient ${tokenB?.symbol} balance`}
          </Button>
        );
      }
    }

    return (
      <Button
        className="w-full"
        type="primary"
        size="large"
        onClick={() => {
          if (isReady) {
            setStep('CONFIRM');
          }
        }}
        disabled={!isReady}
      >
        Add Liquidity
      </Button>
    );
  };
  return (
    <div className="mt-[30px] min-h-[400px] w-[500px] rounded-[20px] bg-fill-niubi  p-[20px]">
      <div className="mt-[20px]">
        <TokenInput
          title="Token A"
          editable
          token={tokenA}
          onTokenChange={onTokenAChange}
          amount={tokenAAmount}
          onAmountChange={onTokenAAmountChange}
          disabledToken={tokenB}
          disabled={invalidWallet}
          onMax={(ownerAmount) => {
            onTokenAAmountChange(ownerAmount.toString());
          }}
          ownerAmount={tokenAOwnerAmount}
          totalPrice={0}
        />
        <div className="relative h-[20px]">
          <div className="flex-center  absolute left-[50%]  top-[-8px] h-[36px] w-[36px] -translate-x-[50%] transform rounded-[2px] border-[3px] border-line-primary2 bg-background-primary">
            <PlusOutlined />
          </div>
        </div>
        <TokenInput
          title="Token B"
          editable
          token={tokenB}
          onTokenChange={onTokenBChange}
          amount={tokenBAmount}
          onAmountChange={onTokenBAmountChange}
          disabledToken={tokenA}
          disabled={invalidWallet}
          onMax={(ownerAmount) => {
            onTokenBAmountChange(ownerAmount.toString());
          }}
          ownerAmount={tokenBOwnerAmount}
          totalPrice={0}
        />
      </div>

      {isReady && tokenASLCPairAddress && tokenBSLCPairAddress && (
        <div className="px-[20px] py-[10px]">
          <LiquidityInfo
            tokenA={tokenA}
            tokenBAmount={tokenBAmount}
            tokenB={tokenB}
            tokenAAmount={tokenAAmount}
            shareOfPool={shareOfPool}
          />
        </div>
      )}
      <div className="mt-[20px] w-full">
        <WithAuthButton>{renderADDLPText()}</WithAuthButton>
      </div>
    </div>
  );
};

export default SwapPanel;
