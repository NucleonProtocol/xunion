import LendingCard from '@/components/LendingCard.tsx';
import { Button } from 'antd';
import { ColumnType } from 'antd/es/table';
import { formatCurrency } from '@/utils';
import { LendingAsset } from '@/types/Lending.ts';
import { useState } from 'react';
import LendingModal from '@/pages/x-lending/dashboad/LendingModal.tsx';
import RepayModal from '@/pages/x-lending/dashboad/RepayModal.tsx';
import ResponsiveTable from '@/components/ResponsiveTable.tsx';
import AmountWithPrice from '@/components/AmountWithPrice.tsx';
import TokenWithIcon from '@/components/TokenWithIcon.tsx';

const Borrows = ({
  assets,
  loading,
  lendingTotalBalance,
  lendingTotalAPY,
  lendingPowerUsed,
  health,
  refetch,
}: {
  assets: LendingAsset[];
  loading: boolean;
  lendingTotalBalance: number;
  lendingTotalAPY: number;
  lendingPowerUsed: number;
  health: number;
  refetch: () => void;
}) => {
  const [lendingItem, setLendingItem] = useState<LendingAsset>();
  const [repayItem, setRepayItem] = useState<LendingAsset>();

  const columns: ColumnType<LendingAsset>[] = [
    {
      title: 'Asset',
      dataIndex: 'asset',
      render: (_: string, record: LendingAsset) => {
        return <TokenWithIcon token={record.token} />;
      },
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      render: (_: string, record: LendingAsset) => {
        return (
          <AmountWithPrice
            amount={record?.lendingAmount}
            price={record?.lendingTotalPrice}
          />
        );
      },
    },
    {
      title: 'APY',
      dataIndex: 'apy',
      render: (_: string, record: LendingAsset) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>{`< ${record.lendingInterest}%`}</span>
          </div>
        );
      },
    },
    {
      dataIndex: 'action',
      align: 'right',
      render: (_: string, record) => {
        return (
          <div className="flex  items-center justify-end gap-[10px]">
            <Button
              type="primary"
              className="rounded-[8px] text-[12px] max-md:h-[32px] max-md:flex-1 max-md:rounded-[16px]"
              size="small"
              disabled={!record.availableAmount}
              onClick={() => {
                setLendingItem(record);
              }}
            >
              Borrow
            </Button>
            <Button
              size="small"
              className="rounded-[8px] text-[12px] max-md:h-[32px] max-md:flex-1 max-md:rounded-[16px]"
              disabled={!record.lendingAmount}
              onClick={() => {
                setRepayItem(record);
              }}
            >
              Repay
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <LendingCard
      title="Your borrows"
      loading={loading}
      description={
        <div className="flex items-center gap-[10px] max-md:flex-wrap">
          <Button className="pointer-events-none rounded-[10px] text-tc-secondary">
            {`Balance: ${formatCurrency(lendingTotalBalance)}`}
          </Button>
          <Button className="pointer-events-none rounded-[10px] text-tc-secondary">
            {`APY: < ${lendingTotalAPY}%`}
          </Button>
          <Button className="pointer-events-none rounded-[10px] text-tc-secondary">
            {`Borrow power used: ${formatCurrency(lendingPowerUsed)}`}
          </Button>
        </div>
      }
    >
      {lendingItem && (
        <LendingModal
          asset={lendingItem}
          refresh={() => {
            refetch();
            setRepayItem(undefined);
          }}
          userHealthFactor={health}
          onClose={() => {
            setLendingItem(undefined);
          }}
        />
      )}
      {repayItem && (
        <RepayModal
          asset={repayItem}
          refresh={() => {
            refetch();
            setRepayItem(undefined);
          }}
          userHealthFactor={health}
          onClose={() => {
            setRepayItem(undefined);
          }}
        />
      )}
      <ResponsiveTable
        columns={columns}
        dataSource={assets}
        size="middle"
        rowKey="id"
      />
    </LendingCard>
  );
};

export default Borrows;
