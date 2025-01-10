import TokenInput from '@/components/XUSDTokenInput.tsx';
import { ArrowDownOutlined, CheckCircleOutlined } from '@ant-design/icons';
import SwapInfo from '@/pages/x-libra-usd/mint/SwapInfo.tsx';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import { Button } from 'antd';
import useWalletAuth from '@/components/Wallet/useWalletAuth.ts';
import useApprove from '@/pages/x-dex/hooks/useApprove.ts';
import { XUNION_SLC_CONTRACT } from '@/contracts';
import { Address } from 'viem';
import useBurn from '@/pages/x-libra-usd/hooks/useBurn.ts';
import { useTranslate } from '@/i18n';

function BurnSLC() {
  const {
    inputToken,
    setOutputToken,
    outputToken,
    payAmount,
    setPayAmount,
    receiveAmount,
    inputOwnerAmount,
    outputOwnerAmount,
    outputTokenTotalPrice,
    inputTokenTotalPrice,
    toPairUnit,
    fromPairUnit,
    isInsufficient,
    isReady,
    isSubmittedLoading,
    onConfirm,
  } = useBurn();

  const {
    isApproved: isTokenAApproved,
    loading: isTokenAApproving,
    approve: approveTokenA,
  } = useApprove({
    token: inputToken!,
    amount: payAmount,
    spenderAddress: XUNION_SLC_CONTRACT.interface.address as Address,
  });

  const { t } = useTranslate();
  const { disabled } = useWalletAuth();

  const renderSwapText = () => {
    if (!inputToken?.address) {
      return (
        <Button className="w-full" type="primary" size="large" disabled>
          {t('x-dex.swap.token.modal.title')}
        </Button>
      );
    }
    if (isInsufficient) {
      return (
        <Button className="w-full" type="primary" size="large" disabled>
          {t('common.error.insufficient', { name: `${inputToken?.symbol} ` })}
        </Button>
      );
    }

    if (!isTokenAApproved && isReady) {
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
            ? t('common.approved', { name: `${inputToken?.symbol}` })
            : t('common.approve.to', { name: `${inputToken?.symbol}` })}
        </Button>
      );
    }
    return (
      <Button
        className="w-full"
        type="primary"
        size="large"
        disabled={!isReady || isInsufficient || !toPairUnit}
        onClick={onConfirm}
        loading={isSubmittedLoading}
      >
        {t('common.burn')}
      </Button>
    );
  };
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-[40px]   max-md:pt-[40px]">
      <div className="mt-[30px] min-h-[420px] w-full  flex-1 rounded-[20px] bg-fill-niubi p-[20px] max-md:min-w-[300px] md:min-w-[500px]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[16px] font-[500]">{t('x-usd.burn')}</span>
          <span className="text-[12px] text-theme">
            {/* 1 xUSD = 1.0001 USDC ($1) */}
          </span>
        </div>
        <div className="mt-[20px]">
          <TokenInput
            editable
            title={t('x-dex.swap.input.pay')}
            token={inputToken}
            onTokenChange={() => {}}
            amount={payAmount}
            onAmountChange={setPayAmount}
            disabled
            ownerAmount={inputOwnerAmount}
            totalPrice={inputTokenTotalPrice}
            showDropArrow={false}
          />
          <div className="relative h-[20px]">
            <div className="flex-center  absolute left-[50%]  top-[-8px] h-[36px] w-[36px] -translate-x-[50%] transform rounded-[2px] border-[3px] border-line-primary2 bg-background-primary">
              <ArrowDownOutlined />
            </div>
          </div>
          <TokenInput
            title={t('x-dex.swap.input.receive')}
            editable={false}
            token={outputToken}
            onTokenChange={setOutputToken}
            amount={receiveAmount}
            onAmountChange={() => {}}
            disabledToken={inputToken}
            disabled={disabled}
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

export default BurnSLC;