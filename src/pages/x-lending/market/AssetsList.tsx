import { useAccount } from 'wagmi';
import { ColumnType } from 'antd/es/table';
import { TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import { Button, Skeleton, Table } from 'antd';
import AssetsFilter from './AssetsFilter.tsx';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';
import { LendingAsset } from '@/types/Lending.ts';

const AssetsList = ({
  assets,
  loading,
}: {
  assets: LendingAsset[];
  loading: boolean;
}) => {
  const { address } = useAccount();
  const navigate = useNavigate();

  const columns: ColumnType<LendingAsset>[] = [
    {
      key: 'name',
      title: 'Asset',
      dataIndex: 'name',
      width: 240,
      render: (_: string, record) => {
        return (
          <div className="flex  gap-[10px]">
            <span>
              <TokenIcon src={record.token.icon} width={20} height={20} />
            </span>
            <span>{`${record.token.symbol}`}</span>
          </div>
        );
      },
    },
    {
      key: 'TVL',
      title: 'Total supplied',
      dataIndex: 'tvl',
      width: 240,
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
      key: 'volume24h',
      title: 'Supply APY',
      dataIndex: 'volume24h',
      width: 240,
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
      key: 'fees',
      title: 'Total borrowed',
      dataIndex: 'fees',
      align: 'center',
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
      key: 'APR',
      title: 'Borrow APY, variable',
      dataIndex: 'apr',
      align: 'center',
      render: (_: string) => '79%' || '-',
    },
  ];
  const actionColumn: ColumnType<LendingAsset> = {
    key: 'action',
    title: 'Action',
    render: (_: string, record) => {
      return (
        <Button
          type="text"
          className="text-primary text-left "
          onClick={() => {
            navigate(`/x-lending/market/${record.token.address}?chainId=71`);
          }}
          icon={<EyeOutlined />}
        />
      );
    },
  };
  return (
    <div className="flex w-full flex-col">
      <AssetsFilter />
      <div className="bg-fill-niubi">
        {loading ? (
          <div className="p-[24px]">
            <Skeleton active />
          </div>
        ) : (
          <Table
            columns={address ? [...columns, actionColumn] : columns}
            dataSource={assets}
            bordered={false}
            rowHoverable={false}
            pagination={false}
            rowKey="id"
          />
        )}
      </div>
    </div>
  );
};

export default AssetsList;
