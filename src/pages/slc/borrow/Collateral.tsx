import { Button, Skeleton } from 'antd';
import { formatCurrency } from '@/utils';

const Collateral = ({
  position,
  loading,
}: {
  position: any;
  loading: boolean;
}) => {
  return (
    <div className="w-full rounded-[16px] bg-fill-niubi">
      {loading ? (
        <div className="p-[24px]">
          <Skeleton active />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex h-[64px] items-center justify-between border-2 border-solid  border-transparent border-b-line-primary px-[24px]">
            <div className="flex-center gap-[30px]">
              <span className="font-[500]">Collateral</span>
            </div>
          </div>
          <div className="flex justify-between p-[24px]">
            <div className="flex flex-col">
              <span className="flex h-[52px] justify-center text-tc-secondary">
                Collateral value
              </span>
              <div className="text-[16px]">{formatCurrency(13000, false)}</div>
            </div>

            <div className="flex flex-col">
              <span className="flex h-[52px] items-center text-tc-secondary">
                Borrowed value
              </span>
              <div className="flex flex-col text-[16px]">
                <span> {formatCurrency(13000, false)} SLC</span>
                <span className="text-[12px] text-tc-secondary">
                  {formatCurrency(13000)}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="flex h-[52px] items-center text-tc-secondary">
                Available to borrow
              </span>
              <div className="flex flex-col text-[16px]">
                <span> {formatCurrency(13000, false)} SLC</span>
                <span className="text-[12px] text-tc-secondary">
                  {formatCurrency(13000)}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="flex h-[52px] items-center text-tc-secondary">
                Health Factor
              </span>
              <div className="flex items-center gap-[10px] text-[16px]">
                <span> 2.5</span>
                <Button type="text" ghost className="text-theme" size="small">
                  Rist detail
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collateral;
