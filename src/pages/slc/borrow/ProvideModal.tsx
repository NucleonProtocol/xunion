import { Button, Modal } from 'antd';
import TokenInput from '@/components/TokenInput.tsx';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import useBorrowSLC from '@/pages/slc/hooks/useBorrowSLC.ts';
import { SLCAsset } from '@/types/slc.ts';

const ProvideModal = ({
  open,
  onClose,
  asset,
}: {
  open: boolean;
  onClose: () => void;
  asset?: SLCAsset;
}) => {
  const {
    inputToken,
    payAmount,
    setPayAmount,
    inputOwnerAmount,
    inputTokenTotalPrice,
    toPairUnit,
    isInsufficient,
    isReady,
    isInsufficientLiquidity,
    isSubmittedLoading,
    onConfirm,
  } = useBorrowSLC();

  const renderSwapText = () => {
    if (isInsufficient) {
      return (
        <Button className="w-full" type="primary" size="large" disabled>
          {`Insufficient ${asset?.symbol} Balance`}
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
        {`Provide ${asset?.symbol}`}
      </Button>
    );
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={`Provide ${asset?.symbol}`}
      footer={null}
      centered
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
            ownerAmount={inputOwnerAmount}
            totalPrice={inputTokenTotalPrice}
            amountLabel="Provided"
          />
        </div>
        <div className="mt-[20px] h-[56px]  w-full">
          <WithAuthButton>{renderSwapText()}</WithAuthButton>
        </div>
      </div>
    </Modal>
  );
};

export default ProvideModal;
