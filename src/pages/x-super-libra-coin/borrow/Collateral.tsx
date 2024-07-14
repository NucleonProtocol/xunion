import { Button, Skeleton, Table } from 'antd';

import { TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import WithdrawModal from '@/pages/x-super-libra-coin/borrow/WithdrawModal.tsx';
import ProvideModal from '@/pages/x-super-libra-coin/borrow/ProvideModal.tsx';
import { useState } from 'react';
import useCollateral from '@/pages/x-super-libra-coin/hooks/useCollateral.ts';
import { SLCAsset } from '@/types/slc.ts';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/es/table';
import { useAccount } from 'wagmi';

const Collateral = ({ refresh }: { refresh: () => void }) => {
  const [withdrawItem, setWithdrawItem] = useState<SLCAsset>();
  const [providedItem, setProvidedItem] = useState<SLCAsset>();

  const { assets, loading } = useCollateral();

  const { address } = useAccount();

  const columns: ColumnType<SLCAsset>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      width: 240,
      render: (_: string, record: SLCAsset) => {
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
      width: 240,
      render: (_: string, record: SLCAsset) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>{record?.balance || 0}</span>
            <span>{formatCurrency(record?.balancePrice || 0)}</span>
          </div>
        );
      },
    },
    {
      key: 'provided',
      title: 'Provided',
      dataIndex: 'provided',
      width: 240,
      render: (_: string, record: SLCAsset) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>{record?.provided || 0}</span>
            <span>{formatCurrency(record?.providedPrice || 0)}</span>
          </div>
        );
      },
    },
    {
      key: 'canBeProvided',
      title: 'Can be provided',
      dataIndex: 'canBeProvided',
      align: 'center',
      render: (value: string) => {
        return value ? (
          <CheckCircleOutlined className="text-status-success" />
        ) : (
          <CloseCircleOutlined className="text-status-error" />
        );
      },
    },
  ];
  const actionColumn = {
    key: 'action',
    title: 'Action',
    render: (_: string, record: SLCAsset) => {
      return (
        <div className="flex  gap-[5px]">
          <Button
            type="text"
            ghost
            className="text-theme"
            size="small"
            disabled={!record.canBeWithdraw}
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
            disabled={!record.canBeProvided}
            onClick={() => {
              setProvidedItem(record);
            }}
          >
            Provide
          </Button>
        </div>
      );
    },
  };
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
            refresh={refresh}
          />
          <ProvideModal
            open={!!providedItem}
            onClose={() => setProvidedItem(undefined)}
            asset={providedItem}
            refresh={refresh}
          />
          <Table
            columns={address ? [...columns, actionColumn] : columns}
            dataSource={assets}
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
