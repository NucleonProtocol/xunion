import TokenSelector from '@/components/TokenSelector.tsx';
import { Token } from '@/types/swap.ts';
import { cn } from '@/utils/classnames.ts';

const TokenInput = ({
  title,
  editable,
  amount,
  onAmountChange,
  token,
  onTokenChange,
  disabledToken,
  disabled,
  onMax,
  ownerAmount,
  totalPrice,
  placeholder = '0',
}: {
  title: string;
  editable?: boolean;
  token?: Token;
  onTokenChange: (token: Token) => void;
  amount?: string;
  onAmountChange: (value: string) => void;
  disabledToken?: Token;
  disabled?: boolean;
  onMax?: (ownerAmount: number) => void;
  ownerAmount: number;
  totalPrice: number;
  placeholder?: string;
}) => {
  return (
    <div className="h-[124px] rounded-[8px] bg-background-primary p-[16px]">
      <div className="text-[14px] text-tc-secondary">{title}</div>

      <div className="flex h-[48px] justify-around py-[5px]">
        <div className="flex-1">
          <input
            className="w-full border-0 bg-transparent text-[30px] font-bold outline-0 focus:border-0 focus:bg-transparent "
            placeholder={placeholder}
            disabled={!editable}
            value={amount}
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
              onAmountChange(value);
            }}
          />
        </div>
        <div className="flex-shrink-0">
          <TokenSelector
            value={token}
            onChange={onTokenChange}
            disabledToken={disabledToken}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="flex-center-between pb-[5px]">
        <span className="text-tc-secondary">
          {totalPrice > 0 ? `$${totalPrice}` : ''}
        </span>
        <div className="flex-center h-[32px] gap-[10px] text-[14px]">
          {token?.address && (
            <>
              <span className="text-tc-secondary">Balance: {ownerAmount}</span>
              {onMax && ownerAmount > 0 && (
                <div
                  className={cn(' text-theme', { 'cursor-pointer': !disabled })}
                  onClick={() => {
                    if (!disabled) {
                      onMax(ownerAmount);
                    }
                  }}
                >
                  MAX
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenInput;
