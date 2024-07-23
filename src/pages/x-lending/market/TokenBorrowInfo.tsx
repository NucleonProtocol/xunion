import LendingCard from '@/components/LendingCard.tsx';
import BorrowAPYLine from '@/pages/x-lending/market/charts/BorrowAPYLine.tsx';

const TokenBorrowInfo = () => {
  return (
    <LendingCard title="Borrow info" collapsible={false}>
      <BorrowAPYLine />
    </LendingCard>
  );
};

export default TokenBorrowInfo;
