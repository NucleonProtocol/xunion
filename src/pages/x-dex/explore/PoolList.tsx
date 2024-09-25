import { ColumnType } from 'antd/es/table';
import { formatCurrency } from '@/utils';
import { EyeOutlined } from '@ant-design/icons';
import usePool from '@/pages/x-dex/hooks/usePool.ts';
import { PoolType } from '@/types/pool.ts';
import { formatUnits } from 'ethers';
import { Link, useNavigate } from 'react-router-dom';
import ResponsiveTable from '@/components/ResponsiveTable.tsx';
import { Button, Skeleton } from 'antd';
import TokenWithIcon from '@/components/TokenWithIcon.tsx';
import { useTranslate } from '@/i18n';
import { cn } from '@/utils/classnames';

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
      title: t('common.tvl'),
      dataIndex: 'tvl',
      align: 'center',
      render: (value: string) => (
        <div className="flex flex-col gap-[5px]">
          {formatCurrency(Number(formatUnits(value || 0n)), true)}
        </div>
      ),
    },
    {
      title: t('common.volume24h'),
      dataIndex: 'volume24h',
      render: (_: string, record: PoolType) => {
        return (
          <div className="flex flex-col gap-[5px]">
            {formatCurrency(Number(formatUnits(record?.volume24h || 0n)), true)}
          </div>
        );
      },
    },
    {
      title: t('common.volume1W'),
      dataIndex: 'volume1w',
      render: (_: string, record: PoolType) => {
        return (
          <div className="flex flex-col gap-[5px]">
            {formatCurrency(Number(formatUnits(record?.volume1w || 0n)), true)}
          </div>
        );
      },
    },
    {
      title: t('common.fees24h'),
      dataIndex: 'volume24h',
      render: (_: string, record: PoolType) => {
        return (
          <div className="flex flex-col gap-[5px]">
            {formatCurrency(
              Number(formatUnits(record?.volume24h || 0n)) *
                (Number(record?.fees || 0) / 10000),
              true
            )}
          </div>
        );
      },
    },
    {
      title: t('common.APR24h'),
      dataIndex: 'volume24h',
      render: (_: string, record: PoolType) => {
        return (
          <div className="flex flex-col gap-[5px]">
            {(
              ((365 *
                Number(formatUnits(record?.volume24h || 0n)) *
                (Number(record?.fees || 0) / 10000)) /
                (Number(formatUnits(record?.tvl || 0n)) || 1)) *
              100
            ).toFixed(2)}
            %
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
    <div className="flex flex-col gap-[20px]">
      <div className="flex w-full  justify-between gap-[20px]">
        <div className="flex items-center gap-[20px]">
          <Link
            to={'/x-dex/explore/token'}
            className={cn(
              'flex-center h-[40px] cursor-pointer gap-[12px] rounded-[20px] px-[16px] hover:bg-theme-non-opaque hover:text-theme  '
            )}
          >
            <span className="max-md:text-[14px]">{t('x-dex.swap.token')}</span>
          </Link>
          <Link
            to={'/x-dex/explore/pool'}
            className={cn(
              'flex-center pointer-events-none h-[40px] gap-[12px] rounded-[20px] bg-theme-non-opaque px-[16px] text-theme '
            )}
          >
            <span className="max-md:text-[14px]">{t('x-dex.swap.pool')}</span>
          </Link>
        </div>
      </div>
      <div className="min-h-[400px] bg-fill-niubi p-[10px]">
        {isPending ? (
          <div className="p-[24px]">
            <Skeleton active />
          </div>
        ) : (
          <ResponsiveTable columns={columns} dataSource={pools} rowKey="id" />
        )}
      </div>
    </div>
  );
};

export default PoolList;
