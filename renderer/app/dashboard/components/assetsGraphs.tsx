"use client"

import { TrendingUp } from "lucide-react"
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  LineChart,
  Line
} from "recharts"

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
  { browser: "savings", visitors: 496893, fill: "#F97316", percentage: "13%" },
  { browser: "mutualFundsNoOverlap", visitors: 898880, fill: "#FBBF24", percentage: "24%" },
  { browser: "mutualFundsOverlap", visitors: 1283110, fill: "#22C55E", percentage: "34%" },
  { browser: "retirement", visitors: 643000, fill: "#3B82F6", percentage: "17%" },
  { browser: "goldAndReceivables", visitors: 73000, fill: "#A855F7", percentage: "2%" },
  { browser: "others", visitors: 425000, fill: "#EC4899", percentage: "11%" },
]

const chartConfig = {
  savings: {
    label: "Savings Account",
    color: "#F97316",
  },
  mutualFundsNoOverlap: {
    label: "MF\n(No Overlap)",
    color: "#FBBF24",
  },
  retirement: {
    label: "Retirement Funds",
    color: "#3B82F6",
  },
  goldAndReceivables: {
    label: "Gold & Receivables",
    color: "#A855F7",
  },
  others: {
    label: "Others",
    color: "#EC4899",
  },
  mutualFundsOverlap: {
    label: "MF\n(With Overlap)",
    color: "#22C55E",
  },
} satisfies ChartConfig

// New data for stacked area chart from the image
const areaChartData = [
  { name: "Apr", "Savings A/c": 246893, "Stocks": 1911990, "Others": 440000 },
  { name: "May", "Savings A/c": 216893, "Stocks": 1941990, "Others": 450000 },
  { name: "Jun", "Savings A/c": 266893, "Stocks": 2021990, "Others": 460000 },
  { name: "Jul", "Savings A/c": 276893, "Stocks": 2111990, "Others": 470000 },
  { name: "Aug", "Savings A/c": 296893, "Stocks": 2211990, "Others": 493000 },
  { name: "Sept", "Savings A/c": 396893, "Stocks": 2291990, "Others": 493000 },
  { name: "Oct", "Savings A/c": 426893, "Stocks": 2301990, "Others": 493000 },
  { name: "Nov", "Savings A/c": 496893, "Stocks": 2181990, "Others": 498000 }
];

// Update the area colors to match the new categories
const areaColors = {
  "Savings A/c": "#10B981", // emerald-500
  "Stocks": "#3B82F6", // blue-500
  "Others": "#FBBF24" // yellow-400
};

// Add a custom Legend component with simpler styling
const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-300">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

// Add new data for XIRR comparison
const xirrData = [
  { month: "Apr", marketXIRR: 13.60, portfolioXIRR: 13.00 },
  { month: "May", marketXIRR: 13.90, portfolioXIRR: 14.10 },
  { month: "Jun", marketXIRR: 14.30, portfolioXIRR: 14.70 },
  { month: "Jul", marketXIRR: 15.10, portfolioXIRR: 14.70 },
  { month: "Aug", marketXIRR: 14.90, portfolioXIRR: 14.50 },
  { month: "Sep", marketXIRR: 15.30, portfolioXIRR: 14.30 },
  { month: "Oct", marketXIRR: 15.50, portfolioXIRR: 14.20 },
  { month: "Nov", marketXIRR: 15.60, portfolioXIRR: 14.70 }
];

export default function Component() {
  return (
    <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-1 w-full">
      {/* Add new XIRR Comparison Card */}
      <Card className="flex flex-col w-full bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader>
          <div className="flex justify-between w-full">
            <div className="w-full">
              <CardTitle className="text-emerald-400">Portfolio Performance</CardTitle>
              <CardDescription className="text-gray-400">XIRR Comparison</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={xirrData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  tickFormatter={(value) => `${value}%`}
                  domain={['dataMin - 1', 'dataMax + 1']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '0.75rem',
                    padding: '0.75rem'
                  }}
                  labelStyle={{ color: '#E5E7EB' }}
                  formatter={(value: number) => [`${value.toFixed(2)}%`]}
                />
                <Legend 
                  verticalAlign="top"
                  height={36}
                  content={({ payload }) => (
                    <div className="flex justify-center gap-6">
                      {payload?.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm text-gray-300">
                            {entry.value === 'marketXIRR' ? 'Market XIRR' : 'Portfolio XIRR'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="marketXIRR"
                  stroke="#9CA3AF"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#9CA3AF' }}
                />
                <Line
                  type="monotone"
                  dataKey="portfolioXIRR"
                  stroke="#F87171"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#F87171' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none text-red-400">
            Underperforming market by 0.9%
          </div>
          <div className="leading-none text-gray-400">
            Compare your portfolio performance against market benchmark
          </div>
        </CardFooter>
      </Card>

      {/* Existing Pie Chart Card */}
      <Card className="flex flex-col w-full bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader className="items-center pb-0 w-full">
          <div className="flex justify-between w-full">
            <div className="w-full">
              <CardTitle className="text-emerald-400">Assets Breakup</CardTitle>
              <CardDescription className="text-gray-400">September - October 2024</CardDescription>
            </div>
            <div className="font-bold text-emerald-400">
              ₹1,680.00
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[600px] pb-0 [&_.recharts-pie-label-text]:fill-gray-100"
          >
            <ResponsiveContainer width="100%" height={600}>
              <PieChart margin={{ top: 60, right: 150, bottom: 60, left: 160 }}>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={130}
                  cornerRadius={8}
                  paddingAngle={4}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius * 1.4;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    const anchor = x > cx ? 'start' : 'end';
                    
                    return (
                      <>
                        <text
                          x={x}
                          y={y - 14}
                          textAnchor={anchor}
                          dominantBaseline="central"
                          className="fill-gray-100 text-sm font-medium"
                        >
                          {chartConfig[name as keyof typeof chartConfig].label}
                        </text>
                        <text
                          x={x}
                          y={y + 6}
                          textAnchor={anchor}
                          dominantBaseline="central"
                          className="fill-gray-400 text-sm"
                        >
                          {(value / 3819883 * 100).toFixed(0)}%
                        </text>
                        <text
                          x={x}
                          y={y + 24}
                          textAnchor={anchor}
                          dominantBaseline="central"
                          className="fill-gray-400 text-sm"
                        >
                          ₹{value.toLocaleString()}
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
          <div className="flex items-center gap-2 font-medium leading-none text-emerald-400">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-gray-400">
            A breakup of all your assets
          </div>
        </CardFooter>
      </Card>

      {/* Enhanced Stacked Area Chart Card */}
      <Card className="flex flex-col w-full bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader>
          <div className="flex justify-between w-full">
            <div className="w-full">
              <CardTitle className="text-emerald-400">Assets Growth</CardTitle>
              <CardDescription className="text-gray-400">May - November 2024</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={areaChartData}
                margin={{ top: 10, right: 30, left: 50, bottom: 0 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#374151" 
                  vertical={false}
                />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  axisLine={{ stroke: '#374151' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  axisLine={{ stroke: '#374151' }}
                  tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '0.75rem',
                    padding: '0.75rem'
                  }}
                  labelStyle={{ color: '#E5E7EB', marginBottom: '0.5rem' }}
                  itemStyle={{ color: '#10B981', padding: '0.25rem 0' }}
                  formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
                  cursor={{ stroke: '#4B5563', strokeWidth: 1 }}
                />
                <Legend content={<CustomLegend />} />
                {Object.entries(areaColors).map(([key, color]) => (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stackId="1"
                    stroke={color}
                    fill={color}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  >
                    <LabelList
                      dataKey={key}
                      position="top"
                      content={({ x, y, value }) => (
                        <text
                          x={x}
                          y={y}
                          dy={-4}
                          fill={color}
                          fontSize={12}
                          textAnchor="middle"
                        >
                          ₹{(value/100000).toFixed(1)}L
                        </text>
                      )}
                    />
                  </Area>
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none text-emerald-400">
            <TrendingUp className="h-4 w-4" /> Overall growth of 15.2% in 6 months
          </div>
          <div className="leading-none text-gray-400">
            Track your assets growth over time
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}