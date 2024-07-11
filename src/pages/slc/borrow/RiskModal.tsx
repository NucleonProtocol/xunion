import { Modal, Progress } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import useRiskProgress, {
  ProgressSegment,
} from '@/pages/slc/hooks/useRiskProgress.ts';
import { formatNumber } from '@/hooks/useErc20Balance.ts';
const HealthFactorInfo = ({
  segments,
  userPercent,
  userHealthFactor,
}: {
  userPercent: number;
  segments: ProgressSegment[];
  userHealthFactor: number;
}) => {
  return (
    <div className="flex  flex-col gap-[8px] rounded-[8px] border border-line-primary p-[12px]">
      <div className="text-[16px]">Health factor</div>
      <div className="flex flex-col">
        <div className="text-[14px] text-tc-secondary">
          Safety of your deposited collateral against the borrowed assets and
          its underlying value. If the health factor goes below 1.5, the
          liquidation of your collateral might be triggered.
        </div>

        <div className="relative mt-[20px] h-[70px] py-[10px]">
          <div
            className="absolute  flex h-[36px] flex-col items-center text-[12px]"
            style={{
              left: `${userPercent * 100}%`,
            }}
          >
            <div className="relative">
              <span
                className="absolute top-[-13px] flex w-[100px] text-[12px] "
                style={{
                  transform: 'translateX(-40%)',
                }}
              >
                Your value: {formatNumber(userHealthFactor || 0, 2)}
              </span>
              <span className="text-tc-secondary">
                <CaretDownOutlined />
              </span>
            </div>
          </div>
          <div className="absolute top-[16px] w-full">
            <Progress
              percent={100}
              status="active"
              strokeColor={{ from: 'rgba(230, 93, 93, 1)', to: '#87d068' }}
              showInfo={false}
            />
          </div>
          {segments.map((item) => (
            <div
              className="absolute top-[32px] flex flex-col items-center justify-center"
              key={item.value}
              style={{
                left: `${item.percent * 100}%`,
              }}
            >
              <div className="relative">
                <span className="flex h-[8px] w-[2px] rounded-[2px] bg-tc-secondary" />
                <span
                  className="absolute text-[12px]"
                  style={{
                    transform: 'translateX(-50%)',
                    color: item.color ?? 'auto',
                  }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-left  text-status-error">Liquidation value: 1.0</p>
      </div>
    </div>
  );
};

const CurrentLTV = ({
  segments,
  userPercent,
  userHealthFactor,
}: {
  userPercent: number;
  segments: ProgressSegment[];
  userHealthFactor: number;
}) => {
  return (
    <div className="flex  flex-col gap-[8px] rounded-[8px] border border-line-primary p-[12px]">
      <div className="text-[16px]">Current LTV</div>
      <div className="flex flex-col">
        <div className="text-[14px] text-tc-secondary">
          Your current SLC loan to value based on your collateral supplied. If
          your loan to value goes above the liquidation threshold your
          collateral supplied may be liquidated.
        </div>

        <div className="relative mt-[30px] h-[70px] py-[10px]">
          <div
            className="absolute  flex h-[36px] flex-col items-center text-[12px]"
            style={{
              left: `${userPercent * 100}%`,
            }}
          >
            <div className="relative">
              <span
                className="absolute top-[-33px] flex  w-[100px] flex-col text-center text-[12px] "
                style={{
                  transform: 'translateX(-40%)',
                }}
              >
                <span>
                  Your value: {formatNumber(userHealthFactor || 0, 2)}
                </span>
                <span>Max: {formatNumber(userHealthFactor || 0, 2)}</span>
              </span>
              <span className="text-tc-secondary">
                <CaretDownOutlined />
              </span>
            </div>
          </div>

          <div className="absolute top-[16px] w-full">
            <Progress
              percent={100}
              status="active"
              strokeColor={{ from: 'rgba(230, 93, 93, 1)', to: '#87d068' }}
              showInfo={false}
            />
          </div>
          {segments.map((item) => (
            <div
              className="absolute top-[32px] flex flex-col items-center justify-center"
              key={item.value}
              style={{
                left: `${item.percent * 100}%`,
              }}
            >
              <div className="relative">
                <span className="flex h-[8px] w-[2px] rounded-[2px] bg-tc-secondary" />
                <span
                  className="absolute text-[12px]"
                  style={{
                    transform: 'translateX(-50%)',
                    color: item.color ?? 'auto',
                  }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-left  text-status-error">
          Liquidation threshold: 75.03%
        </p>
      </div>
    </div>
  );
};

const RiskModal = ({
  open,
  onClose,
  userHealthFactor,
}: {
  open: boolean;
  onClose: () => void;
  userHealthFactor: number;
}) => {
  const { userPercent, segments } = useRiskProgress({
    userHealthFactor: userHealthFactor || 0,
  });
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
        <HealthFactorInfo
          segments={segments}
          userPercent={userPercent}
          userHealthFactor={userHealthFactor}
        />
        <CurrentLTV
          segments={[
            {
              label: '75.03%',
              percent: 0.903,
              value: 10,
              color: 'red',
            },
          ]}
          userPercent={userPercent}
          userHealthFactor={userHealthFactor}
        />
      </div>
    </Modal>
  );
};

export default RiskModal;
