import { Button, Modal } from 'antd';
import TokenInput from '@/components/TokenInput.tsx';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import Warning from '@/components/Warning.tsx';
import HealthFactor from '@/components/Borrow/HealthFactor.tsx';
import { LendingAsset } from '@/types/Lending.ts';
import useWithdraw from '@/pages/x-lending/hooks/useWithdraw.ts';

const WithdrawModal = ({
  onClose,
  asset,
  refresh,
}: {
  onClose: () => void;
  asset: LendingAsset;
  refresh: () => void;
}) => {
  const {
    withdraw,
    inputToken,
    payAmount,
    setPayAmount,
    isInsufficient,
    isSubmittedLoading,
    loading,
    inputTokenTotalPrice,
    userHealthFactor,
    estimatedHealthFactor,
    remainingProvided,
  } = useWithdraw({ asset, refresh });

  const renderSwapText = () => {
    if (isInsufficient && payAmount) {
      return (
        <Button className="w-full" type="primary" size="large" disabled>
          {`Insufficient ${inputToken?.symbol} Provided`}
        </Button>
      );
    }
    return (
      <Button
        className="w-full"
        type="primary"
        size="large"
        disabled={!payAmount || isInsufficient}
        onClick={withdraw}
        loading={isSubmittedLoading || loading}
      >
        {`Withdraw ${inputToken?.symbol}`}
      </Button>
    );
  };
  return (
    <Modal
      open={!!asset}
      onCancel={onClose}
      title={`Withdraw ${inputToken?.symbol}`}
      footer={null}
      centered
      maskClosable={false}
    >
      <div>
        <div className="mt-[20px]">
          <TokenInput
            editable
            title="amount"
            token={inputToken}
            onTokenChange={() => {}}
            amount={payAmount}
            onAmountChange={setPayAmount}
            disabled
            ownerAmount={asset?.depositAmount || 0}
            totalPrice={inputTokenTotalPrice}
            amountLabel="Provided"
            showDropArrow={false}
          />
        </div>
        <div className="flex flex-col gap-[10px] p-[16px]">
          <div className="flex-center-between">
            <span className="text-tc-secondary">Remaining provided</span>
            <span>
              {remainingProvided} {inputToken?.symbol}
            </span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-tc-secondary">Health factor</span>
            <div className="flex flex-col items-end justify-end gap-[10px]">
              <div className="flex-center gap-[10px]">
                <HealthFactor value={`${userHealthFactor}`} />
                <span className="text-[12px] text-tc-secondary">{`->`}</span>
                <HealthFactor
                  value={`${estimatedHealthFactor || userHealthFactor}`}
                />
              </div>
              <div className="text-[12px] text-tc-secondary">
                <span>{`Liquidation at < 1.0`}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Warning>
            Withdraw this amount will reduce your health factor and increase
            risk of liquidation.
          </Warning>
        </div>
        <div className="mt-[20px] h-[56px]  w-full">
          <WithAuthButton>{renderSwapText()}</WithAuthButton>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawModal;
