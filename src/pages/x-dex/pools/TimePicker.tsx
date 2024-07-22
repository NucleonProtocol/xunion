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
              ? 'pointer-events-none bg-fill-niubi3 text-tc-primary'
              : 'cursor-pointer hover:bg-fill-niubi3 hover:text-tc-primary '
          )}
        >
          <span>{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TimePicker;
