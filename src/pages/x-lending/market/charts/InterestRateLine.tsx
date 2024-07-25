import { Line, LineChart, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/Charts';
import useBestLendingRate from '@/pages/x-lending/hooks/useBestLendingRate.ts';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const InterestRateLine = () => {
  const { depositInterestRates, lendingInterestRates } = useBestLendingRate();
  console.log('depositInterestRates', depositInterestRates);
  console.log('lendingInterestRates', lendingInterestRates);

  const chartData = depositInterestRates.slice(0, 95).map((item, index) => ({
    index: index + 1,
    dir: item,
    lir: lendingInterestRates[index],
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full pt-[20px]">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <XAxis
          dataKey="index"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="dir"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="lir"
          type="monotone"
          stroke="var(--color-mobile)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default InterestRateLine;
