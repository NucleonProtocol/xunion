import BorrowModeDropdown from '@/components/Borrow/BorrowModeDropdown.tsx';
import HighLiquidityModal from '@/components/Borrow/HighLiquidityModal.tsx';
import useBorrowMode from '@/components/Borrow/useBorrowMode.ts';
import { BorrowModeType } from '@/types/slc.ts';
import RiskIsolationModal from '@/components/Borrow/RiskIsolationModal.tsx';
import { Abi, Address } from 'viem';
import HomogenousModal from '@/components/Borrow/HomogenousModal.tsx';

const BorrowMode = ({
  onSuccess,
  contact,
  options,
}: {
  onSuccess: () => void;
  contact: {
    abi: Abi;
    address: Address;
  };
  options: { label: string; description: string; value: BorrowModeType }[];
}) => {
  const { mode, effectiveMode, setMode } = useBorrowMode(contact);
  return (
    <div>
      <HighLiquidityModal
        open={mode === BorrowModeType.HighLiquidity}
        onClose={() => setMode(undefined)}
        onSuccess={onSuccess}
        contact={contact}
      />
      <RiskIsolationModal
        open={mode === BorrowModeType.RiskIsolation}
        onClose={() => setMode(undefined)}
        onSuccess={onSuccess}
        contact={contact}
      />
      <HomogenousModal
        open={mode === BorrowModeType.Homogenous}
        onClose={() => setMode(undefined)}
        onSuccess={onSuccess}
        contact={contact}
      />
      <BorrowModeDropdown
        options={options}
        value={effectiveMode}
        onChange={(mode) => {
          setMode(mode);
        }}
      />
    </div>
  );
};

export default BorrowMode;
