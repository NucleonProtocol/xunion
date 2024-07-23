import { useAccount } from 'wagmi';
import { ColumnType } from 'antd/es/table';
import { TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import { Button, Skeleton, Table } from 'antd';
import PoolFilter from './PoolFilter.tsx';
import usePool from '@/pages/x-dex/hooks/usePool.ts';
import { PoolType } from '@/types/pool.ts';
import { formatUnits } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';

const PoolList = () => {
  const { address } = useAccount();

  const { pools, poolType, onPoolChange, onSearch, isPending } = usePool();

  const navigate = useNavigate();

  const columns: ColumnType<PoolType>[] = [
    {
      key: 'name',
      title: 'Asset',
      dataIndex: 'name',
      width: 240,
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
      title: 'Total supplied',
      dataIndex: 'tvl',
      width: 240,
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
      title: 'Supply APY',
      dataIndex: 'volume24h',
      width: 240,
      render: (_: string, record: PoolType) => {
        return (
          <div className="flex flex-col gap-[5px]">
            {formatCurrency(Number(formatUnits(record?.volume24h || 0n)), true)}
          </div>
        );
      },
    },
    {
      key: 'fees',
      title: 'Total borrowed',
      dataIndex: 'fees',
      align: 'center',
      render: (value: string) => (
        <div className="flex flex-col gap-[5px]">
          {formatCurrency(Number(formatUnits(value || 0n)), true)}
        </div>
      ),
    },
    {
      key: 'APR',
      title: 'Borrow APY, variable',
      dataIndex: 'apr',
      align: 'center',
      render: (value: string) => value || '-',
    },
  ];
  const actionColumn = {
    key: 'action',
    title: 'Action',
    render: (_: string, record: PoolType) => {
      return (
        <Button
          type="text"
          className="text-primary text-left "
          onClick={() => {
            navigate(
              `/x-dex/swap?tokena=${record.tokenA.address}&tokenb=${record.tokenB.address}`
            );
          }}
          icon={<EyeOutlined />}
        />
      );
    },
  };
  return (
    <div className="flex w-full flex-col">
      <PoolFilter
        poolType={poolType}
        onPoolChange={onPoolChange}
        onSearch={onSearch}
      />
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
            rowKey="name"
          />
        )}
      </div>
    </div>
  );
};

export default PoolList;
