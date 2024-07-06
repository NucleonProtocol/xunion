import { Modal, Progress } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
const HealthFactor = () => {
  return (
    <div className="flex  flex-col gap-[8px] rounded-[8px] border border-line-primary p-[12px]">
      <div className="text-[16px]">Health factor</div>
      <div className="flex flex-col">
        <div className="text-[14px] text-tc-secondary">
          Safety of your deposited collateral against the borrowed assets and
          its underlying value. If the health factor goes below 1.5, the
          liquidation of your collateral might be triggered.
        </div>
        <div className="relative h-[90px] py-[10px]">
          <div className="absolute left-[10%] flex h-[36px] flex-col items-center text-[12px]">
            <span>Your value: 1.62</span>
            <span className="text-tc-secondary">
              <CaretDownOutlined />
            </span>
          </div>
          <div className="absolute top-[36px] w-full">
            <Progress
              percent={100}
              status="active"
              strokeColor={{ from: 'rgba(230, 93, 93, 1)', to: '#87d068' }}
              showInfo={false}
            />
          </div>
          <div className="absolute left-[1%] top-[53px] flex flex-col items-center justify-center">
            <span className="flex h-[8px] w-[2px] bg-theme" />
            <span className="text-[12px] text-status-error">
              Liquidation value: 1.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
const RiskModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={`Liquidation risk parameter`}
      footer={null}
      centered
    >
      <div className="flex flex-col gap-[20px]">
        <div className="mt-[20px]">
          <p>
            Your health factor and SLC loan to value determine the assurance of
            your collateral. To avoid liquidations you can supply more
            collaterals or repay borrow positions.
          </p>
        </div>
        <HealthFactor />
        <HealthFactor />
      </div>
    </Modal>
  );
};

export default RiskModal;
