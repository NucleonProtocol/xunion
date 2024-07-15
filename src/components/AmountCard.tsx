import { formatCurrency } from '@/utils';
import { Skeleton } from 'antd';
import { cn } from '@/utils/classnames.ts';

const AmountCard = ({
  title,
  amount,
  loading,
  className,
}: {
  title: string;
  amount: number;
  loading: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex h-[120px] w-[364px] flex-col justify-center gap-[5px] rounded-[16px]  bg-fill-niubi p-[24px]',
        className
      )}
    >
      {loading ? (
        <Skeleton active title={false} />
      ) : (
        <>
          <span className="text-tc-secondary">{title}</span>
          <span className="text-[24px] font-[500]">
            {formatCurrency(amount)}
          </span>
        </>
      )}
    </div>
  );
};

export default AmountCard;
