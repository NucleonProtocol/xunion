import { formatCurrency } from '@/utils';

const AmountWithPrice = ({
  amount,
  price,
}: {
  amount?: number;
  price?: number;
}) => {
  return (
    <div className="flex flex-col gap-[5px]">
      <span className="max-md:text-right">
        {formatCurrency(amount || 0, false)}
      </span>
      <span className="max-md:text-right max-md:text-tc-secondary">
        {formatCurrency(price || 0)}
      </span>
    </div>
  );
};

export default AmountWithPrice;
