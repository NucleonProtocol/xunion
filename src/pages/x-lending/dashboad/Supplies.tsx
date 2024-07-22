import LendingCard from '@/components/LendingCard.tsx';
import { Button, Popover, Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import { TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { useAccount } from 'wagmi';
import { LendingAsset } from '@/types/Lending.ts';

const Supplies = ({
  assets,
  loading,
  userMode,
  depositTotalCollateralBalance,
  depositTotalAPY,
  depositTotalBalance,
}: {
  assets: LendingAsset[];
  loading: boolean;
  userMode: string;
  depositTotalCollateralBalance: number;
  depositTotalAPY: number;
  depositTotalBalance: number;
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
            <span>{formatCurrency(record?.depositAmount || 0, false)}</span>
            <span>{formatCurrency(record?.depositTotalPrice || 0)}</span>
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
            <span>{record?.depositInterest}%</span>
          </div>
        );
      },
    },
    {
      key: 'Collateral',
      title: 'Collateral',
      dataIndex: 'lending_mode_num',
      align: 'center',
      render: (value: string) => {
        const canCollateral =
          (userMode === '0' && value !== '1') ||
          (userMode === '1' && value === '1') ||
          (userMode !== '0' && userMode !== '1' && value === userMode);
        return canCollateral ? (
          <CheckCircleOutlined className="text-status-success" />
        ) : (
          <CloseCircleOutlined className="text-status-error" />
        );
      },
    },
  ];
  const actionColumn: ColumnType<LendingAsset> = {
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
            {`Balance: ${formatCurrency(depositTotalBalance)}`}
          </Button>
          <Button className="pointer-events-none rounded-[10px] text-tc-secondary">
            {`APY: ${depositTotalAPY}%`}
          </Button>
          <Button className="pointer-events-none rounded-[10px] text-tc-secondary">
            {`Balance: ${formatCurrency(depositTotalCollateralBalance)}`}
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

export default Supplies;
