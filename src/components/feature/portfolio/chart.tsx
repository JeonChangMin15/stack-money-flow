'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { AssetResult } from '@/types/type';

interface Props {
  assetResult: AssetResult[];
}

export function AssetPieChart({ assetResult }: Props) {
  const chartData = React.useMemo(() => {
    return assetResult
      .map(({ name, total }, idx) => {
        const chartIndex = (idx % 5) + 1; // 0→1, 1→2, …, 5→1 반복
        return {
          name,
          total,
          fill: `hsl(var(--chart-${chartIndex}))`,
        };
      })
      .sort((a, b) => a.total - b.total);
  }, [assetResult]);

  const chartConfig = React.useMemo<ChartConfig>(() => {
    const cfg: ChartConfig = { total: { label: '총 자산' } };
    assetResult.forEach(({ name }, idx) => {
      const chartIndex = (idx % 5) + 1;
      cfg[name] = {
        label: name,
        color: `hsl(var(--chart-${chartIndex}))`,
      };
    });
    return cfg;
  }, [assetResult]);

  const totalSum = React.useMemo(
    () => chartData.reduce((sum, e) => sum + e.total, 0),
    [chartData]
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>포트폴리오 차트</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="name"
              innerRadius={65}
              strokeWidth={5}
            >
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
                          className="fill-foreground text-base font-bold"
                        >
                          {totalSum.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          총 자산
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
