"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";

const chartConfig = {
  sim1: {
    label: "투자 1",
    color: "#2563eb",
  },
  sim2: {
    label: "투자 2",
    color: "#60a5fa",
  },
  sim3: {
    label: "투자 3",
    color: "#a7acf5",
  },
} satisfies ChartConfig;

interface Props {
  simulationResult: Record<string, number>[];
}

export function AnalyzeChart({ simulationResult }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>투자 시나리오 차트</CardTitle>
        <CardDescription>연도별 누적 금액</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={simulationResult}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            {/* <YAxis allowDataOverflow={true} /> */}
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />

            <Line
              dataKey="sim1"
              type="monotone"
              stroke="var(--color-sim1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="sim2"
              type="monotone"
              stroke="var(--color-sim2)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="sim3"
              type="monotone"
              stroke="var(--color-sim3)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
