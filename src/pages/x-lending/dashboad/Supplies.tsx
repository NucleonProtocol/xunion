import LendingCard from '@/components/LendingCard.tsx';
import { Button, Popover, Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import { SLCAsset } from '@/types/slc.ts';
import { TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import useSupplies from '@/pages/x-lending/hooks/useSupplies.ts';
import { useAccount } from 'wagmi';

const Supplies = () => {
  const { address } = useAccount();
  const { tokens, loading } = useSupplies();
  const columns: ColumnType<SLCAsset>[] = [
    {
      key: 'Asset',
      title: 'Asset',
      dataIndex: 'asset',
      render: (_: string, record: SLCAsset) => {
        return (
          <div className="flex  gap-[5px]">
            <span>
              <TokenIcon src={record.icon} />
            </span>
            <span>{record?.symbol}</span>
          </div>
        );
      },
    },
    {
      key: 'balance',
      title: 'Balance',
      dataIndex: 'balance',
      render: (_: string, record: SLCAsset) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>{record?.balance || 0}</span>
            <span>{formatCurrency(record?.balancePrice || 0)}</span>
          </div>
        );
      },
    },
    {
      key: 'apy',
      title: 'APY',
      dataIndex: 'apy',
      render: (_: string, __: SLCAsset) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>10.2%</span>
          </div>
        );
      },
    },
    {
      key: 'Collateral',
      title: 'Collateral',
      dataIndex: 'collateral',
      align: 'center',
      render: (value: string) => {
        return value ? (
          <CheckCircleOutlined className="text-status-success" />
        ) : (
          <CloseCircleOutlined className="text-status-error" />
        );
      },
    },
  ];
  const actionColumn: ColumnType<SLCAsset> = {
    key: 'action',
    title: '',
    align: 'right',
    render: (_: string) => {
      return (
        <Popover
          title={
            <div className="flex  flex-col gap-[5px]">
              <Button
                type="text"
                ghost
                className="text-primary text-left"
                onClick={() => {}}
              >
                Supply
              </Button>
              <Button
                type="text"
                ghost
                className="text-primary text-left "
                onClick={() => {}}
              >
                Withdraw
              </Button>
            </div>
          }
        >
          <EllipsisOutlined className="cursor-pointer text-[20px]" />
        </Popover>
      );
    },
  };
  return (
    <LendingCard
      title="Your supplies"
      loading={loading}
      description={
        <div className="flex items-center gap-[10px]">
          <Button className="pointer-events-none rounded-[10px] text-tc-secondary">
            Balance: $71,050.98
          </Button>
          <Button className="pointer-events-none rounded-[10px] text-tc-secondary">
            APY: 80.76%
          </Button>
          <Button className="pointer-events-none rounded-[10px] text-tc-secondary">
            Collateral: $20,000.98
          </Button>
        </div>
      }
    >
      <Table
        columns={address ? [...columns, actionColumn] : columns}
        dataSource={tokens.slice(0, 5) as SLCAsset[]}
        bordered={false}
        rowHoverable={false}
        pagination={false}
        rowKey="name"
        size="middle"
      />
    </LendingCard>
  );
};

export default Supplies;
