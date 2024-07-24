import { useAccount } from 'wagmi';
import { ColumnType } from 'antd/es/table';
import { TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import { Button, Skeleton, Table, Tag } from 'antd';
import AssetsFilter from './AssetsFilter.tsx';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { LendingAsset } from '@/types/Lending.ts';

const AssetsList = ({
  assets,
  loading,
  onFilterChange,
}: {
  assets: LendingAsset[];
  loading: boolean;
  onFilterChange: (value: string) => void;
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
          <div className="flex  items-center gap-[10px]">
            <span>
              <TokenIcon src={record.token.icon} width={30} height={30} />
            </span>
            <div className="flex flex-col items-start gap-[2px]">
              <span>{`Wrapped ${record.token.name}`}</span>
              <div className="flex gap-[5px]">
                <span className="text-[12px] text-tc-secondary">{`${record.token.symbol}`}</span>
                {record.lending_mode_num === '1' && (
                  <Tag color="error" className="flex gap-[3px]">
                    <span> Isolated</span>
                    <ExclamationCircleOutlined />
                  </Tag>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: 'TVL',
      title: 'Total supplied',
      dataIndex: 'tvl',
      width: 240,
      align: 'center',
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
      key: 'volume24h',
      title: 'Supply APY',
      dataIndex: 'volume24h',
      width: 240,
      align: 'center',
      render: (_: string, record: LendingAsset) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>{`${(record?.depositInterest || 1) < 1 ? '< ' : ''}${record.depositInterest}%`}</span>
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
            <span>{formatCurrency(record?.lendingAmount || 0, false)}</span>
            <span>{formatCurrency(record?.lendingTotalPrice || 0)}</span>
          </div>
        );
      },
    },
    {
      key: 'APR',
      title: 'Borrow APY, variable',
      dataIndex: 'apr',
      align: 'center',
      render: (_: string, record: LendingAsset) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>{`${(record?.lendingInterest || 1) < 1 ? '< ' : ''}${record.lendingInterest}%`}</span>
          </div>
        );
      },
    },
  ];
  const actionColumn: ColumnType<LendingAsset> = {
    key: 'action',
    title: '',
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
      <AssetsFilter onChange={onFilterChange} />
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
