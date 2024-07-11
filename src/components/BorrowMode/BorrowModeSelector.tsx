import { SettingIcon } from '@/components/icons';

import { Popover } from 'antd';
import { cn } from '@/utils/classnames.ts';
import { BorrowMode } from '@/types/slc.ts';

const BorrowModeSelector = ({
  value,
  onChange,
  options,
}: {
  value: BorrowMode;
  onChange: (v: BorrowMode) => void;
  options: { label: string; description: string; value: BorrowMode }[];
}) => {
  const selected = options.find((item) => item.value === value);
  return (
    <Popover
      content={
        <div className="min-h-[160px] max-md:w-[290px] md:w-[300px]">
          <div className="px-[10px] text-tc-secondary">
            Select the borrow mode when you don’t have any loan.
          </div>
          {options.map((item) => (
            <div
              onClick={() => {
                onChange(item.value);
              }}
              key={item.value}
              className="hover:bg-fill-niubi2 flex cursor-pointer flex-col gap-[4px] rounded-[6px] p-[10px]"
            >
              <span className="text-[16px] font-[500]">{item.label}</span>
              <span className="text-[14px] text-tc-secondary">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      }
      trigger={['click']}
      placement="bottomRight"
    >
      <div className={cn('flex-center cursor-pointer gap-[5px] text-theme')}>
        <span>{selected?.label}</span>
        <SettingIcon className="cursor-pointer hover:text-theme" />
      </div>
    </Popover>
  );
};

export default BorrowModeSelector;
