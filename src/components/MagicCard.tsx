import { PropsWithChildren } from 'react';
import { Skeleton } from 'antd';
import { cn } from '@/utils/classnames.ts';

const MagicCard = ({
  loading,
  children,
}: PropsWithChildren<{
  loading?: boolean;
}>) => {
  return (
    <div className={cn('w-full  rounded-[20px] bg-fill-niubi')}>
      {loading ? (
        <div className="flex flex-col gap-[24px] p-[24px]">
          <Skeleton active />
          <Skeleton active />
        </div>
      ) : (
        <div className="flex flex-col px-[18px] py-[5px]">{children}</div>
      )}
    </div>
  );
};

export default MagicCard;
