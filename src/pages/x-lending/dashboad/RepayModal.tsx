import { Button, Modal } from 'antd';
import TokenInput from '@/components/TokenInput.tsx';
import { CheckCircleOutlined } from '@ant-design/icons';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import useApprove from '@/pages/x-dex/hooks/useApprove.ts';
import { Address } from 'viem';
import Warning from '@/components/Warning.tsx';
import { formatCurrency } from '@/utils';
import { formatNumber } from '@/hooks/useErc20Balance.ts';
import HealthFactor from '@/components/Borrow/HealthFactor.tsx';
import { isNumeric } from '@/utils/isNumeric.ts';
import useRepay from '@/pages/x-lending/hooks/useRepay.ts';
import { LendingAsset } from '@/types/Lending.ts';
import { XUNION_LENDING_CONTRACT } from '@/contracts';
import { useTranslate } from '@/i18n';

const RepayModal = ({
  asset,
  onClose,
  refresh,
  userHealthFactor,
}: {
  asset: LendingAsset;
  onClose: () => void;
  refresh: () => void;
  userHealthFactor: number;
}) => {
  const {
    inputToken,
    payAmount,
    setPayAmount,
    inputTokenTotalPrice,
    isInsufficient,
    isReady,
    isSubmittedLoading,
    onConfirm,
    healthFactor,
    loading,
    availableAmount,
  } = useRepay({ asset, refresh });
  const { t } = useTranslate();
  const {
    isApproved: isTokenAApproved,
    loading: isTokenAApproving,
    approve: approveTokenA,
  } = useApprove({
    token: inputToken!,
    amount: payAmount,
    spenderAddress: XUNION_LENDING_CONTRACT.interface.address as Address,
  });

  const renderSwapText = () => {
    if (isInsufficient) {
      return (
        <Button className="w-full" type="primary" size="large" disabled>
          {t('x-lending.supply.available.amount', {
            amount: `${availableAmount}`,
          })}
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
          {t('x-dex.swap.give.permission', { name: `${inputToken.symbol}` })}
        </Button>
      );
    }
    return (
      <Button
        className="w-full"
        type="primary"
        size="large"
        disabled={!isReady || isInsufficient}
        onClick={onConfirm}
        loading={isSubmittedLoading || loading}
      >
        {t('x-lending.repay.to', { name: `${inputToken?.symbol}` })}
      </Button>
    );
  };
  return (
    <Modal
      open={!!asset}
      onCancel={onClose}
      title={t('x-lending.repay.to', { name: `${inputToken?.symbol}` })}
      footer={null}
      centered
      maskClosable={false}
    >
      <div>
        <div className="mt-[20px]">
          <TokenInput
            editable
            title={t('x-lending.borrow.input.amount')}
            token={inputToken}
            onTokenChange={() => {}}
            amount={payAmount}
            onAmountChange={setPayAmount}
            disabled
            ownerAmount={formatNumber(availableAmount || 0, 6)}
            totalPrice={inputTokenTotalPrice}
            amountLabel={t('x-lending.available')}
            showDropArrow={false}
            onMax={() => {
              setPayAmount(formatNumber(availableAmount || 0, 6).toString());
            }}
          />
        </div>
        <div className="flex flex-col gap-[5px] p-[16px]">
          <div className="flex-center-between">
            <span className="text-tc-secondary">
              {t('x-lending.repay.remaining.debt')}
            </span>
            <div className="flex-center flex gap-[10px]">
              <span>
                {formatCurrency(availableAmount || 0, false)} $
                {inputToken?.symbol}
              </span>
              <span>{`->`}</span>
              <span>
                {formatCurrency(
                  (availableAmount || 0) -
                    Number(isNumeric(payAmount) ? payAmount : 0),
                  false
                )}{' '}
                ${inputToken?.symbol}
              </span>
            </div>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-tc-secondary">
              {t('x-lending.health.factor')}
            </span>
            <div className="flex flex-col items-end justify-end gap-[10px]">
              <div className="flex-center gap-[10px]">
                <HealthFactor value={`${userHealthFactor}` || '0'} />
                <span className="text-[12px] text-tc-secondary">{`>`}</span>
                <HealthFactor
                  value={healthFactor || `${userHealthFactor}` || '0'}
                />
              </div>
              <div className="text-[12px] text-tc-secondary">
                <span>{`${t('x-lending.borrow.mode.high.health')} < 1.0`}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Warning>{t('x-lending.repay.detail')}</Warning>
        </div>
        <div className="mt-[20px] h-[56px]  w-full">
          <WithAuthButton>{renderSwapText()}</WithAuthButton>
        </div>
      </div>
    </Modal>
  );
};

export default RepayModal;
