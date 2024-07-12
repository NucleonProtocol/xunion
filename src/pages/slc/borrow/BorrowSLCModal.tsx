import { Button, Modal } from 'antd';
import TokenInput from '@/components/TokenInput.tsx';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import useBorrowSLC from '@/pages/slc/hooks/useBorrowSLC.ts';
import Warning from '@/components/Warning.tsx';
import HealthFactor from '@/pages/slc/borrow/HealthFactor.tsx';
import { formatNumber } from '@/hooks/useErc20Balance.ts';

const BorrowSLCModal = ({
  open,
  onClose,
  availableAmount,
  refresh,
  userHealthFactor,
}: {
  open: boolean;
  onClose: () => void;
  availableAmount: number;
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
  } = useBorrowSLC({ availableAmount, refresh });

  const renderSwapText = () => {
    if (isInsufficient) {
      return (
        <Button className="w-full" type="primary" size="large" disabled>
          {`Available Amount ${availableAmount}`}
        </Button>
      );
    }

    return (
      <Button
        className="w-full"
        type="primary"
        size="large"
        disabled={!isReady || isInsufficient || loading}
        onClick={onConfirm}
        loading={isSubmittedLoading || loading}
      >
        Borrow SLC
      </Button>
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Borrow SLC"
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
            ownerAmount={formatNumber(availableAmount || 0, 6)}
            totalPrice={inputTokenTotalPrice}
            amountLabel="Available"
          />
        </div>
        <div className="flex flex-col gap-[10px] p-[16px]">
          <div className="flex items-start justify-between">
            <span className="text-tc-secondary">Health factor</span>
            <div className="flex flex-col items-end justify-end gap-[10px]">
              <div className="flex-center gap-[10px]">
                <HealthFactor value={`${userHealthFactor || 0}`} />
                <span className="text-[12px] text-tc-secondary">{`->`}</span>
                <HealthFactor
                  value={healthFactor || `${userHealthFactor || 0}`}
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
            Borrowing this amount will reduce your health factor and increase
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

export default BorrowSLCModal;
