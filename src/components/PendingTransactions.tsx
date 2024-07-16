import { Button } from 'antd';
import { SpinIcon } from '@/components/icons/tokens';
import useTxStore from '@/store/pending.ts';

const PendingTransactions = () => {
  const pendingTransactions = useTxStore((state) => state.pendingTransactions);
  return (
    <Button icon={<SpinIcon />} className="border-theme text-theme">
      <span>{pendingTransactions.length} pending</span>
    </Button>
  );
};

export default PendingTransactions;
