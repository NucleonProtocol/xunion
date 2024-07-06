import { BuySellIcon, BorrowIcon } from '@/components/icons';
import RouteTabs from '@/components/RouteTabs.tsx';
import useBuySLC from '@/pages/slc/hooks/useBuySLC.ts';
import SecondTabs from '@/pages/slc/buy/SecondTabs.tsx';
import TokenInput from '@/components/TokenInput.tsx';
import { ArrowDownOutlined, CheckCircleOutlined } from '@ant-design/icons';
import SwapInfo from '@/pages/slc/buy/SwapInfo.tsx';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import { Button } from 'antd';
import useWalletAuth from '@/components/Wallet/useWalletAuth.ts';
import useApprove from '@/pages/trade/hooks/useApprove.ts';
import { XUNION_SWAP_CONTRACT } from '@/contracts';
import { Address } from 'viem';
import useNativeToken from '@/hooks/useNativeToken.ts';

function BuySLC() {
  const {
    inputToken,
    setInputToken,
    outputToken,
    payAmount,
    setPayAmount,
    receiveAmount,
    setReceiveAmount,
    inputOwnerAmount,
    outputOwnerAmount,
    outputTokenTotalPrice,
    inputTokenTotalPrice,
    toPairUnit,
    fromPairUnit,
    isInsufficient,
    isReady,
    isInsufficientLiquidity,
    isSubmittedLoading,
    onConfirm,
  } = useBuySLC();

  const {
    isApproved: isTokenAApproved,
    loading: isTokenAApproving,
    approve: approveTokenA,
  } = useApprove({
    token: inputToken!,
    amount: payAmount,
    spenderAddress: XUNION_SWAP_CONTRACT.interface.address as Address,
  });

  const { isNativeToken } = useNativeToken();

  const { disabled } = useWalletAuth();

  const renderSwapText = () => {
    if (!inputToken?.address) {
      return (
        <Button className="w-full" type="primary" size="large" disabled>
          Select a token
        </Button>
      );
    }
    if (isInsufficient) {
      return (
        <Button className="w-full" type="primary" size="large" disabled>
          {`Insufficient ${inputToken?.symbol} Balance`}
        </Button>
      );
    }
    if (isInsufficientLiquidity) {
      return (
        <Button className="w-full" type="primary" size="large" disabled>
          Insufficient liquidity for this trade.
        </Button>
      );
    }
    if (!isTokenAApproved && !isNativeToken(inputToken)) {
      return (
        <Button
          className="w-full"
          type="primary"
          size="large"
          disabled={isTokenAApproved}
          icon={isTokenAApproved ? <CheckCircleOutlined /> : null}
          loading={isTokenAApproving}
          onClick={approveTokenA}
        >
          {isTokenAApproved
            ? `${inputToken?.symbol} Approved`
            : `Approve ${inputToken?.symbol}`}
        </Button>
      );
    }
    return (
      <Button
        className="w-full"
        type="primary"
        size="large"
        disabled={
          !isReady || isInsufficient || isInsufficientLiquidity || !toPairUnit
        }
        onClick={onConfirm}
        loading={isSubmittedLoading}
      >
        Buy
      </Button>
    );
  };
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-[70px] max-md:pt-[40px] ">
      <RouteTabs
        tabs={[
          {
            name: 'Buy',
            path: '/slc/buy',
            icon: <BuySellIcon />,
            label: 'Buy & Sell',
          },
          {
            name: 'Borrow',
            path: '/slc/borrow',
            icon: <BorrowIcon />,
          },
        ]}
        active="Buy"
      />
      <div className="mt-[30px] min-h-[420px] w-[500px]  rounded-[20px] bg-fill-niubi p-[20px] max-md:mx-[20px] max-md:w-[calc(100%-40px)]">
        <div className="flex items-center justify-between ">
          <SecondTabs active="Buy" />
        </div>
        <div className="mt-[20px]">
          <TokenInput
            editable
            title="You pay"
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
          <div className="relative h-[20px]">
            <div className="flex-center  absolute left-[50%]  top-[-8px] h-[36px] w-[36px] -translate-x-[50%] transform rounded-[2px] border-[3px] border-line-primary2 bg-background-primary">
              <ArrowDownOutlined />
            </div>
          </div>
          <TokenInput
            title="You receive"
            editable
            token={outputToken}
            onTokenChange={() => {}}
            amount={receiveAmount}
            onAmountChange={setReceiveAmount}
            disabled
            ownerAmount={outputOwnerAmount}
            totalPrice={outputTokenTotalPrice}
          />
        </div>
        {isReady && !!toPairUnit && (
          <div className="px-[10px] py-[20px] text-[14px]">
            <SwapInfo
              inputToken={inputToken}
              outputToken={outputToken}
              fromPairUnit={fromPairUnit}
            />
          </div>
        )}

        <div className="mt-[20px] h-[56px]  w-full">
          <WithAuthButton>{renderSwapText()}</WithAuthButton>
        </div>
      </div>
    </div>
  );
}

export default BuySLC;
