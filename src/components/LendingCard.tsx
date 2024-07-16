import { PropsWithChildren, ReactNode } from 'react';
import { Button, Skeleton } from 'antd';

const LendingCard = ({
  children,
  title,
  description,
  loading,
}: PropsWithChildren<{
  title: string;
  description?: ReactNode;
  loading?: boolean;
}>) => {
  return (
    <div className="min-h-[420px] w-full  rounded-[20px] bg-fill-niubi">
      {loading ? (
        <div className="flex flex-col gap-[24px] p-[24px]">
          <Skeleton active />
          <Skeleton active />
        </div>
      ) : (
        <>
          <div className="border border-transparent border-b-line-primary px-[24px] py-[14px]">
            <div className="flex-center-between">
              <span className="text-[24px] font-[500]">{title}</span>
              <Button className="rounded-[20px]">Hide</Button>
            </div>
            {description && <div className="pt-[10px]">{description}</div>}
          </div>
          <div className="flex flex-col">{children}</div>
        </>
      )}
    </div>
  );
};

export default LendingCard;
