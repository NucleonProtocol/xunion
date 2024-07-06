import { Button, Segmented, Skeleton, Tooltip } from 'antd';
import { useState } from 'react';
import { formatCurrency } from '@/utils';
import usePosition from '@/pages/slc/hooks/usePosition.ts';
import { cn } from '@/utils/classnames.ts';
import BorrowSLCModal from '@/pages/slc/borrow/BorrowSLCModal.tsx';
import RepaySLCModal from '@/pages/slc/borrow/RepaySLCModal.tsx';
import RiskModal from '@/pages/slc/borrow/RiskModal.tsx';

const Position = ({
  health,
  loading,
}: {
  health: bigint[];
  loading: boolean;
}) => {
  const {
    userAssetsValue,
    userAvailableAmount,
    userBorrowedAmount,
    borrowedTotalPrice,
    availableTotalPrice,
    healthFactor,
  } = usePosition({ health });
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [repayOpen, setRepayOpen] = useState(false);
  const [riskOpen, setRiskOpen] = useState(false);
  const [type, setAlignValue] = useState('Popular');
  return (
    <div className="w-full rounded-[16px] bg-fill-niubi">
      {loading ? (
        <div className="p-[24px]">
          <Skeleton active />
        </div>
      ) : (
        <div className="flex flex-col">
          <RiskModal open={riskOpen} onClose={() => setRiskOpen(false)} />
          <BorrowSLCModal
            open={borrowOpen}
            onClose={() => setBorrowOpen(false)}
          />
          <RepaySLCModal open={repayOpen} onClose={() => setRepayOpen(false)} />
          <div className="flex h-[64px] items-center justify-between border-2 border-solid  border-transparent border-b-line-primary px-[24px]">
            <div className="flex-center gap-[30px]">
              <span className="font-[500]">Position Management</span>
              <Segmented
                style={{ marginBottom: 8 }}
                value={type}
                onChange={(value) => setAlignValue(value)}
                options={[
                  {
                    label: (
                      <Tooltip title="Collateral with good liquidity on market.">
                        <span
                          className={cn(type === 'Popular' && 'text-theme')}
                        >
                          Popular
                        </span>
                      </Tooltip>
                    ),
                    value: 'Popular',
                  },
                  {
                    label: (
                      <Tooltip title="Minor currency collateral voted by community.">
                        <span
                          className={cn(type === 'Non-pop' && 'text-theme')}
                        >
                          Non-pop
                        </span>
                      </Tooltip>
                    ),
                    value: 'Non-pop',
                  },
                ]}
              />
            </div>
            <div className="flex-center gap-[10px]">
              <Button
                type="primary"
                shape="round"
                onClick={() => {
                  setBorrowOpen(true);
                }}
              >
                Borrow
              </Button>
              <Button
                type="primary"
                shape="round"
                ghost
                onClick={() => setRepayOpen(true)}
              >
                Repay
              </Button>
            </div>
          </div>
          <div className="flex justify-between p-[24px]">
            <div className="flex flex-col">
              <span className="flex h-[52px] justify-center text-tc-secondary">
                Collateral value
              </span>
              <div className="text-[16px]">
                {formatCurrency(userAssetsValue, false)}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="flex h-[52px] items-center text-tc-secondary">
                Borrowed value
              </span>
              <div className="flex flex-col text-[16px]">
                <span> {formatCurrency(userBorrowedAmount, false)} SLC</span>
                <span className="text-[12px] text-tc-secondary">
                  {formatCurrency(borrowedTotalPrice)}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="flex h-[52px] items-center text-tc-secondary">
                Available to borrow
              </span>
              <div className="flex flex-col text-[16px]">
                <span> {formatCurrency(userAvailableAmount, false)} SLC</span>
                <span className="text-[12px] text-tc-secondary">
                  {formatCurrency(availableTotalPrice)}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="flex h-[52px] items-center text-tc-secondary">
                Health Factor
              </span>
              <div className="flex items-center gap-[10px] text-[16px]">
                <span>{healthFactor}</span>
                <Button
                  type="text"
                  ghost
                  className="text-theme"
                  size="small"
                  onClick={() => setRiskOpen(true)}
                >
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

export default Position;
