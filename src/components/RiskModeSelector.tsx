import { SettingIcon } from '@/components/icons';

import { Popover } from 'antd';
import { cn } from '@/utils/classnames.ts';

const RiskModeSelector = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (v: string) => void;
}) => {
  return (
    <Popover
      content={
        <div className="min-h-[160px] max-md:w-[290px] md:w-[300px]">
          <div className="px-[10px] text-tc-secondary">
            Select the borrow mode when you don’t have any loan.
          </div>
          <div className="flex cursor-pointer flex-col gap-[4px] rounded-[6px] p-[10px] hover:bg-theme-non-opaque">
            <span className="text-[16px] font-[500]">High liquidity mode</span>
            <span className="text-[14px] text-tc-secondary">
              Use high liquidity collateral for borrowing
            </span>
          </div>
          <div className="flex cursor-pointer flex-col gap-[4px] rounded-[6px] p-[10px] hover:bg-theme-non-opaque">
            <span className="text-[16px] font-[500]">Risk isolation mode</span>
            <span className="text-[14px] text-tc-secondary">
              Only use one high-risk asset to borrow SLC
            </span>
          </div>
        </div>
      }
      trigger={['click']}
      placement="bottomRight"
    >
      <div className={cn('flex-center cursor-pointer gap-[5px] text-theme')}>
        <span>High liquidity collateral</span>
        <SettingIcon className="cursor-pointer hover:text-theme" />
      </div>
    </Popover>
  );
};

export default RiskModeSelector;
