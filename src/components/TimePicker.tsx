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
            'flex-center h-[32px] rounded-[12px] border border-transparent px-[12px] text-tc-secondary',
            time === tab.value
              ? 'pointer-events-none border-line-primary  bg-fill-niubi3 text-tc-primary'
              : 'cursor-pointer  hover:border-line-primary  hover:bg-fill-niubi3 hover:text-tc-primary '
          )}
        >
          <span>{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TimePicker;
