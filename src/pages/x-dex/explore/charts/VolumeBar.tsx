import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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

const VolumeBar = () => {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="desktop" fill="#6E5DE6" radius={8} />
      </BarChart>
    </ChartContainer>
  );
};

export default VolumeBar;
