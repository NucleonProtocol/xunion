import { formatNumber } from '@/hooks/useErc20Balance.ts';

const HealthFactor = ({ value }: { value: string }) => {
  if (value) {
    if (Number(value) >= 10) {
      return <span className="text-status-success">Fine</span>;
    }
    if (Number(value) >= 2) {
      return (
        <span className="text-status-success">
          {formatNumber(Number(value), 2)}
        </span>
      );
    }
    if (Number(value) >= 1.5 && Number(value) < 2) {
      return (
        <span className="text-status-warning">
          {formatNumber(Number(value), 2)}
        </span>
      );
    }
    if (Number(value) < 1.5) {
      return (
        <span className="text-status-error">
          {formatNumber(Number(value), 2)}
        </span>
      );
    }
  }
  return <span>0</span>;
};

export default HealthFactor;
