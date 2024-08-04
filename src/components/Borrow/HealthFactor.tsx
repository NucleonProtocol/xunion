import { formatNumber } from '@/hooks/useErc20Balance.ts';
import { useTranslate } from '@/i18n';

const HealthFactor = ({ value }: { value: string }) => {
  const { t } = useTranslate();
  if (value) {
    if (Number(value) >= 10) {
      return (
        <span className="text-status-success">
          {t('x-lending.health.fine')}
        </span>
      );
    }
    if (Number(value) >= 2) {
      return (
        <span className="text-status-success">
          {formatNumber(Number(value), 4)}
        </span>
      );
    }
    if (Number(value) >= 1.5 && Number(value) < 4) {
      return (
        <span className="text-status-warning">
          {formatNumber(Number(value), 4)}
        </span>
      );
    }
    if (Number(value) < 1.5) {
      return (
        <span className="text-status-error">
          {formatNumber(Number(value), 4)}
        </span>
      );
    }
  }
  return <span>0</span>;
};

export default HealthFactor;
