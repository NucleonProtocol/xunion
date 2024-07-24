import { Dot, Line, LineChart, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/Charts';

const chartData = [
  {
    browser: 'chrome',
    APY: 275,
    fill: 'var(--color-chrome)',
    percent: 11,
  },
  {
    browser: 'safari',
    APY: 200,
    fill: 'var(--color-safari)',
    percent: 34,
  },
  {
    browser: 'firefox',
    APY: 187,
    fill: 'var(--color-firefox)',
    percent: 62,
  },
  { browser: 'edge', APY: 173, fill: 'var(--color-edge)', percent: 77 },
  { browser: 'other', APY: 90, fill: 'var(--color-other)', percent: 87 },
];

const chartConfig = {
  APY: {
    label: 'APY',
    color: 'hsl(var(--chart-2))',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;
const InterestRateLine = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full pt-[20px]">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 24,
          left: 24,
          right: 24,
        }}
      >
        <XAxis
          dataKey="percent"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            return `${value}%`;
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent indicator="line" nameKey="APY" hideLabel />
          }
        />
        <Line
          dataKey="APY"
          type="natural"
          stroke="#E65D5D"
          strokeWidth={2}
          dot={({ payload, ...props }) => {
            return (
              <Dot
                key={payload.browser}
                r={5}
                cx={props.cx}
                cy={props.cy}
                fill={payload.fill}
                stroke={payload.fill}
              />
            );
          }}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default InterestRateLine;
