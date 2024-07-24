import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';

import { ChartContainer, type ChartConfig } from '@/components/Charts';

const chartData = [
  { browser: 'safari', visitors: 3000, fill: 'var(--xunion-color-theme)' },
];
const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  safari: {
    label: 'Safari',
  },
} satisfies ChartConfig;

const TotalSupplyPie = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[85px] w-[100px]">
      <RadialBarChart
        data={chartData}
        endAngle={200}
        innerRadius={35}
        outerRadius={50}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-fill-niubi3 last:fill-fill-niubi"
          polarRadius={[38, 32]}
        />
        <RadialBar dataKey="visitors" background />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-theme text-[12px]"
                    >
                      7.25%
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
};

export default TotalSupplyPie;
