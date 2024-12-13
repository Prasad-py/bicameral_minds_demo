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
	{ month: "January", total: 110000, taxed: 30000 },
	{ month: "February", total: 100000, taxed: 30000 },
	{ month: "March", total: 90000, taxed: 50000 },
	{ month: "April", total: 100000, taxed: 30000 },
	{ month: "May", total: 100000, taxed: 30000 },
	{ month: "June", total: 100000, taxed: 30000 },
]

const chartConfig = {
	total: {
		label: "Income",
		color: "hsl(var(--chart-2))",
	},
	taxed: {
		label: "Tax Payed",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig

export default function Component() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Taxes without bicameral</CardTitle>
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
						<Bar dataKey="taxed" fill="var(--color-taxed)" radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
                Showing total income vs tax payed without bicameral minds
				</div>
			</CardFooter>
		</Card>
	)
}
