import { cn } from '@/utils/classnames.ts';

const tabs = [
  {
    label: '24H',
    value: '24H',
  },
  {
    label: '7D',
    value: '7D',
  },
  {
    label: '30D',
    value: '30D',
  },
];

const TimePicker = ({
  time,
  onTimeChange,
}: {
  time: string;
  onTimeChange: (value: string) => void;
}) => {
  return (
    <div className="flex-center gap-[20px]">
      {(tabs || []).map((tab) => (
        <div
          key={tab.value}
          onClick={() => {
            onTimeChange(tab.value);
          }}
          className={cn(
            'flex-center h-[40px] gap-[12px] rounded-[20px] border border-line-primary px-[16px] text-tc-secondary',
            time === tab.value
              ? 'bg-fill-niubi3 pointer-events-none text-tc-primary'
              : 'hover:bg-fill-niubi3 cursor-pointer hover:text-tc-primary '
          )}
        >
          <span>{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TimePicker;
