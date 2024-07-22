import { Button, Modal } from 'antd';
import TokenInput from '@/components/TokenInput.tsx';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import HealthFactor from '@/components/Borrow/HealthFactor.tsx';
import { formatNumber } from '@/hooks/useErc20Balance.ts';
import useDeposit from '@/pages/x-lending/hooks/useDeposit.ts';
import { LendingAsset } from '@/types/Lending.ts';
import useApprove from '@/pages/x-dex/hooks/useApprove.ts';
import { XUNION_LENDING_CONTRACT } from '@/contracts';
import { Address } from 'viem';
import { CheckCircleOutlined } from '@ant-design/icons';

const DepositModal = ({
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
  } = useDeposit({ refresh, asset });

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
          {`Give permission to use ${asset.token.symbol}`}
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
        {`Supply ${asset.token.symbol}`}
      </Button>
    );
  };

  return (
    <Modal
      open={!!asset}
      onCancel={onClose}
      title={`Supply ${asset.token.symbol}`}
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
            amountLabel="Balance"
            showDropArrow={false}
            onMax={() => {
              setPayAmount(formatNumber(availableAmount || 0, 6).toString());
            }}
          />
        </div>
        <div className="flex flex-col gap-[10px] p-[16px]">
          <div className="flex-center-between">
            <span className="text-tc-secondary">Supply APY</span>
            <div className="flex-center flex gap-[10px]">
              <span>{asset?.depositInterest}%</span>
            </div>
          </div>
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
        <div className="mt-[20px] h-[56px]  w-full">
          <WithAuthButton>{renderSwapText()}</WithAuthButton>
        </div>
      </div>
    </Modal>
  );
};

export default DepositModal;
