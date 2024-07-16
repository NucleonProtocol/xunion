import LendingCard from '@/components/LendingCard.tsx';
import { Button, Checkbox, Table } from 'antd';
import { useAccount } from 'wagmi';
import useSupplies from '@/pages/x-lending/hooks/useSupplies.ts';
import { ColumnType } from 'antd/es/table';
import { SLCAsset } from '@/types/slc.ts';
import { TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const AssetsToSupply = () => {
  const { address } = useAccount();
  const { tokens, loading } = useSupplies();
  const columns: ColumnType<SLCAsset>[] = [
    {
      key: 'Asset',
      title: 'Asset',
      dataIndex: 'asset',
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
      title: 'Balance',
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
      key: 'apy',
      title: 'APY',
      dataIndex: 'apy',
      render: (_: string, __: SLCAsset) => {
        return (
          <div className="flex flex-col gap-[5px]">
            <span>10.2%</span>
          </div>
        );
      },
    },
    {
      key: 'Collateral',
      title: 'Collateral',
      dataIndex: 'collateral',
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
    title: '',
    render: (_: string, __: SLCAsset) => {
      return (
        <div className="flexgap-[5px]">
          <Button
            type="primary"
            className="rounded-[8px] text-[12px]"
            size="small"
            onClick={() => {}}
          >
            Supply
          </Button>
        </div>
      );
    },
  };
  return (
    <LendingCard
      loading={loading}
      title="Assets to supply"
      description={
        <div className="flex items-center gap-[5px]">
          <Checkbox />
          <span>Show 0 balance assets</span>
        </div>
      }
    >
      <Table
        columns={address ? [...columns, actionColumn] : columns}
        dataSource={tokens.slice(0, 4) as SLCAsset[]}
        bordered={false}
        rowHoverable={false}
        pagination={false}
        rowKey="name"
        size="middle"
      />
    </LendingCard>
  );
};

export default AssetsToSupply;
