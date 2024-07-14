import { Button, Modal } from 'antd';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import Warning from '@/components/Warning.tsx';
import HealthFactor from '@/pages/x-super-libra-coin/borrow/HealthFactor.tsx';
import useXWriteContract from '@/hooks/useXWriteContract.ts';
import { XUNION_SLC_CONTRACT, ZERO_ADDRESS } from '@/contracts';
import { Address } from 'viem';
import { BorrowMode } from '@/types/slc.ts';

const HighLiquidityModal = ({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { writeContractAsync, isSubmittedLoading, loading } = useXWriteContract(
    {
      onWriteSuccess: onSuccess,
    }
  );

  const enableMode = async () => {
    const { address, abi } = XUNION_SLC_CONTRACT.interface;
    writeContractAsync({
      address: address as Address,
      abi,
      functionName: 'userModeSetting',
      args: [BorrowMode.HighLiquidity, ZERO_ADDRESS],
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Enable borrow mode"
      footer={null}
      centered
      maskClosable={false}
    >
      <div>
        <div className="flex flex-col gap-[10px] p-[16px]">
          <div className="flex items-start justify-between">
            <span className="text-tc-secondary">Mode category</span>
            <span>High liquidity collateral</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-tc-secondary">Available asset</span>
            <span>{`All assets > All assets`}</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-tc-secondary">Health factor</span>
            <div className="flex flex-col items-end justify-end gap-[10px]">
              <div className="flex-center gap-[10px]">
                <HealthFactor value={'1000'} />
                <span className="text-[12px] text-tc-secondary">{`->`}</span>
                <HealthFactor value={'1000'} />
              </div>
              <div className="text-[12px] text-tc-secondary">
                <span>{`Liquidation at < 1.0`}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Warning>
            To enable borrow mode, all borrow positions outside must be closed
            and only allows you to borrow assets belonging the selected mode.
          </Warning>
        </div>
        <div className="mt-[20px] h-[56px]  w-full">
          <WithAuthButton>
            <Button
              className="w-full"
              type="primary"
              size="large"
              onClick={enableMode}
              loading={isSubmittedLoading || loading}
            >
              Enable Mode
            </Button>
          </WithAuthButton>
        </div>
      </div>
    </Modal>
  );
};

export default HighLiquidityModal;
