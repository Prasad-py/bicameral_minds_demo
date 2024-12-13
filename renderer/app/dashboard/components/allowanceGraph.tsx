"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A multiple bar chart"

const chartData = [
	{ month: "January", total: 186, claimed: 80 },
	{ month: "February", total: 305, claimed: 200 },
	{ month: "March", total: 237, claimed: 120 },
	{ month: "April", total: 73, claimed: 190 },
	{ month: "May", total: 209, claimed: 130 },
	{ month: "June", total: 214, claimed: 140 },
]

const chartConfig = {
	total: {
		label: "total",
		color: "hsl(var(--chart-1))",
	},
	claimed: {
		label: "claimed",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig

export default function Component() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Allowances</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent>
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
							content={<ChartTooltipContent indicator="dashed" />}
						/>
						<Bar dataKey="total" fill="var(--color-total)" radius={4} />
						<Bar dataKey="claimed" fill="var(--color-claimed)" radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total allowances available vs claimed for the last 6 months
				</div>
			</CardFooter>
		</Card>
	)
}
