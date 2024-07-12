import { Button, Skeleton } from 'antd';
import { useState } from 'react';
import { formatCurrency } from '@/utils';
import usePosition from '@/pages/slc/hooks/usePosition.ts';
import BorrowSLCModal from '@/pages/slc/borrow/BorrowSLCModal.tsx';
import RepaySLCModal from '@/pages/slc/borrow/RepaySLCModal.tsx';
import RiskModal from '@/pages/slc/borrow/RiskModal.tsx';
import EnableBorrowMode from '@/components/BorrowMode/EnableBorrowMode.tsx';
import HealthFactor from '@/pages/slc/borrow/HealthFactor.tsx';

const Position = ({
  health,
  loading,
  refresh,
}: {
  health: bigint[];
  loading: boolean;
  refresh: () => void;
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
  return (
    <div className="w-full rounded-[16px] bg-fill-niubi">
      {loading ? (
        <div className="p-[24px]">
          <Skeleton active />
        </div>
      ) : (
        <div className="flex flex-col">
          <RiskModal
            open={riskOpen}
            onClose={() => setRiskOpen(false)}
            userHealthFactor={healthFactor}
          />
          <BorrowSLCModal
            open={borrowOpen}
            onClose={() => setBorrowOpen(false)}
            availableAmount={userAvailableAmount}
            refresh={refresh}
            userHealthFactor={healthFactor}
          />
          <RepaySLCModal
            open={repayOpen}
            onClose={() => setRepayOpen(false)}
            availableAmount={userBorrowedAmount}
            refresh={refresh}
            userHealthFactor={healthFactor}
          />
          <div className="flex h-[64px] items-center justify-between border-2 border-solid  border-transparent border-b-line-primary px-[24px]">
            <div className="flex-center gap-[30px]">
              <span className="font-[500]">Position Management</span>
            </div>
            <div className="flex-center gap-[10px]">
              <Button
                type="primary"
                shape="round"
                disabled={!userAvailableAmount}
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
                disabled={!userBorrowedAmount}
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
                <HealthFactor value={`${healthFactor}`} />
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
            <div className="flex flex-col">
              <span className="flex h-[52px] items-center justify-end text-tc-secondary">
                Borrow mode
              </span>
              <div className="flex items-center gap-[10px] text-[16px]">
                <EnableBorrowMode onSuccess={refresh} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Position;
