import BorrowModeSelector from '@/components/Borrow/BorrowModeSelector.tsx';
import HighLiquidityModal from '@/components/Borrow/HighLiquidityModal.tsx';
import useBorrowMode from '@/components/Borrow/useBorrowMode.ts';
import { BorrowModeType } from '@/types/slc.ts';
import RiskIsolationModal from '@/components/Borrow/RiskIsolationModal.tsx';
import { Abi, Address } from 'viem';

const options = [
  {
    label: 'High liquidity mode',
    description: 'Use high liquidity collateral for borrowing',
    value: BorrowModeType.HighLiquidity,
  },
  {
    label: 'Risk isolation mode',
    description: 'Only use one high-risk asset to borrow SLC',
    value: BorrowModeType.RiskIsolation,
  },
];
const BorrowMode = ({
  onSuccess,
  contact,
}: {
  onSuccess: () => void;
  contact: {
    abi: Abi;
    address: Address;
  };
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
      <BorrowModeSelector
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
