import { ColumnType } from 'antd/es/table';
import { formatCurrency } from '@/utils';
import { formatUnits } from 'ethers';
import ResponsiveTable from '@/components/ResponsiveTable.tsx';
import { Skeleton } from 'antd';
import TokenWithIcon from '@/components/TokenWithIcon.tsx';
import { useTranslate } from '@/i18n';
import { useMutation } from '@tanstack/react-query';
import { getTokenList } from '@/services/token';
import { useEffect } from 'react';
import { Token } from '@/types/swap';
import { cn } from '@/utils/classnames';

const TokenList = () => {
  const {
    data: tokens,
    mutate: getTokens,
    isPending,
  } = useMutation({
    mutationFn: getTokenList,
  });

  useEffect(() => {
    getTokens({ pageNum: 1, pageSize: 1000 });
  }, []);

  const { t } = useTranslate();
  const columns: ColumnType<Token>[] = [
    {
      title: t('x-dex.swap.trade.time'),
      dataIndex: 'time',
      render: (_: string, record: Token) => {
        return <TokenWithIcon token={record} />;
      },
    },
    {
      title: t('x-dex.swap.trade.amount'),
      dataIndex: 'tvl',
      render: (_: string, record: Token) => {
        return (
          <div className="flex flex-col gap-[5px]">
            {formatCurrency(Number(formatUnits(record?.price || 0n)), true)}
          </div>
        );
      },
    },
    {
      title: t('x-dex.swap.trade.side'),
      align: 'center',
      dataIndex: 'volume24h',
      render: (_, record: Token) => {
        const price = Number(formatUnits(record?.price || 0n));
        const price24ago = Number(formatUnits(record?.price24ago || 0n));
        const rate = ((price24ago - price) / price24ago) * 100;
        if (rate > 0) {
          return (
            <div className={cn('flex flex-col gap-[5px] text-status-success')}>
              +{rate.toFixed(2)}%
            </div>
          );
        }
        if (rate < 0) {
          return (
            <div className={cn('flex flex-col gap-[5px] text-status-error')}>
              {rate.toFixed(2)}%
            </div>
          );
        }
        return (
          <div className={cn('gap-[5px flex flex-col')}>{rate.toFixed(2)}%</div>
        );
      },
    },
    {
      title: t('x-dex.swap.trade.pair'),
      dataIndex: 'tvl',
      align: 'center',
      render: (value: string) => (
        <div className="flex flex-col gap-[5px]">
          {formatCurrency(Number(formatUnits(value || 0n)), true)}
        </div>
      ),
    },
    {
      title: t('x-dex.swap.trade.total.price'),
      dataIndex: 'volume24h',
      render: (_: string, record: Token) => {
        return (
          <div className="flex flex-col gap-[5px]">
            {formatCurrency(Number(formatUnits(record?.volume24h || 0n)), true)}
          </div>
        );
      },
    },
    {
      title: t('x-dex.swap.trade.wallet.address'),
      dataIndex: 'volume1w',
      render: (_: string, record: Token) => {
        return (
          <div className="flex flex-col gap-[5px]">
            {formatCurrency(Number(formatUnits(record?.volume1w || 0n)), true)}
          </div>
        );
      },
    },
  ];
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="min-h-[600px] bg-fill-niubi p-[10px] ">
        {isPending ? (
          <div className="p-[24px]">
            <Skeleton active />
          </div>
        ) : (
          <ResponsiveTable
            columns={columns}
            dataSource={tokens?.items || []}
            rowKey="id"
          />
        )}
      </div>
    </div>
  );
};

export default TokenList;
