import { Skeleton } from 'antd';
import WithdrawModal from '@/pages/x-super-libra-coin/borrow/WithdrawModal.tsx';
import ProvideModal from '@/pages/x-super-libra-coin/borrow/ProvideModal.tsx';
import { useState } from 'react';
import useCollateral from '@/pages/x-super-libra-coin/hooks/useCollateral.ts';
import { SLCAsset } from '@/types/slc.ts';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/es/table';
import ResponsiveTable from '@/components/ResponsiveTable.tsx';
import TokenWithIcon from '@/components/TokenWithIcon.tsx';
import AmountWithPrice from '@/components/AmountWithPrice.tsx';
import ResponsiveButton from '@/components/ResponsiveButton.tsx';

const Collateral = ({ refresh }: { refresh: () => void }) => {
  const [withdrawItem, setWithdrawItem] = useState<SLCAsset>();
  const [providedItem, setProvidedItem] = useState<SLCAsset>();

  const { assets, loading } = useCollateral();

  const columns: ColumnType<SLCAsset>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      width: 240,
      align: 'right',
      render: (_: string, record: SLCAsset) => {
        return <TokenWithIcon token={record} />;
      },
    },
    {
      key: 'balance',
      title: 'Wallet balance',
      dataIndex: 'balance',
      width: 240,
      render: (_: string, record: SLCAsset) => {
        return (
          <AmountWithPrice
            amount={record?.balance}
            price={record?.balancePrice}
          />
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
          <AmountWithPrice
            amount={record?.provided}
            price={record?.providedPrice}
          />
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
      title: '',
      dataIndex: 'action',
      align: 'right',
      render: (_: string, record: SLCAsset) => {
        return (
          <div className="flex gap-[5px]">
            <ResponsiveButton
              disabled={!record.canBeWithdraw}
              onClick={() => {
                setWithdrawItem(record);
              }}
            >
              Withdraw
            </ResponsiveButton>
            <ResponsiveButton
              disabled={!record.canBeProvided}
              onClick={() => {
                setProvidedItem(record);
              }}
            >
              Provide
            </ResponsiveButton>
          </div>
        );
      },
    },
  ];
  return (
    <div className="w-full rounded-[16px] bg-fill-niubi">
      {loading ? (
        <div className="p-[24px] max-md:p-[16px]">
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
          <ResponsiveTable
            columns={columns}
            dataSource={assets}
            rowKey="name"
          />
        </div>
      )}
    </div>
  );
};

export default Collateral;
