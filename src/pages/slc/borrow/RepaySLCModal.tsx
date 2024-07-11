import { Button, Modal } from 'antd';
import TokenInput from '@/components/TokenInput.tsx';
import { CheckCircleOutlined } from '@ant-design/icons';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import useApprove from '@/pages/trade/hooks/useApprove.ts';
import { XUNION_SLC_CONTRACT } from '@/contracts';
import { Address } from 'viem';
import Warning from '@/components/Warning.tsx';
import { formatCurrency } from '@/utils';
import useRepaySLC from '@/pages/slc/hooks/useRepaySLC.ts';
import { formatNumber } from '@/hooks/useErc20Balance.ts';
import HealthFactor from '@/pages/slc/borrow/HealthFactor.tsx';

const RepaySLCModal = ({
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
  } = useRepaySLC({ availableAmount, refresh });

  const {
    isApproved: isTokenAApproved,
    loading: isTokenAApproving,
    approve: approveTokenA,
  } = useApprove({
    token: inputToken!,
    amount: payAmount,
    spenderAddress: XUNION_SLC_CONTRACT.interface.address as Address,
  });

  const renderSwapText = () => {
    if (isInsufficient) {
      return (
        <Button className="w-full" type="primary" size="large" disabled>
          {`Available Amount ${availableAmount}`}
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
          Give permission to use SLC
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
        Repay SLC
      </Button>
    );
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Repay SLC"
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
          <div className="flex-center-between">
            <span className="text-tc-secondary">Remaining debt</span>
            <div>
              <span>{formatCurrency(10000, false)} SLC</span>
              <span>{`->`}</span>
              <span>{formatCurrency(9999, false)} SLC</span>
            </div>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-tc-secondary">Health factor</span>
            <div className="flex flex-col items-end justify-end gap-[10px]">
              <div className="flex-center gap-[10px]">
                <HealthFactor value={`${userHealthFactor}` || '0'} />
                <span className="text-[12px] text-tc-secondary">{`>`}</span>
                <HealthFactor value={healthFactor || '0'} />
              </div>
              <div className="text-[12px] text-tc-secondary">
                <span>{`Liquidation at < 1.0`}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Warning>
            You don’t have enough funds in your wallet to repay the full amount.
            If you proceed to repay with your current amount of funds, you will
            still have a small borrowing position in your dashboard.
          </Warning>
        </div>
        <div className="mt-[20px] h-[56px]  w-full">
          <WithAuthButton>{renderSwapText()}</WithAuthButton>
        </div>
      </div>
    </Modal>
  );
};

export default RepaySLCModal;
