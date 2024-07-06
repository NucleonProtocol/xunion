import { Button, Skeleton, Table } from 'antd';

import { TokenIcon } from '@/components/icons';
import { SLCToken } from '@/contracts';
import { formatCurrency } from '@/utils';
import WithdrawModal from '@/pages/slc/borrow/WithdrawModal.tsx';
import ProvideModal from '@/pages/slc/borrow/ProvideModal.tsx';
import { useState } from 'react';
import { CollateralAsset } from '@/types/swap.ts';

const assetsMock: CollateralAsset[] = [
  {
    ...SLCToken,
    balance: {
      amount: 3,
      price: 120000,
    },
    provided: {
      amount: 2,
      price: 111111,
    },
    canBeCollateral: false,
  },
  {
    ...SLCToken,
    symbol: 'ETH',
    name: 'ETH',
    balance: {
      amount: 3,
      price: 120000,
    },
    provided: {
      amount: 2,
      price: 111111,
    },
    canBeCollateral: true,
  },
];

const Collateral = ({
  assets,
  loading,
}: {
  assets: CollateralAsset[];
  loading: boolean;
}) => {
  const [withdrawItem, setWithdrawItem] = useState<CollateralAsset>();
  const [providedItem, setProvidedItem] = useState<CollateralAsset>();
  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      render: (_: string, record: CollateralAsset) => {
        return (
          <div className="flex  gap-[5px]">
            <span>
              <TokenIcon src={record.icon} />
            </span>
            <span>{record?.symbol}</span>
          </div>
        );
      },
    },
    {
      key: 'balance',
      title: 'Wallet balance',
      dataIndex: 'balance',
      render: (_: string, record: CollateralAsset) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>{record?.balance?.amount}</span>
            <span>{formatCurrency(record?.balance?.price)}</span>
          </div>
        );
      },
    },
    {
      key: 'provided',
      title: 'Provided',
      dataIndex: 'balance',
      render: (_: string, record: CollateralAsset) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>{record?.provided?.amount}</span>
            <span>{formatCurrency(record?.provided?.price)}</span>
          </div>
        );
      },
    },
    {
      key: 'action',
      title: 'Action',
      render: (_: string, record: CollateralAsset) => {
        return (
          <div className="flex  gap-[5px]">
            <Button
              type="text"
              ghost
              className="text-theme"
              size="small"
              onClick={() => {
                setWithdrawItem(record);
              }}
            >
              Withdraw
            </Button>
            <Button
              type="text"
              ghost
              className="text-theme"
              size="small"
              disabled={record.canBeCollateral}
              onClick={() => {
                setProvidedItem(record);
              }}
            >
              Provide
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="w-full rounded-[16px] bg-fill-niubi">
      {loading ? (
        <div className="p-[24px]">
          <Skeleton active />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex h-[64px] items-center justify-between border-2 border-solid  border-transparent border-b-line-primary px-[24px]">
            <div className="flex-center gap-[30px]">
              <span className="font-[500]">Collateral</span>
            </div>
          </div>
          <WithdrawModal
            open={!!withdrawItem}
            onClose={() => setWithdrawItem(undefined)}
            asset={withdrawItem}
          />
          <ProvideModal
            open={!!providedItem}
            onClose={() => setProvidedItem(undefined)}
            asset={providedItem}
          />
          <Table
            columns={columns}
            dataSource={assetsMock || assets}
            bordered={false}
            rowHoverable={false}
            pagination={false}
            rowKey="name"
          />
        </div>
      )}
    </div>
  );
};

export default Collateral;
