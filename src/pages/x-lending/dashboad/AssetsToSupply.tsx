import LendingCard from '@/components/LendingCard.tsx';
import { Button, Checkbox, Table } from 'antd';
import { useAccount } from 'wagmi';
import { ColumnType } from 'antd/es/table';
import { TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { LendingAsset } from '@/types/Lending.ts';
import { useEffect, useState } from 'react';
import DepositModal from '@/pages/x-lending/dashboad/DepositModal.tsx';

const AssetsToSupply = ({
  assets,
  loading,
  health,
  refetch,
}: {
  assets: LendingAsset[];
  loading: boolean;
  health: number;
  refetch: () => void;
}) => {
  const [filteredAssets, setFilteredAssets] = useState<LendingAsset[]>([]);
  const [checked, setChecked] = useState(false);
  const { address } = useAccount();
  const [depositItem, setDepositItem] = useState<LendingAsset>();

  useEffect(() => {
    if (!checked) {
      setFilteredAssets(assets.filter((item) => item.erc20Balance !== 0));
    } else {
      setFilteredAssets(assets);
    }
  }, [checked, assets]);

  const columns: ColumnType<LendingAsset>[] = [
    {
      key: 'Asset',
      title: 'Asset',
      dataIndex: 'asset',
      render: (_: string, record: LendingAsset) => {
        return (
          <div className="flex  gap-[5px]">
            <span>
              <TokenIcon src={record.token?.icon} />
            </span>
            <span>{record?.token.symbol}</span>
          </div>
        );
      },
    },
    {
      key: 'balance',
      title: 'Wallet Balance',
      dataIndex: 'balance',
      render: (_: string, record: LendingAsset) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>{formatCurrency(record?.erc20Balance || 0, false)}</span>
            <span>{formatCurrency(record?.erc20TotalPrice || 0)}</span>
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
    render: (_: string, record: LendingAsset) => {
      return (
        <div className="flex  items-center justify-end gap-[5px]">
          <Button
            type="primary"
            className="rounded-[8px] text-[12px]"
            size="small"
            onClick={() => {
              setDepositItem(record);
            }}
            disabled={!record.canCollateral || !record.erc20Balance}
          >
            Supply
          </Button>
        </div>
      );
    },
  };
  return (
    <LendingCard
      loading={loading}
      title="Assets to supply"
      description={
        <div className="flex items-center gap-[5px]">
          <label htmlFor="chckbox" className="flex items-center">
            <Checkbox
              id="chckbox"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            />
            <span className="cursor-pointer select-none pl-[10px]">
              Show 0 balance assets
            </span>
          </label>
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
        dataSource={filteredAssets}
        bordered={false}
        rowHoverable={false}
        pagination={false}
        rowKey="id"
        size="middle"
      />
    </LendingCard>
  );
};

export default AssetsToSupply;
