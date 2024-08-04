import { ColumnType } from 'antd/es/table';
import { formatCurrency } from '@/utils';
import { EyeOutlined } from '@ant-design/icons';
import usePool from '@/pages/x-dex/hooks/usePool.ts';
import { PoolType } from '@/types/pool.ts';
import { formatUnits } from 'ethers';
import { useNavigate } from 'react-router-dom';
import ResponsiveTable from '@/components/ResponsiveTable.tsx';
import { Button, Skeleton } from 'antd';
import TokenWithIcon from '@/components/TokenWithIcon.tsx';

const PoolList = () => {
  const { pools, isPending } = usePool();

  const navigate = useNavigate();

  const columns: ColumnType<PoolType>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_: string, record: PoolType) => {
        return <TokenWithIcon token={record.tokenA} />;
      },
    },
    {
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
    {
      dataIndex: 'action',
      render: (_: string, record) => {
        return (
          <Button
            type="text"
            ghost
            onClick={() => {
              navigate(`/x-dex/explore/token/${record.tokenA.address}`);
            }}
            icon={<EyeOutlined />}
          />
        );
      },
    },
  ];
  return (
    <div className="bg-fill-niubi">
      {isPending ? (
        <div className="p-[24px]">
          <Skeleton active />
        </div>
      ) : (
        <ResponsiveTable
          columns={columns}
          dataSource={pools}
          size="middle"
          rowKey="id"
        />
      )}
    </div>
  );
};

export default PoolList;
