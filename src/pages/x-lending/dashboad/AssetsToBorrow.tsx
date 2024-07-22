import LendingCard from '@/components/LendingCard.tsx';
import { useAccount } from 'wagmi';
import { ColumnType } from 'antd/es/table';
import { TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import { Button, Table } from 'antd';
import { LendingAsset } from '@/types/Lending.ts';

const Borrows = ({
  assets,
  loading,
}: {
  assets: LendingAsset[];
  loading: boolean;
}) => {
  const { address } = useAccount();
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
            <span>{formatCurrency(record?.availableAmount || 0, false)}</span>
            <span>{formatCurrency(record?.availableTotalPrice || 0)}</span>
          </div>
        );
      },
    },
    {
      key: 'apy',
      title: 'APY, borrow rate',
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
    render: (_: string, __: LendingAsset) => {
      return (
        <div className="flex  items-center justify-end gap-[5px]">
          <Button
            type="primary"
            className="rounded-[8px] text-[12px]"
            size="small"
            onClick={() => {}}
          >
            Borrow
          </Button>
        </div>
      );
    },
  };
  return (
    <LendingCard title="Assets to borrow" loading={loading}>
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
