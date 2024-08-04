import LendingCard from '@/components/LendingCard.tsx';
import { Button, Popover } from 'antd';
import { ColumnType } from 'antd/es/table';
import { formatCurrency } from '@/utils';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { LendingAsset } from '@/types/Lending.ts';
import { useState } from 'react';
import DepositModal from '@/pages/x-lending/dashboad/DepositModal.tsx';
import WithdrawModal from '@/pages/x-lending/dashboad/WithdrawModal.tsx';
import ResponsiveTable from '@/components/ResponsiveTable.tsx';
import TokenWithIcon from '@/components/TokenWithIcon.tsx';
import AmountWithPrice from '@/components/AmountWithPrice.tsx';
import ResponsiveButton from '@/components/ResponsiveButton.tsx';
import { useTranslate } from '@/i18n';

const Supplies = ({
  assets,
  loading,
  depositTotalCollateralBalance,
  depositTotalAPY,
  depositTotalBalance,
  health,
  refetch,
}: {
  assets: LendingAsset[];
  loading: boolean;
  depositTotalCollateralBalance: number;
  depositTotalAPY: number;
  depositTotalBalance: number;
  health: number;
  refetch: () => void;
}) => {
  const [depositItem, setDepositItem] = useState<LendingAsset>();
  const [withdrawItem, setWithdrawItem] = useState<LendingAsset>();

  const { t } = useTranslate();
  const columns: ColumnType<LendingAsset>[] = [
    {
      title: t('x-lending.asset'),
      dataIndex: 'asset',
      render: (_: string, record: LendingAsset) => {
        return <TokenWithIcon token={record.token} />;
      },
    },
    {
      title: t('x-dex.swap.token.balance'),
      dataIndex: 'balance',
      render: (_: string, record: LendingAsset) => {
        return (
          <AmountWithPrice
            amount={record?.depositAmount}
            price={record?.depositTotalPrice}
          />
        );
      },
    },
    {
      title: t('x-lending.apy'),
      dataIndex: 'apy',
      render: (_: string, record) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>{record?.depositInterest}%</span>
          </div>
        );
      },
    },
    {
      title: t('x-lending.collateral'),
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
    {
      dataIndex: 'action',
      align: 'right',
      render: (_: string, record) => {
        const Buttons = (
          <div className="flex  flex-col gap-[5px] max-md:w-full max-md:flex-row max-md:gap-[20px]">
            <ResponsiveButton
              className="max-md:flex-1 md:text-left md:text-primary"
              onClick={() => {
                setDepositItem(record);
              }}
              disabled={!record.canCollateral || !record.erc20Balance}
            >
              {t('x-lending.supply')}
            </ResponsiveButton>
            <ResponsiveButton
              className="md:text-left md:text-primary"
              disabled={!record.depositAmount}
              onClick={() => {
                setWithdrawItem(record);
              }}
            >
              {t('x-lending.withdraw')}
            </ResponsiveButton>
          </div>
        );
        return (
          <>
            <div className="max-md:w-full md:hidden">{Buttons}</div>
            <div className="max-md:hidden">
              <Popover title={Buttons} trigger="click">
                <EllipsisOutlined className="cursor-pointer text-[20px]" />
              </Popover>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <LendingCard
      title="Your supplies"
      loading={loading}
      description={
        <div className="flex items-center gap-[10px] max-md:flex-wrap">
          <Button className="pointer-events-none rounded-[10px] text-tc-secondary">
            {`${t('x-dex.swap.token.balance')}: ${formatCurrency(depositTotalBalance)}`}
          </Button>
          <Button className="pointer-events-none rounded-[10px] text-tc-secondary">
            {`${t('x-lending.apy')}: ${depositTotalAPY}%`}
          </Button>
          <Button className="pointer-events-none rounded-[10px] text-tc-secondary">
            {`${t('x-dex.swap.token.balance')}: ${formatCurrency(depositTotalCollateralBalance)}`}
          </Button>
        </div>
      }
    >
      {depositItem && (
        <DepositModal
          asset={depositItem}
          onClose={() => {
            setDepositItem(undefined);
          }}
          refresh={() => {
            refetch();
            setDepositItem(undefined);
          }}
          userHealthFactor={health}
        />
      )}

      {withdrawItem && (
        <WithdrawModal
          asset={withdrawItem}
          onClose={() => {
            setWithdrawItem(undefined);
          }}
          refresh={() => {
            refetch();
            setWithdrawItem(undefined);
          }}
        />
      )}

      <ResponsiveTable
        columns={columns}
        dataSource={assets}
        size="middle"
        rowKey="id"
      />
    </LendingCard>
  );
};

export default Supplies;
