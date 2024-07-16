import { Button } from 'antd';
import useTxStore from '@/store/pending.ts';
import { SpinIcon } from '@/components/icons';

const PendingTransactions = () => {
  const pendingTransactions = useTxStore((state) => state.pendingTransactions);
  return (
    <Button icon={<SpinIcon />} className="border-theme text-theme">
      <span>{pendingTransactions.length} pending</span>
    </Button>
  );
};

export default PendingTransactions;
