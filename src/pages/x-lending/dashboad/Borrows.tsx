import LendingCard from '@/components/LendingCard.tsx';
import { Button, Table } from 'antd';
import { useAccount } from 'wagmi';
import { ColumnType } from 'antd/es/table';
import { TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import { LendingAsset } from '@/types/Lending.ts';

const Borrows = ({
  assets,
  loading,
  lendingTotalBalance,
  lendingTotalAPY,
  lendingPowerUsed,
}: {
  assets: LendingAsset[];
  loading: boolean;
  lendingTotalBalance: number;
  lendingTotalAPY: number;
  lendingPowerUsed: number;
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
    render: (_: string, __: LendingAsset) => {
      return (
        <div className="flex  items-center justify-end gap-[5px]">
          <Button
            type="primary"
            size="small"
            className="rounded-[8px] text-[12px]"
            onClick={() => {}}
          >
            Repay
          </Button>
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
            {`Balance: ${formatCurrency(lendingPowerUsed)}`}
          </Button>
        </div>
      }
    >
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
