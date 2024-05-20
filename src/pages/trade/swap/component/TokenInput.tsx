import TokenSelector from '@/pages/trade/swap/component/TokenSelector.tsx';

const TokenInput = ({
  title,
  editable,
}: {
  title: string;
  editable?: boolean;
}) => {
  return (
    <div className="h-[124px] rounded-[8px] bg-background-primary p-[16px]">
      <div className="text-[14px] text-tc-secondary">{title}</div>

      <div className="flex-center-between h-[48px] py-[5px]">
        <div className="flex-1">
          <input
            className="w-[220px] flex-1 border-0 bg-transparent text-[30px] font-bold outline-0 focus:border-0 focus:bg-transparent "
            placeholder="0"
            disabled={!editable}
          />
        </div>
        <TokenSelector />
      </div>
      <div className="flex-center-between pb-[5px]">
        <span className="text-tc-secondary">$3301.00</span>
        <div className="flex-center gap-[10px] text-[14px]">
          <span className="text-tc-secondary">Balance: 102.11</span>
          <div className="cursor-pointer text-theme">MAX</div>
        </div>
      </div>
    </div>
  );
};

export default TokenInput;
