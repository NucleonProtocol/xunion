import { Area, AreaChart, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/Charts';

const chartData = [
  { month: 'Jan.', desktop: 10 },
  { month: 'Feb.', desktop: 40 },
  { month: 'Mar.', desktop: 70 },
  { month: 'Apr.', desktop: 90 },
  { month: 'May', desktop: 177 },
  { month: 'June', desktop: 299 },
  { month: 'July', desktop: 266 },
  { month: 'Aug.', desktop: 312 },
  { month: 'Sep.', desktop: 200 },
  { month: 'Oct.', desktop: 187 },
  { month: 'Nov.', desktop: 22 },
  { month: 'Dec.', desktop: 103 },
];
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const TVLLinear = () => {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" hideLabel />}
        />
        <Area
          dataKey="desktop"
          type="linear"
          fill="rgba(110, 93, 230, 0.4)"
          fillOpacity={0.4}
          stroke="#6E5DE6"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default TVLLinear;
