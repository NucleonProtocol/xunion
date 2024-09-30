import { Skeleton } from 'antd';
import { cn } from '@/utils/classnames.ts';

const AmountCard = ({
  title,
  amount,
  loading,
  className,
}: {
  title: string;
  amount: string;
  loading: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex h-[120px] w-[364px] flex-col justify-center gap-[5px] rounded-[16px]  bg-fill-niubi p-[24px] max-md:h-[100px] max-md:w-full max-md:p-[16px]',
        className
      )}
    >
      {loading ? (
        <Skeleton active title={false} />
      ) : (
        <>
          <span className="text-tc-secondary">{title}</span>
          <span className="text-[24px] font-[500]">$ {amount}</span>
        </>
      )}
    </div>
  );
};

export default AmountCard;
