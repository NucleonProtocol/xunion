import { useAccount } from 'wagmi';
import { ColumnType } from 'antd/es/table';
import { SwapIcon, TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popover, Skeleton, Table } from 'antd';
import PoolFilter from '@/pages/x-dex/pools/PoolFilter.tsx';
import usePool from '@/pages/x-dex/hooks/usePool.ts';
import TimePicker from '@/components/TimePicker.tsx';
import { PoolType } from '@/types/pool.ts';
import { formatUnits } from 'ethers';
import { useNavigate } from 'react-router-dom';

const PoolList = () => {
  const { address } = useAccount();

  const {
    pools,
    total,
    poolType,
    onPoolChange,
    onSearch,
    onTimeChange,
    time,
    isPending,
  } = usePool();

  const navigate = useNavigate();

  const columns: ColumnType<PoolType>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      width: 240,
      render: (_: string, record: PoolType) => {
        return (
          <div className="flex  gap-[10px]">
            <span>
              <TokenIcon src={record.tokenA.icon} width={20} height={20} />
              <TokenIcon src={record.tokenB.icon} width={20} height={20} />
            </span>
            <span>{`${record.tokenA.symbol} / ${record.tokenB.symbol}`}</span>
          </div>
        );
      },
    },
    {
      key: 'TVL',
      title: 'TVL',
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
      title: 'Volume(24h)',
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
      title: 'Fees(24h)',
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
      title: 'APR(24h)',
      dataIndex: 'apr',
      align: 'center',
      render: (value: string) => value || '-',
    },
  ];
  const actionColumn = {
    key: 'action',
    title: '',
    render: (_: string, record: PoolType) => {
      return (
        <Popover
          title={
            <div className="flex  flex-col gap-[5px]">
              <Button
                type="text"
                ghost
                className="text-primary text-left"
                onClick={() => {
                  navigate(
                    `/x-dex/liquidity?tokena=${record.tokenA.address}&tokenb=${record.tokenB.address}`
                  );
                }}
                icon={<PlusOutlined />}
              >
                Add liquidity
              </Button>
              <Button
                type="text"
                ghost
                className="text-primary text-left "
                onClick={() => {
                  navigate(
                    `/x-dex/swap?tokena=${record.tokenA.address}&tokenb=${record.tokenB.address}`
                  );
                }}
                icon={<SwapIcon />}
              >
                Swap
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
    <div className="flex flex-col">
      <PoolFilter
        poolType={poolType}
        onPoolChange={onPoolChange}
        onSearch={onSearch}
      />
      <div className="bg-fill-niubi">
        <div className="flex-center-between p-[15px]">
          <div className="flex-center gap-[5px]">
            <span className="text-[18px] font-bold">Pools</span>
            <span className="text-tc-secondary">{`(${total})`}</span>
          </div>
          <TimePicker
            time={time}
            onTimeChange={onTimeChange}
            options={[
              {
                label: '24H',
                value: '24H',
              },
              {
                label: '7D',
                value: '7D',
              },
              {
                label: '30D',
                value: '30D',
              },
            ]}
          />
        </div>
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
