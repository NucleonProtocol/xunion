const AddressInput = ({
  title,
  value,
  onChange,
  placeholder,
}: {
  title: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  cisAddress?: string;
}) => {
  return (
    <div className="h-[80px] rounded-[8px] bg-background-primary p-[16px]">
      <div className="text-[14px] text-tc-secondary">{title}</div>
      <div className="flex h-[48px] justify-around py-[5px]">
        <div className="flex-1">
          <input
            className="w-full border-0 bg-transparent text-[16px]  outline-0 focus:border-0 focus:bg-transparent "
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onChange?.(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressInput;
