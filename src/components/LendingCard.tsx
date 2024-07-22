import { PropsWithChildren, ReactNode, useState } from 'react';
import { Button, Skeleton } from 'antd';
import { cn } from '@/utils/classnames.ts';

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
  const [hide, setHide] = useState(false);
  return (
    <div
      className={cn(
        ' w-full  rounded-[20px] bg-fill-niubi',
        !hide && 'min-h-[420px]'
      )}
    >
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
              <Button
                className="w-[60px] rounded-[20px]"
                size="small"
                onClick={() => {
                  setHide(!hide);
                }}
              >
                {hide ? 'Show' : 'Hide'}
              </Button>
            </div>
            {description && <div className="pt-[10px]">{description}</div>}
          </div>
          {!hide && (
            <div className="flex flex-col px-[18px] py-[5px]">{children}</div>
          )}
        </>
      )}
    </div>
  );
};

export default LendingCard;
