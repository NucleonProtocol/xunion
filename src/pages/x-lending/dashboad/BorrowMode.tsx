import EnableBorrowMode from '@/components/Borrow/EnableBorrowMode.tsx';

const BorrowMode = ({ refresh }: { refresh: () => void }) => {
  return (
    <div className="flex h-[84px] flex-col">
      <span className="flex h-[52px] items-center justify-end text-tc-secondary">
        Borrow mode
      </span>
      <div className="flex items-center gap-[10px] text-[16px]">
        <EnableBorrowMode onSuccess={refresh} />
      </div>
    </div>
  );
};

export default BorrowMode;
