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


import Income from '@/app/dashboard/components/expense'

import AllowanceGraph from '@/app/dashboard/components/allowanceGraph'
import IncomeGraph from '@/app/dashboard/components/incomeGraph'
import TaxSavingWithBicameralGraph from '@/app/dashboard/components/taxSavingWithBicameral'
import TaxSavingWithoutBicameralGraph from '@/app/dashboard/components/taxSavingWithoutBicameral'

import { Progress } from "@/components/ui/progress"
import Image from "next/image";
import { Search } from '@/components/search'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
// import { RecentSales } from './components/recent-sales'
// import { Overview } from '@/components/overview'

export default function IncomeSection() {
	const [progress, setProgress] = React.useState(13)
	const [incomeTransactions, setIncomeTransactions] = useState([
		{
			header: "Salary from TCS",
			progressBar: {
				length: 40,
				color: "green"
			},
			amount: "₹3,00,000.00",
			details: [
				{
					header: "Basic pay",
					amount: "₹51,000",
				},
				{
					header: "HRA",
					amount: "₹20,400"
				},
				{
					header: "Special Allowances",
					amount: "₹1,680.00"
				},
				{
					header: "Telecom Allowance",
					amount: "₹1,680.00",
					progressBar: {
						length: 40,
						color: "green"
					},
				},
				{
					header: "Food Allowance",
					amount: "₹1,680.00",
					progressBar: {
						length: 50,
						color: "green"
					},
				},
				{
					header: "Vehicle Allowance",
					amount: "₹1,680.00",
					progressBar: {
						length: 80,
						color: "green"
					},
				},
				{
					header: "Driver Salary Allowance",
					amount: "₹1,680.00",
					progressBar: {
						length: 80,
						color: "green"
					},
				},
				{
					header: "Gift Allowance",
					amount: "₹1,680.00",
					progressBar: {
						length: 10,
						color: "green"
					},
				},
				{
					header: "Professional Pursuit Allowance",
					amount: "₹1,680.00",
					progressBar: {
						length: 10,
						color: "green"
					},
				},
				{
					header: "Gadget Allowance",
					amount: "₹1,680.00",
					progressBar: {
						length: 20,
						color: "green"
					},
				},
				{
					header: "Leave Travel Allowance",
					amount: "₹1,680.00",
					progressBar: {
						length: 10,
						color: "green"
					},
				}
			]
		},
		{
			header: "Capital gains",
			amount: "₹40,300.83"
		},
		{
			header: "Consulting business",
			amount: "₹10,000.00"
		},
		{
			header: "Other sources",
			amount: "₹2,010.23"
		}
	])
	useEffect(() => {
		const timer = setTimeout(() => setProgress(66), 2500)
		return () => clearTimeout(timer)
	}, [])
	return (
		<div className='space-y-4'>
			<div className='px-[60px] border py-[20px] rounded-[10px]'>
				<h1 className='text-xl font-bold tracking-tight'>Submit to reduce taxes</h1>
				<p className='text-[14px] font-medium text-gray-400'>Review and submit below transaction to get Tax excemption</p>
				<div className='flex justify-center'>
					<Carousel className="w-full">
						<CarouselContent>
							{Array.from({ length: 5 }).map((_, index) => (
								<CarouselItem key={index}>
									<div className="p-1">
										<div className='p-[30px] px-[50px] bg-green-200 rounded-[20px] my-[20px]'>
											<div className='flex justify-center gap-5 items-center'>
												<div className='flex justify-center w-[50%]'>
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="chatgpt" width={200}
														height={200}>
														<path fill="#67a090" fill-rule="evenodd" d="m60,12c0-4.42-3.58-8-8-8H12c-4.42,0-8,3.58-8,8v40c0,4.42,3.58,8,8,8h40c4.42,0,8-3.58,8-8V12h0Z"></path>
														<path fill="#fff" fill-rule="evenodd" d="m19.6,18.63c-7.88,1.09-10.82,11.17-5.88,16.95-1.18,3.49.16,7.91,2.94,10.95,2.72,2.97,6.71,4.59,10.81,2.96.03.25.13.5.29.72,2.34,3.07,6.8,3.58,10.7,2.07,3.11-1.2,5.78-3.63,6.68-6.73,2.64-.76,4.85-2.85,6.13-5.48,1.79-3.7,1.74-8.39-1.34-11.68.1-.19.18-.38.24-.54,1.03-2.86.36-6.18-1.44-8.84-2.39-3.53-6.7-5.87-11.27-4.56-.1-.13-.2-.25-.29-.37-2.32-3.04-6.73-3.8-10.6-2.61-3.45,1.06-6.37,3.63-6.98,7.15h0Zm19.59,13.41l.07,9.81c0,.51-.25.99-.69,1.27,0,0-4.63,2.99-8.56,5.11.05.05.09.1.14.16,1.57,2.06,4.61,2.1,7.23,1.09,2.69-1.04,5.07-3.26,5.07-6.18v-9.18l-3.28-2.09h0Zm-22.88,5.71c-.24,2.29.85,4.87,2.57,6.75,2,2.18,4.97,3.46,7.99,1.98,3.19-1.55,7.69-4.36,9.39-5.44l-.02-2.96-8.97,4.9c-.43.23-.94.25-1.37.03,0,0-5.74-2.78-9.59-5.28h0Zm28.47-5.72c.43.28.69.75.69,1.27v8.9c1.33-.73,2.41-1.98,3.11-3.43,1.48-3.06,1.31-7.1-2.08-9.38-2.86-1.93-6.56-4.13-8.11-5.04l-3.07,1.68,9.45,6.01h0Zm-25.28-10.34c-5.77,1.28-7.26,9.69-2.03,13.22,2.93,1.98,7.36,4.23,9.05,5.07l3.13-1.71-9.45-6.02c-.43-.27-.69-.75-.69-1.26v-9.3h0Zm12.82,5.97s-3.5,1.91-3.53,1.93v4.59l3.86,2.46s3.52-1.92,3.57-1.94l-.03-4.57-3.86-2.46h0Zm2.31-11.97c-1.64-1.89-4.59-2.13-7.15-1.34-2.64.81-4.98,2.78-4.98,5.65v10.18l3.28,2.09-.08-10.82c0-.54.28-1.04.75-1.31,0,0,4.31-2.49,8.18-4.45h0Zm12.87,10.75c.51-1.89-.06-4-1.23-5.73-1.91-2.81-5.49-4.68-9.17-2.89-3.09,1.51-6.82,3.6-8.39,4.49l.03,3.9,8.97-4.9c.46-.25,1.02-.24,1.47.02,0,0,4.62,2.67,8.33,5.11h0Z"></path>
													</svg>
												</div>
												<div className='w-[50%] flex-col justify-center'>
													<div className='flex items-center justify-between w-[100%] px-[20px] py-[10px] bg-white rounded-[10px]'>
														<div>
															<h1 className='text-[24px] font-bold'>Opena AI</h1>
															<p className='text-[14px]'>ChatGPT Subscription</p>
														</div>
														<div>
															<p className='text-[18px] font-bold'>
																₹ 1,680
															</p>
															<p className='text-[12px]'>
																Oct 1, 2024
															</p>
														</div>
													</div>
													<div className='px-[20px] py-[10px] mt-[40px]'>
														<div className='flex justify-between w-full items-center'>
															<h2 className='py-[10px]rounded-[10px]'>Expense Category</h2>
															<Select>
																<SelectTrigger className="w-[300px]">
																	<SelectValue placeholder="Educational & Professional" />
																</SelectTrigger>
																<SelectContent>
																	<SelectGroup>
																		<SelectItem value="1">Educational & Professional</SelectItem>
																		<SelectItem value="2">Educational & Professional</SelectItem>
																		<SelectItem value="3">Educational & Professional</SelectItem>
																		<SelectItem value="4">Educational & Professional</SelectItem>
																		<SelectItem value="5">Educational & Professional</SelectItem>
																	</SelectGroup>
																</SelectContent>
															</Select>
														</div>
														<div className='flex justify-between w-full mt-[20px] items-center'>
															<h2>Flexi Benefit Category</h2>
															<Select>
																<SelectTrigger className="w-[300px]">
																	<SelectValue placeholder="Professional Persuit" />
																</SelectTrigger>
																<SelectContent>
																	<SelectGroup>
																		<SelectItem value="1">Professional Persuit</SelectItem>
																		<SelectItem value="2">Professional Persuit</SelectItem>
																		<SelectItem value="3">Professional Persuit</SelectItem>
																		<SelectItem value="4">Professional Persuit</SelectItem>
																		<SelectItem value="5">Professional Persuit</SelectItem>
																	</SelectGroup>
																</SelectContent>
															</Select>
														</div>
														<div className='p-[20px] justify-center flex gap-[20px] mt-[20px]'>
															<Button className='bg-white text-black hover:text-black hover:bg-gray-100 border-black border-[1px]'>Cancel</Button>
															<Button className='bg-green-700'>Submit</Button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</div>
			<div>
				<div className='flex justify-between mb-[40px]'>
					<div className='w-[30%]'></div>
					<div className='w-[40%] flex justify-center'>
						<Tabs defaultValue="monthly" className='w-[50%]'>
							<TabsList className='w-full'>
								<TabsTrigger className='w-[50%]' value="monthly">Monthly</TabsTrigger>
								<TabsTrigger className='w-[50%]' value="yearly">Yearly</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
					<div className='w-[30%] flex justify-end'>
						<Select>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="October'24" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="January">January</SelectItem>
									<SelectItem value="Febraury">Febraury</SelectItem>
									<SelectItem value="March">March</SelectItem>
									<SelectItem value="April">April</SelectItem>
									<SelectItem value="May">May</SelectItem>
									<SelectItem value="June">June</SelectItem>
									<SelectItem value="July">July</SelectItem>
									<SelectItem value="August">August</SelectItem>
									<SelectItem value="September">September</SelectItem>
									<SelectItem value="October">October</SelectItem>
									<SelectItem value="November">November</SelectItem>
									<SelectItem value="December">December</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2 mt-[20px]'>
					{/* <Card className=''>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Total Income
							</CardTitle>
							<span>₹</span>
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>₹3,40,000</div>
							<p className='text-xs text-muted-foreground'>
								+10.1% from last month
							</p>
						</CardContent>
					</Card> */}
					<TaxSavingWithoutBicameralGraph />
					<TaxSavingWithBicameralGraph />
				</div>
				<div className='grid grid-cols-1 gap-4 mt-[20px]'>
					<Card className='col-span-1 lg:col-span-4 '>
						<CardHeader>
							<CardTitle>
								Transactions
							</CardTitle>
						</CardHeader>
						<CardContent className='px-[40px] mt-[20px]'>
							{incomeTransactions.map(transaction => (
								<Card className='px-[30px] items-center p-4 rounded-[10px] cursor-pointer bg-white mb-[20px]'>
									<Accordion type="single" collapsible>
										<AccordionItem value="item-1" className='border-[0px]'>
											<AccordionTrigger>
												<div className='flex justify-between w-[95%] items-center'>
													<div className='w-1/2'>
														<h1 className='mb-2 text-left font-medium text-[16px]'>
															{transaction.header}
														</h1>
														{transaction.progressBar && (<Progress value={transaction.progressBar.length} className="w-full" />)}
													</div>
													<div className='w-1/2 text-right font-medium text-[16px]'>
														<span>{transaction.amount}</span>
													</div>
												</div>
											</AccordionTrigger>
											<div className='w-full px-[20px]'>
												<AccordionContent>
													{transaction.details && transaction.details.map(dt => (
														<div className='flex justify-between px-[30px] items-center p-4 bg-grayblue-50 rounded-[10px] mt-[20px]'>
															<div className='w-1/2'>
																<h1 className='mb-2'>
																	{dt.header}
																</h1>
																{dt.progressBar && (<Progress value={dt.progressBar.length} className="w-full" />)}
															</div>
															<div className='w-1/2 text-right'>{dt.amount}</div>
														</div>
													))}
												</AccordionContent>
											</div>

										</AccordionItem>
									</Accordion>
								</Card>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}