import { Button, Modal } from 'antd';
import TokenInput from '@/components/TokenInput.tsx';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import useBorrowSLC from '@/pages/slc/hooks/useBorrowSLC.ts';
import Warning from '@/components/Warning.tsx';
import { CollateralAsset } from '@/types/swap.ts';

const WithdrawModal = ({
  open,
  onClose,
  asset,
}: {
  open: boolean;
  onClose: () => void;
  asset?: CollateralAsset;
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
        {`Withdraw ${asset?.symbol}`}
      </Button>
    );
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={`Withdraw ${asset?.symbol}`}
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
        <div className="flex flex-col gap-[10px] p-[16px]">
          <div className="flex-center-between">
            <span className="text-tc-secondary">Remaining provided</span>
            <span>1 ETH</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-tc-secondary">Health factor</span>
            <div className="flex flex-col items-end justify-end gap-[10px]">
              <div className="flex-center gap-[10px]">
                <span className="text-status-error">1.62</span>
                <span className="text-[12px] text-tc-secondary">{`>`}</span>
                <span className="text-status-success">10.53</span>
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
