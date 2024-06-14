import { Input, Popover, Tooltip } from 'antd';
import { SettingIcon } from '@/components/icons';
import { QuestionCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { cn } from '@/utils/classnames.ts';

export const SlippageValue = ({ value }: { value: number }) => {
  if (value === -1) {
    return <span className="text-tc-secondary">0.5%</span>;
  }
  if (value > 1) {
    return (
      <div className="flex-center gap-[2px] text-status-warning">
        <WarningOutlined />
        <span>{value}%</span>
        <span>·</span>
        <span>Custom</span>
      </div>
    );
  }
  return <span className="text-tc-secondary">{value}%</span>;
};

const presets = [
  {
    label: 'Auto',
    value: -1,
  },
  {
    label: '0.1%',
    value: 0.1,
  },
  {
    label: '1%',
    value: 1,
  },
];

const SlippageSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex-center-between">
        <div className="flex items-center gap-[10px]">
          <span>Slippage tolerance</span>
          <Tooltip
            title="Your transaction will revert if the price changes unfavorably by more than this percentage."
            placement="top"
          >
            <QuestionCircleOutlined className="cursor-pointer text-tc-secondary" />
          </Tooltip>
        </div>
        <SlippageValue value={Number(value || 0)} />
      </div>
      <div className="flex  flex-nowrap items-center gap-[10px] ">
        {presets.map((item) => (
          <div
            key={item.label}
            className={cn(
              'flex h-[32px] cursor-pointer items-center justify-center rounded-[6px] border border-line-primary px-[12px]',
              {
                'border-transparent bg-theme text-white':
                  Number(value || 0) === item.value,
              }
            )}
            onClick={() => {
              onChange(String(item.value));
            }}
          >
            {item.label}
          </div>
        ))}
        <Input
          suffix="Custom"
          value={Number(value || 0) > 1 ? value : undefined}
          placeholder="0.5"
          onChange={(e) => {
            let value = e.target.value;
            value = value.replace(/[^0-9.]/g, '');
            const parts = value.split('.');
            if (parts.length > 2) {
              value = `${parts[0]}.${parts.slice(1).join('')}`;
            }
            if (
              value.startsWith('0') &&
              value.length > 1 &&
              !value.startsWith('0.')
            ) {
              value = value.replace(/^0+/, '');
            }
            onChange(value);
          }}
        />
      </div>
    </div>
  );
};

const Slippage = ({
  value,
  onChange,
  deadline,
  onDeadlineChange,
}: {
  deadline: string;
  onDeadlineChange: (v: string) => void;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) => {
  return (
    <Popover
      content={
        <div className="min-h-[160px] max-md:w-[290px] md:w-[400px]">
          <div className="mt-[20px] flex flex-col gap-[10px]">
            <SlippageSelector value={value} onChange={onChange} />
            <div className="flex items-center gap-[10px]">
              <span>Transaction deadline</span>
              <Tooltip
                title="Your transaction will revert if it is pending for more than this period of time."
                placement="top"
              >
                <QuestionCircleOutlined className="cursor-pointer text-tc-secondary" />
              </Tooltip>
            </div>
            <div>
              <Input
                value={deadline}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9]/g, '');
                  if (value.startsWith('0') && value.length > 1) {
                    value = value.replace(/^0+/, '');
                  }
                  onDeadlineChange(value);
                }}
                suffix="Minutes"
              />
            </div>
          </div>
        </div>
      }
      trigger={['click']}
      placement="bottomRight"
    >
      <div className={cn('flex-center gap-[5px] ')}>
        <span className="text-[14px] text-tc-secondary">
          {Number(value || 0) > 0 ? `${value}%` : 'Auto(0.5%)'}
        </span>
        <SettingIcon className="cursor-pointer hover:text-theme" />
      </div>
    </Popover>
  );
};

export default Slippage;
