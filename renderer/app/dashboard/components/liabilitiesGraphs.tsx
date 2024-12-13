"use client"

import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a label"

const chartData = [
  { browser: "credits", visitors: 275, fill: "#F97316", percentage: "42%" },
  { browser: "payables", visitors: 200, fill: "#FBBF24", percentage: "31%" },
  { browser: "loans", visitors: 187, fill: "#22C55E", percentage: "27%" },
]

const chartConfig = {
  credits: {
    label: "Credit Cards",
    color: "#F97316",
  },
  payables: {
    label: "Payables",
    color: "#FBBF24",
  },
  loans: {
    label: "Loans",
    color: "#22C55E",
  },
} satisfies ChartConfig

export default function LiabilitiesGraphs() {
  return (
    <Card className="flex flex-col w-full bg-gray-800 border-gray-700 text-gray-100">
      <CardHeader className="items-center pb-0 w-full">
        <div className="flex justify-between w-full">
          <div className="w-full">
            <CardTitle className="text-emerald-400">Total Liabilities</CardTitle>
            <CardDescription className="text-gray-400">September - October 2024</CardDescription>
          </div>
          <div className="font-bold text-emerald-400">
            ₹50,680.00
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px] pb-0 [&_.recharts-pie-label-text]:fill-gray-100"
        >
          <ResponsiveContainer width="100%" height={400}>
            <PieChart margin={{ top: 40, right: 20, bottom: 40, left: 80 }}>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                cornerRadius={8}
                paddingAngle={4}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius * 1.6;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  const anchor = x > cx ? 'start' : 'end';
                  
                  return (
                    <>
                      <text
                        x={x}
                        y={y}
                        textAnchor={anchor}
                        dominantBaseline="central"
                        className="fill-gray-100 text-sm font-medium"
                      >
                        {chartConfig[name as keyof typeof chartConfig].label}
                      </text>
                      <text
                        x={x}
                        y={y + 20}
                        textAnchor={anchor}
                        dominantBaseline="central"
                        className="fill-gray-400 text-sm"
                      >
                        {(value / 662 * 100).toFixed(0)}%
                      </text>
                    </>
                  );
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill} 
                    strokeWidth={0}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-gray-400">
          A breakup of all your liabilities
        </div>
        <div className="text-emerald-400 text-sm">
          Trending down by 3.2% this month
        </div>
      </CardFooter>
    </Card>
  )
}