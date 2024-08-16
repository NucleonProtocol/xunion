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
import { useTranslate } from '@/i18n';

const PoolList = () => {
  const { pools, isPending } = usePool();

  const { t } = useTranslate();
  const navigate = useNavigate();

  const columns: ColumnType<PoolType>[] = [
    {
      title: t('common.name'),
      dataIndex: 'name',
      render: (_: string, record: PoolType) => {
        return <TokenWithIcon token={record.tokenA} />;
      },
    },
    {
      title: t('common.price'),
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
      title: t('common.change24H'),
      align: 'center',
      dataIndex: 'volume24h',
      render: (_: string) => {
        return (
          <div className="flex flex-col gap-[5px] text-status-success">3%</div>
        );
      },
    },
    {
      title: t('common.tvl'),
      dataIndex: 'fees',
      align: 'center',
      render: (value: string) => (
        <div className="flex flex-col gap-[5px]">
          {formatCurrency(Number(formatUnits(value || 0n)), true)}
        </div>
      ),
    },
    // {
    //   title: t('common.FDV'),
    //   dataIndex: 'fees',
    //   align: 'center',
    //   render: (value: string) => (
    //     <div className="flex flex-col gap-[5px]">
    //       {formatCurrency(Number(formatUnits(value || 0n)), true)}
    //     </div>
    //   ),
    // },
    {
      title: t('common.volume24h'),
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
      title: t('common.volume1W'),
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
    <div className="bg-fill-niubi p-[10px]">
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
