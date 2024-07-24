import { useAccount } from 'wagmi';
import { ColumnType } from 'antd/es/table';
import { TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import { EyeOutlined } from '@ant-design/icons';
import { Button, Skeleton, Table } from 'antd';
import usePool from '@/pages/x-dex/hooks/usePool.ts';
import { PoolType } from '@/types/pool.ts';
import { formatUnits } from 'ethers';
import { useNavigate } from 'react-router-dom';

const PoolList = () => {
  const { address } = useAccount();

  const { pools, isPending } = usePool();

  const navigate = useNavigate();

  const columns: ColumnType<PoolType>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      render: (_: string, record: PoolType) => {
        return (
          <div className="flex  gap-[10px]">
            <span>
              <TokenIcon src={record.tokenA.icon} width={20} height={20} />
            </span>
            <span>{`${record.tokenA.symbol}`}</span>
          </div>
        );
      },
    },
    {
      key: 'TVL',
      title: 'Price',
      dataIndex: 'tvl',
      render: (_: string, record: PoolType) => {
        return (
          <div className="flex flex-col gap-[5px]">
            {formatCurrency(Number(formatUnits(record?.tvl || 0n)), true)}
          </div>
        );
      },
    },
    {
      key: 'volume24h',
      title: 'Change(24H)',
      align: 'center',
      dataIndex: 'volume24h',
      render: (_: string) => {
        return (
          <div className="flex flex-col gap-[5px] text-status-success">3%</div>
        );
      },
    },
    {
      key: 'fees',
      title: 'TVL',
      dataIndex: 'fees',
      align: 'center',
      render: (value: string) => (
        <div className="flex flex-col gap-[5px]">
          {formatCurrency(Number(formatUnits(value || 0n)), true)}
        </div>
      ),
    },
    {
      key: 'fees',
      title: 'FDV',
      dataIndex: 'fees',
      align: 'center',
      render: (value: string) => (
        <div className="flex flex-col gap-[5px]">
          {formatCurrency(Number(formatUnits(value || 0n)), true)}
        </div>
      ),
    },
    {
      key: 'volume24h',
      title: 'Volume(24H)',
      dataIndex: 'volume24h',
      render: (_: string, record: PoolType) => {
        return (
          <div className="flex flex-col gap-[5px]">
            {formatCurrency(Number(formatUnits(record?.tvl || 0n)), true)}
          </div>
        );
      },
    },
    {
      key: 'volume24h',
      title: 'Volume(1W)',
      dataIndex: 'volume24h',
      render: (_: string, record: PoolType) => {
        return (
          <div className="flex flex-col gap-[5px]">
            {formatCurrency(Number(formatUnits(record?.tvl || 0n)), true)}
          </div>
        );
      },
    },
  ];
  const actionColumn: ColumnType<PoolType> = {
    key: 'action',
    title: '',
    render: (_: string, record) => {
      return (
        <Button
          type="text"
          className="text-left text-primary"
          onClick={() => {
            navigate(`/x-dex/explore/token/${record.tokenA.address}`);
          }}
          icon={<EyeOutlined />}
        />
      );
    },
  };
  return (
    <div className="bg-fill-niubi">
      {isPending ? (
        <div className="p-[24px]">
          <Skeleton active />
        </div>
      ) : (
        <Table
          columns={address ? [...columns, actionColumn] : columns}
          dataSource={pools}
          bordered={false}
          rowHoverable={false}
          pagination={false}
          rowKey="id"
        />
      )}
    </div>
  );
};

export default PoolList;
