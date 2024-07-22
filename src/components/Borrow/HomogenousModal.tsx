import { Button, Modal } from 'antd';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import Warning from '@/components/Warning.tsx';
import HealthFactor from '@/components/Borrow/HealthFactor.tsx';
import { BorrowModeType, SLCAsset } from '@/types/slc.ts';
import { useState } from 'react';
import useXWriteContract from '@/hooks/useXWriteContract.ts';
import { Abi, Address } from 'viem';
import TokenGroupSelector from '@/components/Borrow/TokenGroupSelector.tsx';

const HomogenousModal = ({
  open,
  onClose,
  onSuccess,
  contact,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  contact: {
    abi: Abi;
    address: Address;
  };
}) => {
  const [token, setToken] = useState<SLCAsset>();

  const { writeContractAsync, isSubmittedLoading, loading } = useXWriteContract(
    {
      onWriteSuccess: onSuccess,
    }
  );

  const enableMode = async () => {
    if (token) {
      const { address, abi } = contact;
      writeContractAsync({
        address: address,
        abi,
        functionName: 'userModeSetting',
        args: [BorrowModeType.RiskIsolation, token.address],
      });
    }
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
        <TokenGroupSelector value={token} onChange={setToken} />
        <div className="flex flex-col gap-[10px] p-[16px]">
          <div className="flex items-start justify-between">
            <span className="text-tc-secondary">Mode category</span>
            <span>Risk isolation</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-tc-secondary">Available asset</span>
            <span>{`${token?.symbol || '--'} > SLC`}</span>
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
          <div className="flex items-start justify-between">
            <span className="text-tc-secondary">Maximum loan to value</span>
            <span>{`-- > ${token ? (token?.max_ltv ? Number(token?.max_ltv) / 100 : 0) : '--'}%`}</span>
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
              disabled={!token}
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

export default HomogenousModal;
