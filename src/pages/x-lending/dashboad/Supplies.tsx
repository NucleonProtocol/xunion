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
import { useState } from 'react';
import DepositModal from '@/pages/x-lending/dashboad/DepositModal.tsx';

const Supplies = ({
  assets,
  loading,
  depositTotalCollateralBalance,
  depositTotalAPY,
  depositTotalBalance,
  health,
  refetch,
}: {
  assets: LendingAsset[];
  loading: boolean;
  depositTotalCollateralBalance: number;
  depositTotalAPY: number;
  depositTotalBalance: number;
  health: number;
  refetch: () => void;
}) => {
  const { address } = useAccount();
  const [depositItem, setDepositItem] = useState<LendingAsset>();

  const columns: ColumnType<LendingAsset>[] = [
    {
      key: 'Asset',
      title: 'Asset',
      dataIndex: 'asset',
      render: (_: string, record) => {
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
      render: (_: string, record) => {
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
      render: (_: string, record) => {
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
      dataIndex: 'canCollateral',
      align: 'center',
      render: (canCollateral: boolean) => {
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
    render: (_: string, record) => {
      return (
        <Popover
          title={
            <div className="flex  flex-col gap-[5px]">
              <Button
                type="text"
                ghost
                className="text-primary text-left"
                onClick={() => {
                  setDepositItem(record);
                }}
                disabled={!record.canCollateral || !record.erc20Balance}
              >
                Supply
              </Button>
              <Button
                type="text"
                ghost
                className="text-primary text-left "
                onClick={() => {}}
                disabled={!record.depositAmount}
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
      {depositItem && (
        <DepositModal
          asset={depositItem}
          onClose={() => {
            setDepositItem(undefined);
          }}
          refresh={refetch}
          userHealthFactor={health}
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

export default Supplies;
