import LendingCard from '@/components/LendingCard.tsx';
import { Button, Table } from 'antd';
import { useAccount } from 'wagmi';
import { ColumnType } from 'antd/es/table';
import { TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import { LendingAsset } from '@/types/Lending.ts';
import { useState } from 'react';
import LendingModal from '@/pages/x-lending/dashboad/LendingModal.tsx';
import RepayModal from '@/pages/x-lending/dashboad/RepayModal.tsx';

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
  const { address } = useAccount();
  const [lendingItem, setLendingItem] = useState<LendingAsset>();
  const [repayItem, setRepayItem] = useState<LendingAsset>();

  const columns: ColumnType<LendingAsset>[] = [
    {
      key: 'Asset',
      title: 'Asset',
      dataIndex: 'asset',
      render: (_: string, record: LendingAsset) => {
        return (
          <div className="flex  gap-[5px]">
            <span>
              <TokenIcon src={record.token.icon} />
            </span>
            <span>{record?.token.symbol}</span>
          </div>
        );
      },
    },
    {
      key: 'balance',
      title: 'Balance',
      dataIndex: 'balance',
      render: (_: string, record: LendingAsset) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>{formatCurrency(record?.lendingAmount || 0, false)}</span>
            <span>{formatCurrency(record?.lendingTotalPrice || 0)}</span>
          </div>
        );
      },
    },
    {
      key: 'apy',
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
  ];
  const actionColumn: ColumnType<LendingAsset> = {
    key: 'action',
    title: '',
    align: 'right',
    render: (_: string, record) => {
      return (
        <div className="flex  items-center justify-end gap-[10px]">
          <Button
            type="primary"
            className="rounded-[8px] text-[12px]"
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
            className="rounded-[8px] text-[12px]"
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
  };
  return (
    <LendingCard
      title="Your borrows"
      loading={loading}
      description={
        <div className="flex items-center gap-[10px]">
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
      <Table
        columns={address ? [...columns, actionColumn] : columns}
        dataSource={assets}
        bordered={false}
        rowHoverable={false}
        pagination={false}
        rowKey="id"
        size="middle"
      />
    </LendingCard>
  );
};

export default Borrows;
