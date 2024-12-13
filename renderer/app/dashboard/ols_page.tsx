// import { Layout } from '@/components/custom/layout'
"use client"
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup
} from "@/components/ui/select"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import React, { useState, useEffect, memo } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import IncomeSection from '@/app/dashboard/components/income'
import ExpenseSection from '@/app/dashboard/components/expense'
import AssetsSection from '@/app/dashboard/components/assets'
import LiabilitiesSection from '@/app/dashboard/components/liabilities'

import { Progress } from "@/components/ui/progress"
import Image from "next/image";
import { Search } from '@/components/search'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
// import { RecentSales } from './components/recent-sales'
import { Overview } from '@/components/overview'

export default function Dashboard() {

	const [progress, setProgress] = React.useState(13)
	const [transactionToSave, setTransactionsToSave] = useState([
		{

		}
	])
	useEffect(() => {
		const timer = setTimeout(() => setProgress(66), 2500)
		return () => clearTimeout(timer)
	}, [])
	return (
		<div className='p-[24px] px-[80px]'>
			<div className='flex justify-between items-center mb-10'>
				<div className='w-[20%]'>

				</div>
				<div className='w-[60%]'>
					<Search />
				</div>
				<div className='w-[20%] flex justify-end'>
					<UserNav />
				</div>
			</div>

			<div>
				<div className='mb-2 flex items-center justify-between space-y-2 mt-[20px]'>
					<h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
					<div className='flex items-center space-x-2'>

					</div>
				</div>
				<Tabs
					orientation='vertical'
					defaultValue='income'
					className='space-y-12 py-[0px]'
				>
					<div className='w-full overflow-x-auto pt-1'>
						<TabsList className="py-[30px] w-full">
							<TabsTrigger className="px-[100px] py-[15px]" value='income'>Income</TabsTrigger>
							<TabsTrigger className="px-[100px] py-[15px]" value='expense'>Expense</TabsTrigger>
							<TabsTrigger className="px-[100px] py-[15px]" value='assets'>Assets</TabsTrigger>
							<TabsTrigger className="px-[100px] py-[15px]" value='liabilities'>Liabilities</TabsTrigger>
						</TabsList>
					</div>
					<TabsContent value='income' className='space-y-4'>
						<IncomeSection />
					</TabsContent>
					<TabsContent value='expense' className='space-y-4'>
						<ExpenseSection />
					</TabsContent>
					<TabsContent value='assets' className='space-y-4'>
						<AssetsSection />
					</TabsContent>
					<TabsContent value='liabilities' className='space-y-4'>
						<LiabilitiesSection />
					</TabsContent>
				</Tabs>


			</div>
		</div>
	)
}
