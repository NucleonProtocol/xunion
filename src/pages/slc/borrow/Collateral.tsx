import { Button, Skeleton, Table } from 'antd';
import { formatCurrency } from '@/utils';
import { Token } from '@/types/swap.ts';
import { TokenIcon } from '@/components/icons';

interface CollateralAsset extends Token {
  balance: {
    amount: number;
    price: number;
  };
  provided: {
    amount: number;
    price: number;
  };
  canBeCollateral: boolean;
}

const Collateral = ({
  assets,
  loading,
}: {
  assets: CollateralAsset[];
  loading: boolean;
}) => {
  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      render: (_: string, record: CollateralAsset) => {
        return (
          <div className="flex-center gap-[5px]">
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
          <div className="flex-center flex-col gap-[5px]">
            <span>{record?.balance?.amount}</span>
            <span>{record?.balance?.price}</span>
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
          <div className="flex-center flex-col gap-[5px]">
            <span>{record?.provided?.amount}</span>
            <span>{record?.provided?.price}</span>
          </div>
        );
      },
    },
    {
      key: 'action',
      title: 'Action',
      render: (_: string, __: CollateralAsset) => {
        return (
          <div className="flex-center flex-col gap-[5px]">
            <Button type="text" ghost className="text-theme" size="small">
              Withdraw
            </Button>
            <Button
              type="text"
              ghost
              className="text-theme"
              size="small"
              disabled
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

          <Table
            columns={columns}
            dataSource={assets}
            bordered={false}
            rowHoverable={false}
          />
        </div>
      )}
    </div>
  );
};

export default Collateral;
