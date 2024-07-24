import { cn } from '@/utils/classnames.ts';

const TimePicker = ({
  time,
  onTimeChange,
  options,
}: {
  time: string;
  onTimeChange: (value: string) => void;
  options: { label: string; value: string }[];
}) => {
  return (
    <div className="flex-center gap-[10px]">
      {(options || []).map((tab) => (
        <div
          key={tab.value}
          onClick={() => {
            onTimeChange(tab.value);
          }}
          className={cn(
            'flex-center h-[24px] rounded-[8px]  px-[8px] text-[14px] text-tc-secondary',
            time === tab.value
              ? 'pointer-events-none   bg-fill-niubi3 text-tc-primary'
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
