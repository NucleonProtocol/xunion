import { ColumnType } from 'antd/es/table';
import { TokenIcon } from '@/components/icons';
import { Button, Skeleton, Tag } from 'antd';
import AssetsFilter from './AssetsFilter.tsx';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { LendingAsset } from '@/types/Lending.ts';
import ResponsiveTable from '@/components/ResponsiveTable.tsx';
import AmountWithPrice from '@/components/AmountWithPrice.tsx';

const AssetsList = ({
  assets,
  loading,
  onFilterChange,
}: {
  assets: LendingAsset[];
  loading: boolean;
  onFilterChange: (value: string) => void;
}) => {
  const navigate = useNavigate();

  const columns: ColumnType<LendingAsset>[] = [
    {
      title: 'Asset',
      dataIndex: 'name',
      width: 240,
      render: (_: string, record) => {
        return (
          <div className="flex  items-center gap-[10px] max-md:justify-end">
            <span>
              <TokenIcon src={record.token.icon} width={30} height={30} />
            </span>
            <div className="flex flex-col items-start gap-[2px] max-md:justify-end">
              <span className="max-md:text-right">{`Wrapped ${record.token.name}`}</span>
              <div className="flex gap-[5px]">
                <span className="text-[12px] text-tc-secondary">{`${record.token.symbol}`}</span>
                {record.lending_mode_num === '1' && (
                  <Tag color="error" className="flex gap-[3px]">
                    <span> Isolated</span>
                    <ExclamationCircleOutlined />
                  </Tag>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Total supplied',
      dataIndex: 'tvl',
      width: 240,
      align: 'center',
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
      title: 'Supply APY',
      dataIndex: 'volume24h',
      width: 240,
      align: 'center',
      render: (_: string, record: LendingAsset) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>{`${(record?.depositInterest || 1) < 1 ? '< ' : ''}${record.depositInterest}%`}</span>
          </div>
        );
      },
    },
    {
      title: 'Total borrowed',
      dataIndex: 'fees',
      align: 'center',
      render: (_: string, record: LendingAsset) => {
        return (
          <AmountWithPrice
            amount={record?.lendingAmount}
            price={record?.lendingTotalPrice}
          />
        );
      },
    },
    {
      title: 'Borrow APY, variable',
      dataIndex: 'apr',
      align: 'center',
      render: (_: string, record: LendingAsset) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>{`${(record?.lendingInterest || 1) < 1 ? '< ' : ''}${record.lendingInterest}%`}</span>
          </div>
        );
      },
    },
    {
      dataIndex: 'action',
      title: '',
      render: (_: string, record) => {
        return (
          <Button
            type="text"
            className="text-left text-primary "
            onClick={() => {
              navigate(`/x-lending/market/${record.token.address}?chainId=71`);
            }}
            icon={<EyeOutlined />}
          />
        );
      },
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <AssetsFilter onChange={onFilterChange} />
      <div className="bg-fill-niubi">
        {loading ? (
          <div className="p-[24px]">
            <Skeleton active />
          </div>
        ) : (
          <ResponsiveTable columns={columns} dataSource={assets} rowKey="id" />
        )}
      </div>
    </div>
  );
};

export default AssetsList;
