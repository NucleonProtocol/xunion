import { useMemo } from 'react';
import { formatNumber } from '@/hooks/useErc20Balance.ts';

export interface ProgressSegment {
  label: string;
  percent: number;
  value: number;
  color?: string;
}

const segments: ProgressSegment[] = [
  { label: '0', percent: 0.004, value: 0, color: 'red' },
  { label: '1', percent: 0.25, value: 1, color: 'red' },
  { label: '2', percent: 0.5, value: 2 },
  { label: '10', percent: 0.75, value: 10 },
  { label: 'Fine', percent: 0.99, value: 10000, color: 'green' },
];

const useRiskProgress = ({
  userHealthFactor,
}: {
  userHealthFactor: number;
}) => {
  const userPercent = useMemo(() => {
    for (let i = 0; i < segments.length - 1; i++) {
      const startSegment = segments[i];
      const endSegment = segments[i + 1];

      if (
        userHealthFactor >= startSegment.value &&
        userHealthFactor <= endSegment.value
      ) {
        const rangeValue = endSegment.value - startSegment.value;
        const rangePercent = endSegment.percent - startSegment.percent;
        const valueInRange = userHealthFactor - startSegment.value;

        return formatNumber(
          startSegment.percent + (valueInRange / rangeValue) * rangePercent,
          1
        );
      }
    }
    return 1;
  }, [userHealthFactor, segments]);
  return {
    segments,
    userPercent,
  };
};

export default useRiskProgress;
