import { Input, Popover, Tooltip } from 'antd';
import { SettingIcon } from '@/components/icons';
import { QuestionCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { cn } from '@/utils/classnames.ts';
import { useState } from 'react';

const SlippageValue = ({ value }: { value: number }) => {
  if (value === -1) {
    return <span className="text-tc-secondary">Auto</span>;
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
    label: '0.5%',
    value: 0.5,
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
  value: number;
  onChange: (v: number) => void;
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
        <SlippageValue value={value} />
      </div>
      <div className="flex  flex-nowrap items-center gap-[10px] ">
        {presets.map((item) => (
          <div
            className={cn(
              'border-line-primary flex h-[32px] cursor-pointer items-center justify-center rounded-[6px] border px-[12px]',
              {
                'border-transparent bg-theme text-white': value === item.value,
              }
            )}
            onClick={() => {
              onChange(item.value);
            }}
          >
            {item.label}
          </div>
        ))}
        <Input
          suffix="Custom"
          onChange={(e) => {
            const { value } = e.target;
            const reg = /^-?\d*(\.\d*)?$/;
            if (reg.test(value) || value === '') {
              onChange(Number(value));
            } else {
              onChange(-1);
            }
          }}
        />
      </div>
    </div>
  );
};

const Slippage = () => {
  const [percent, setPercent] = useState(-1);

  return (
    <Popover
      content={
        <div className="min-h-[160px] w-[400px]">
          <div className="mt-[20px] flex flex-col gap-[10px]">
            <SlippageSelector value={percent} onChange={setPercent} />
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
              <Input />
            </div>
          </div>
        </div>
      }
      trigger={['click']}
      placement="bottomRight"
    >
      <div className="flex-center gap-[5px]">
        <span className="text-[14px] text-tc-secondary">
          {percent > 0 ? `${percent}%` : 'Auto'}
        </span>
        <SettingIcon className="cursor-pointer hover:text-theme" />
      </div>
    </Popover>
  );
};

export default Slippage;
