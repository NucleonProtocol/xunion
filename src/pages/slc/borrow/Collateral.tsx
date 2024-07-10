import { Button, Skeleton, Table } from 'antd';

import { TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import WithdrawModal from '@/pages/slc/borrow/WithdrawModal.tsx';
import ProvideModal from '@/pages/slc/borrow/ProvideModal.tsx';
import { useState } from 'react';
import useCollateral from '@/pages/slc/hooks/useCollateral.ts';
import { SLCAsset } from '@/types/slc.ts';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/es/table';

const Collateral = () => {
  const [withdrawItem, setWithdrawItem] = useState<SLCAsset>();
  const [providedItem, setProvidedItem] = useState<SLCAsset>();

  const { assets, loading } = useCollateral();

  const columns: ColumnType<SLCAsset>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
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
    {
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
