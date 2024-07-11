import BorrowModeSelector from '@/components/BorrowMode/BorrowModeSelector.tsx';
import HighLiquidityModal from '@/components/BorrowMode/HighLiquidityModal.tsx';
import useBorrowMode from '@/components/BorrowMode/useBorrowMode.ts';
import { BorrowMode } from '@/types/slc.ts';
import RiskIsolationModal from '@/components/BorrowMode/RiskIsolationModal.tsx';

const options = [
  {
    label: 'High liquidity mode',
    description: 'Use high liquidity collateral for borrowing',
    value: BorrowMode.HighLiquidity,
  },
  {
    label: 'Risk isolation mode',
    description: 'Only use one high-risk asset to borrow SLC',
    value: BorrowMode.RiskIsolation,
  },
];
const EnableBorrowMode = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mode, effectiveMode, setMode } = useBorrowMode();
  return (
    <div>
      <HighLiquidityModal
        open={mode === BorrowMode.HighLiquidity}
        onClose={() => setMode(undefined)}
        onSuccess={onSuccess}
      />
      <RiskIsolationModal
        open={mode === BorrowMode.RiskIsolation}
        onClose={() => setMode(undefined)}
        onSuccess={onSuccess}
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

export default EnableBorrowMode;
