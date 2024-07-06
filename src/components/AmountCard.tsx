import { formatCurrency } from '@/utils';
import { Skeleton } from 'antd';

const AmountCard = ({
  title,
  amount,
  loading,
}: {
  title: string;
  amount: number;
  loading: boolean;
}) => {
  return (
    <div className="flex h-[120px] w-[364px] flex-col justify-center gap-[5px] rounded-[16px]  bg-fill-niubi p-[24px]">
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
