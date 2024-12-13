// // "use client";
// // import React, { useState, useEffect, memo } from "react";
// // import { useRouter } from 'next/navigation';
// // import { Input } from '@/components/ui/input'
// // import bicameralLogo from "@/public/images/bicameral-logo.svg";
// // import ruppeeLogo from "@/public/images/ruppee.png";
// // import taxMoneyLogo from "@/public/images/taxMoney.png";
// // import taxExemptLogo from "@/public/images/taxExempt.png";
// // import taxSheetLogo from "@/public/images/taxSheet.png";
// // import deductionsLogo from "@/public/images/deductions.png";
// // import employerBenefitsLogo from "@/public/images/employerBenefits.png";
// // import { Checkbox } from "@/components/ui/checkbox"
// // import { CircleMinus, CircleCheckBig, BadgeCheck } from "lucide-react"

// // import CustomizeCTC from "@/app/onboarding/components/CustomizeCTC"
// // import InHand from "@/app/onboarding/components/InHand"
// // import ViewGross from "@/app/onboarding/components/ViewGross"
// // import ViewTaxes from "@/app/onboarding/components/ViewTaxes"
// // import ViewAssets from "@/app/onboarding/components/ViewAssets"
// // import EmployerContribution from "@/app/onboarding/components/EmployerContribution"
// // import OtpInput from 'react18-input-otp';
// // import { Button } from '@/components/ui/button'
// // import {
// // 	Dialog,
// // 	DialogContent,
// // 	DialogDescription,
// // 	DialogFooter,
// // 	DialogHeader,
// // 	DialogTitle,
// // 	DialogTrigger,
// // 	DialogClose
// // } from "@/components/ui/dialog"
// // import {
// // 	Select,
// // 	SelectContent,
// // 	SelectItem,
// // 	SelectTrigger,
// // 	SelectValue,
// // 	SelectGroup
// // } from "@/components/ui/select"
// // import {
// // 	Accordion,
// // 	AccordionContent,
// // 	AccordionItem,
// // 	AccordionTrigger,
// // } from "@/components/ui/accordion"
// // import {
// // 	Sheet,
// // 	SheetClose,
// // 	SheetContent,
// // 	SheetDescription,
// // 	SheetFooter,
// // 	SheetHeader,
// // 	SheetTitle,
// // 	SheetTrigger,
// // } from "@/components/ui/sheet"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// // import Link from 'next/link';
// // import { TypeAnimation } from "react-type-animation";
// // import Image from "next/image";

// // export default function Home() {
// // 	const router = useRouter();
// // 	const steps = [
// // 		{
// // 			id: 1,
// // 			status: "ongoing",
// // 			header: "Confirm company details",
// // 			para: "Based on your company data, we have fetched your work email. Please confirm the below details",
// // 			rightHeader: "Confirm company details",
// // 			rightPara: "Based on your company data, we have fetched your work email. Please confirm the below details",
// // 			image: ""
// // 		},
// // 		{
// // 			id: 2,
// // 			status: "pending",
// // 			header: "Current Salary",
// // 			para: "Below is your current salary structure.",
// // 			rightHeader: "My Current Salary",
// // 			rightPara: "You are currently paying a lot of taxes",
// // 		},
// // 		{
// // 			id: 3,
// // 			status: "pending",
// // 			header: "Optimised Salary",
// // 			para: "Below is your current salary structure.",
// // 			rightHeader: "Your optimised salary",
// // 			rightPara: "Your tax savings through us will be",
// // 		}
// // 	];


// // 	const getStatusSVG = (step) => {
// // 		if (step.status === "ongoing") {
// // 			return (
// // 				<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 bg-emerald-50 border-emerald-500 border-[2px] rounded-[50px] p-2 text-white" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
// // 					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
// // 				</svg>
// // 			)
// // 		}
// // 		if (step.status === "completed") {
// // 			return (
// // 				<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 bg-emerald-500 border-emerald-500 border-[2px] rounded-[50px] p-2 text-white" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
// // 					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
// // 				</svg>
// // 			)
// // 		}
// // 		if (step.status === "pending") {
// // 			return (
// // 				<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 bg-white border-gray-300 border-[2px] rounded-[50px] p-2 text-white" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
// // 					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
// // 				</svg>
// // 			)
// // 		}
// // 	}

// // 	const [otp, setOtp] = useState('');

// // 	const [showOtpScreen, setShowOtpScreen] = useState(false);

// // 	const [showRegimeCompare, setShowRegimeCompare] = useState(false);
// // 	const [showOptimiseSalaryScreen, setShowOptimiseSalaryScreen] = useState(false);

// // 	const [timeFrame, setTimeFrame] = useState("yearly")

// // 	const [optimisedTimeFrame, setOptimisedTimeFrame] = useState("yearly")

// // 	const [component, setComponent] = useState({
// // 		currentSalary: {
// // 			monthly: {
// // 				totalCtc: 170000,
// // 				grossSalary: 167000,
// // 				basicPay: 90000,
// // 				hra: 45000,
// // 				specialAllowances: 32000,
// // 				deductions: 1800,
// // 				pf: 1800,
// // 				taxes: 25437,
// // 				incomeTax: 25237,
// // 				professionalTax: 200,
// // 				netSalary: 141563,
// // 				inHandSalary: 139763,
// // 				employerBenefits: 3000,
// // 				pfEmployer: 1800,
// // 				gratuity: 700,
// // 				healthInsurance: 500
// // 			},
// // 			yearly: {
// // 				totalCtc: 2040000,
// // 				grossSalary: 2004000,
// // 				basicPay: 1080000,
// // 				hra: 540000,
// // 				specialAllowances: 384000,
// // 				telecomAllowance: null,
// // 				foodAllowance: null,
// // 				vehicleAllowance: null,
// // 				driverSalaryAllowance: null,
// // 				leaveTravelAllowance: null,
// // 				professionalPursuitAllowance: null,
// // 				gadgetAllowance: null,
// // 				giftAllowance: null,
// // 				deductions: 21600,
// // 				pf: 21600,
// // 				taxes: 305248,
// // 				incomeTax: 302848,
// // 				professionalTax: 2400,
// // 				netSalary: 1698752,
// // 				inHandSalary: 1677152,
// // 				employerBenefits: 36000,
// // 				pfEmployer: 21600,
// // 				gratuity: 8400,
// // 				healthInsurance: 6000,
// // 				fullTaxable: 1812000,
// // 				fullTaxExempt: 192000,
// // 				assetCreationInvestment: 21600
// // 			},
// // 		},
// // 		optimiseSalary: {
// // 			monthly: {
// // 				totalCtc: 170000,
// // 				grossSalary: 167000,
// // 				basicPay: 51000,
// // 				hra: 20400,
// // 				specialAllowances: 65017,
// // 				telecomAllowance: 3000,
// // 				foodAllowance: 2200,
// // 				vehicleAllowance: 2400,
// // 				driverSalaryAllowance: 900,
// // 				leaveTravelAllowance: 5000,
// // 				professionalPursuitAllowance: 8333,
// // 				gadgetAllowance: 8333,
// // 				giftAllowance: 417,
// // 				deductionsFromGross: 6120,
// // 				pf: 6120,
// // 				taxes: 11172,
// // 				incomeTax: 10972,
// // 				professionalTax: 200,
// // 				netSalary: 149708,
// // 				employerBenefits: null,
// // 				pfEmployer: 1800,
// // 				gratuity: 700,
// // 				healthInsurance: 500
// // 			},
// // 			yearly: {
// // 				totalCtc: 2040000,
// // 				grossSalary: 2004000,
// // 				basicPay: 612000,
// // 				hra: 244800,
// // 				specialAllowances: 780200,
// // 				telecomAllowance: 36000,
// // 				foodAllowance: 26400,
// // 				vehicleAllowance: 28800,
// // 				driverSalaryAllowance: 10800,
// // 				leaveTravelAllowance: 60000,
// // 				professionalPursuitAllowance: 100000,
// // 				gadgetAllowance: 100000,
// // 				giftAllowance: 5000,

// // 				deductionsFromGross: 73440,
// // 				pf: 73440,
// // 				taxes: 134064,
// // 				incomeTax: 131664,
// // 				professionalTax: 2400,
// // 				netSalary: 1869936,
// // 				inHandSalary: 1787136,
// // 				employerBenefits: 36000,
// // 				pfEmployer: 21600,
// // 				gratuity: 8400,
// // 				healthInsurance: 6000,
// // 				fullTaxable: 1398200,
// // 				fullTaxExempt: 605800,
// // 				assetCreationInvestment: 82800
// // 			},
// // 		}
// // 	});

// // 	const handleOtp = (enteredOtp) => {
// // 		setOtp(enteredOtp);
// // 	};

// // 	const formatAmount = (amount) => {
// // 		return new Intl.NumberFormat('en-IN', {
// // 			style: 'currency',
// // 			currency: 'INR',
// // 			minimumFractionDigits: 2
// // 		}).format(amount);
// // 	};

// // 	const [onboardingSteps, setOnboardingSteps] = useState(steps)

// // 	const [currentOnboardingStep, setCurrentOnboardingStep] = useState(steps[0])

// // 	const setOnboardingStepsAndAll = (currentStep, direction) => {
// // 		const index = onboardingSteps.findIndex(step => step.id === currentStep.id)
// // 		const steps = onboardingSteps
// // 		steps[index].status = direction === "next" ? "completed" : "pending"
// // 		const newIndex = direction === "next" ? index + 1 : index - 1
// // 		if (newIndex === steps.length) {
// // 			router.push('/optimisectc');
// // 		}
// // 		setOnboardingSteps([...steps])
// // 		setCurrentOnboardingStep({ ...steps[newIndex] })
// // 	}

// // 	const [name, setName] = useState("Ashwani Kumar")
// // 	const [isExpanded, setIsExpanded] = useState(false);

// // 	const toggleExpand = () => {
// // 		setIsExpanded(!isExpanded);
// // 	};

// // 	const [workEmail, setWorkEmail] = useState("ashwani@bicameralminds.com")

// // 	return (
// // 		<div className="flex">
// // 			<div className="w-[30%] bg-grayblue-100 py-[20px] px-[20px] flex flex-col fixed h-full">
// // 				<div className="flex justify-center mt-[20px]">
// // 					<Image
// // 						priority
// // 						src={bicameralLogo}
// // 						alt="Follow us on Twitter"
// // 						width={70}
// // 					/>
// // 				</div>
// // 				<div className="flex-col justify-center mt-[70px] ml-[20px] items-center gap-4">
// // 					{onboardingSteps.map((step, index) => (
// // 						<div className="">
// // 							<div className="flex gap-4 items-center">
// // 								<div>
// // 									{getStatusSVG(step)}
// // 								</div>
// // 								<div>
// // 									<h3 className={`text-[18px] font-medium ${step.status === "completed" ? "text-emerald-500" : "text-gray-500"}`}>
// // 										{step.header}
// // 									</h3>
// // 									<p className={`w-[90%] text-[14px] font-light ${step.status === "completed" ? "text-emerald-500" : "text-gray-500"}`}>
// // 										{step.para}
// // 									</p>
// // 								</div>
// // 							</div>
// // 							{index + 1 !== onboardingSteps.length && (
// // 								<div className="w-[2px] h-[50px] bg-gray-300 ml-[15px]">
// // 								</div>
// // 							)}
// // 						</div>
// // 					))}
// // 				</div>
// // 			</div>
// // 			<div className="w-[100%] min-h-screen flex flex-col items-center justify-between p-4 px-10 bg-white overflow-scroll ml-[30%] relative">
// // 				<div className="w-[100%] m-[auto]">
// // 					<div className="flex flex-col gap-4 w-full">
// // 						<div className="text-gray-900 text-center font-bold text-[28px]">{currentOnboardingStep.rightHeader}</div>
// // 						<div className="text-gray-800 text-center text-[18px]">{currentOnboardingStep.rightPara}</div>
// // 						<div className="text-center font-bold">{currentOnboardingStep.id === 2 && (<span className="text-[24px] text-red-500">₹ 3.05 lacs</span>)}</div>
// // 						<div className="text-center font-bold">{currentOnboardingStep.id === 3 && (<span className="text-[24px] text-emerald-500">₹ 1.71 lacs</span>)}</div>
// // 					</div>
// // 					<div className="flex-col justify-center items-center m-[50px]">

// // 						<div className="w-full">
// // 							{currentOnboardingStep.id === 1 && (
// // 								<div className="flex flex-col gap-4 w-[50%] m-[auto]">
// // 									<div className="mt-[10px] flex-col flex">
// // 										<label className="text-grayblue-500 mb-[5px] text-[14px]">Organisation Name</label>
// // 										{/* <input type="text" placeholder="Name" value={name} className="p-2 border rounded text-grayblue-700" /> */}
// // 										<Select>
// // 											<SelectTrigger className="">
// // 												<SelectValue placeholder="TCS" />
// // 											</SelectTrigger>
// // 											<SelectContent>
// // 												<SelectGroup>
// // 													<SelectItem value="January">TVS Credit</SelectItem>
// // 													<SelectItem value="Febraury">August AI</SelectItem>
// // 													<SelectItem value="March">Rentomojo</SelectItem>
// // 													<SelectItem value="April">Cred</SelectItem>
// // 												</SelectGroup>
// // 											</SelectContent>
// // 										</Select>
// // 									</div>
// // 									<div className="mt-[10px] flex-col flex">
// // 										<label className="text-grayblue-500 mb-[5px] text-[14px]">Work Email</label>
// // 										<input type="email" placeholder="Work email" value={workEmail} className="p-2 border rounded text-grayblue-700 bg-white" />
// // 									</div>
// // 									{!showOtpScreen && (
// // 										<button type="button" onClick={() => setShowOtpScreen(true)} className="mt-10 p-2 hover:bg-emerald-600 bg-emerald-500 text-white rounded">Verify with OTP</button>
// // 									)}

// // 									{showOtpScreen && (
// // 										<div className="w-full">
// // 											<div className="mt-[10px] flex-col flex">
// // 												<span className="text-black my-[20px] text-[14px]">Enter OTP sent to your email</span>
// // 												<OtpInput
// // 													inputStyle={{ color: "black", border: "1px solid gray", padding: "10px", margin: "0 10px 0 0", width: "70%", background: "white" }}
// // 													isInputNum
// // 													value={otp}
// // 													onChange={handleOtp}
// // 													numInputs={4} separator={<span>-</span>} />
// // 											</div>
// // 											<div className="flex items-center mt-[30px]">
// // 												<Checkbox id="terms" />
// // 												<label
// // 													htmlFor="terms"
// // 													className="text-sm ml-[10px] font-light peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// // 												>
// // 													I allow Bicameral Mind to fetch my employee data for the purpose of optimising my salary and reducing my taxes
// // 												</label>
// // 											</div>
// // 											<button type="button" onClick={() => setOnboardingStepsAndAll(currentOnboardingStep, "next")} className="mt-10 p-2 hover:bg-emerald-600 bg-emerald-500 text-white rounded w-full">Confirm</button>
// // 										</div>
// // 									)}

// // 								</div>
// // 							)}
// // 							{currentOnboardingStep.id === 2 && (
// // 								<>
// // 									<div className="mb-[200px]">
// // 										<div className="w-[95%] bg-gray-200 h-[2px] my-10" />
// // 										<div className='flex justify-center mb-[50px]'>
// // 											<Tabs defaultValue="yearly" className='w-[30%]' onValueChange={(tab) => setTimeFrame(tab)}>
// // 												<TabsList className='w-full'>
// // 													<TabsTrigger className='w-[50%]' value="monthly">Monthly</TabsTrigger>
// // 													<TabsTrigger className='w-[50%]' value="yearly">Yearly</TabsTrigger>
// // 												</TabsList>
// // 											</Tabs>
// // 										</div>
// // 										<div>
// // 											<div className="">
// // 												<div className='flex justify-between w-[100%] items-center p-[15px] rounded-[10px]'>
// // 													<div className='w-1/2 flex items-center gap-2'>
// // 														<Image
// // 															priority
// // 															src={ruppeeLogo}
// // 															alt="Follow us on Twitter"
// // 															width={30}
// // 															height={30}
// // 														/>
// // 														<h1 className='text-left font-medium text-[18px]'>
// // 															Total CTC
// // 														</h1>
// // 													</div>
// // 													<div className='w-1/2 text-right font-bold text-[16px] mr-[35px]'>
// // 														<span>{formatAmount(component.currentSalary[timeFrame].totalCtc)}</span>
// // 													</div>
// // 												</div>

// // 												<div className="w-[95%] bg-grayblue-200 h-[2px] my-5" />

// // 												<Accordion type="single" collapsible className="pr-[0px] mt-[20px]">
// // 													<AccordionItem value="item-1" className='border-[0px]'>
// // 														<AccordionTrigger className="p-[15px] bg-grayblue-100 rounded-[10px]">
// // 															<div className='flex justify-between w-[100%] items-center'>
// // 																<div className="flex items-center gap-2">
// // 																	<Image
// // 																		priority
// // 																		src={ruppeeLogo}
// // 																		alt="Follow us on Twitter"
// // 																		width={30}
// // 																		height={30}
// // 																	/>
// // 																	<h1 className='text-left font-medium text-[18px]'>
// // 																		Total Gross Salary
// // 																	</h1>
// // 																</div>
// // 																<div className='w-1/2 text-right font-bold text-[16px] pr-[15px]'>
// // 																	<span className="">{formatAmount(component.currentSalary[timeFrame].grossSalary)}</span>
// // 																</div>
// // 															</div>
// // 														</AccordionTrigger>
// // 														<div className='w-full px-[20px]'>
// // 															<AccordionContent>
// // 																<div className='flex justify-between px-[30px] items-center p-4 bg-grayblue-50 rounded-[10px] mt-[20px]'>
// // 																	<div className='w-1/2'>
// // 																		<h1 className='mb-2 font-medium text-[16px]'>
// // 																			Basic Pay
// // 																		</h1>
// // 																		<p className="text-red-500 text-[14px]">* Fully taxable</p>
// // 																	</div>
// // 																	<div className='w-1/2 text-right'>{formatAmount(component.currentSalary[timeFrame].basicPay)}</div>
// // 																</div>
// // 																<div className='flex justify-between px-[30px] items-center p-4 bg-grayblue-50 rounded-[10px] mt-[20px]'>
// // 																	<div className='w-1/2'>
// // 																		<h1 className='mb-2 font-medium text-[16px]'>
// // 																			HRA
// // 																		</h1>
// // 																		<p className="text-green-500 text-[14px]">* Partially tax exempt under old tax regime</p>
// // 																	</div>
// // 																	<div className='w-1/2 text-right'>{formatAmount(component.currentSalary[timeFrame].hra)}</div>
// // 																</div>
// // 																<div className='flex justify-between px-[30px] items-center p-4 bg-grayblue-50 rounded-[10px] mt-[20px]'>
// // 																	<div className='w-1/2'>
// // 																		<h1 className='mb-2 font-medium text-[16px]'>
// // 																			Special Allowances
// // 																		</h1>
// // 																		<p className="text-red-500 text-[14px]">* Fully taxable</p>
// // 																	</div>
// // 																	<div className='w-1/2 text-right'>{formatAmount(component.currentSalary[timeFrame].specialAllowances)}</div>
// // 																</div>
// // 															</AccordionContent>
// // 														</div>

// // 													</AccordionItem>
// // 												</Accordion>
// // 												<div className="flex items-start gap-2 w-full flex-row mt-[20px]">
													
// // 													<div className="mt-[17px] ml-[-20px]">
// // 															⛔
// // 														</div>
// // 													<Accordion type="single" collapsible className="pr-[0px] w-full">
// // 														<AccordionItem value="item-1" className='border-[0px]'>
// // 															<AccordionTrigger className="p-[15px] bg-red-50 rounded-[10px]">
// // 																<div className='flex justify-between w-[100%] items-center'>
// // 																	<div className='w-1/2 flex gap-2 items-center'>
// // 																		<Image
// // 																			priority
// // 																			src={taxSheetLogo}
// // 																			alt="Follow us on Twitter"
// // 																			width={30}
// // 																			height={30}
// // 																		/>
// // 																		<h1 className='mb-2 text-left font-bold text-[18px]'>
// // 																			Taxes
// // 																		</h1>
// // 																	</div>
// // 																	<div className='w-1/2 text-right font-bold text-[16px] pr-[15px]'>
// // 																		<span className="">{formatAmount(component.currentSalary[timeFrame].taxes)}</span>
// // 																	</div>
// // 																</div>
// // 															</AccordionTrigger>
// // 															<div className='w-full px-[20px]'>
// // 																<AccordionContent>
// // 																	<div className='flex justify-between px-[30px] items-center p-4 bg-grayblue-50 rounded-[10px] mt-[20px]'>
// // 																		<div className='w-1/2'>
// // 																			<div className="flex-col items-center">
// // 																				<h1 className='text-left font-bold text-[16px]'>
// // 																					Income tax
// // 																				</h1>
// // 																				<p className="text-[14px] flex items-center gap-1 mt-1">
// // 																					<span className="font-medium">Government of India</span> <BadgeCheck className="h-4 text-blue-500" />
// // 																				</p>
// // 																				<p className="text-[14px] text-red-500 flex items-center gap-1 mt-1">
// // 																					<span className="">* Effective tax rate of 15% under new tax regime</span>
// // 																				</p>
// // 																			</div>
// // 																		</div>
// // 																		<div className='w-1/2 text-right font-bold text-[16px] mr-[35px]'>
// // 																			<span className="">{formatAmount(component.currentSalary[timeFrame].incomeTax)}</span>
// // 																		</div>
// // 																	</div>
// // 																	<div className='flex justify-between px-[30px] items-center p-4 bg-grayblue-50 rounded-[10px] mt-[20px]'>
// // 																		<div className='w-1/2'>
// // 																			<div className="flex-col items-center">
// // 																				<h1 className='text-left font-bold text-[16px]'>
// // 																					Professional tax
// // 																				</h1>
// // 																				<p className="text-[14px] flex items-center gap-1 mt-1">
// // 																					<span className="font-medium">Government of Karnataka</span> <BadgeCheck className="h-4 text-blue-500" />
// // 																				</p>
// // 																			</div>
// // 																		</div>
// // 																		<div className='w-1/2 text-right font-bold text-[16px] mr-[35px]'>
// // 																			<span className="">{formatAmount(component.currentSalary[timeFrame].professionalTax)}</span>
// // 																		</div>
// // 																	</div>
// // 																</AccordionContent>
// // 															</div>

// // 														</AccordionItem>
// // 													</Accordion>
// // 												</div>

// // 												<div className="w-[95%] bg-grayblue-200 h-[2px] my-10" />

// // 												<div className='flex justify-between w-[100%] bg-emerald-50 items-center p-[15px] rounded-[10px] mt-[10px]'>
// // 													<div className='w-1/2 flex items-center gap-2'>
// // 														<Image
// // 															priority
// // 															src={ruppeeLogo}
// // 															alt="Follow us on Twitter"
// // 															width={30}
// // 															height={30}
// // 														/>
// // 														<h1 className='text-left font-bold text-[18px]'>
// // 															Net Salary
// // 														</h1>
// // 													</div>
// // 													<div className='w-1/2 text-right font-bold text-[16px] mr-[35px]'>
// // 														<span className="">{formatAmount(component.currentSalary[timeFrame].netSalary)}</span>
// // 													</div>
// // 												</div>

// // 												{/* <div className="w-[95%] bg-grayblue-200 h-[2px] my-10" /> */}
// // 												<h1 className="text-center font-bold text-[22px] mt-10">Your Net Salary is paid out as</h1>

// // 												<div className='flex justify-between w-[100%] items-center p-[15px] bg-emerald-50 rounded-[10px] mt-[50px]'>
// // 													<div className='w-1/2 flex items-center gap-2'>
// // 														<Image
// // 															priority
// // 															src={ruppeeLogo}
// // 															alt="Follow us on Twitter"
// // 															width={30}
// // 															height={30}
// // 														/>
// // 														<h1 className='mb-2 text-left font-bold text-[18px]'>
// // 															In-hand Salary
// // 														</h1>
// // 													</div>
// // 													<div className='w-1/2 text-right font-bold text-[16px] mr-[35px]'>
// // 														<span className="">{formatAmount(component.currentSalary[timeFrame].inHandSalary)}</span>
// // 													</div>
// // 												</div>

// // 												<Accordion type="single" collapsible className="pr-[0px] mt-[30px]">
// // 													<AccordionItem value="item-1" className='border-[0px]'>
// // 														<AccordionTrigger className="p-[15px] bg-grayblue-50 rounded-[10px]">
// // 															<div className='flex justify-between w-[100%] items-center'>
// // 																<div className='w-1/2 flex items-center gap-2'>
// // 																	<Image
// // 																		priority
// // 																		src={deductionsLogo}
// // 																		alt="Follow us on Twitter"
// // 																		width={30}
// // 																		height={30}
// // 																	/>
// // 																	<div>
// // 																		<h1 className='mb-2 text-left font-bold text-[18px]'>
// // 																			Investment
// // 																		</h1>
// // 																		<p className="text-left">
// // 																			In Retirement Funds on behalf of you
// // 																		</p>
// // 																	</div>
// // 																</div>
// // 																<div className='w-1/2 text-right font-bold text-[16px] pr-[15px]'>
// // 																	<span className="">{formatAmount(component.currentSalary[timeFrame].deductions)}</span>
// // 																</div>
// // 															</div>
// // 														</AccordionTrigger>
// // 														<div className='w-full px-[20px]'>
// // 															<AccordionContent>
// // 																<div className='flex justify-between px-[30px] items-center p-4 bg-grayblue-50 rounded-[10px] mt-[20px]'>
// // 																	<div className='w-1/2'>
// // 																		<div className="flex-col items-center">
// // 																			<h1 className='text-left font-bold text-[14px]'>
// // 																				PF (Employee contribution)
// // 																			</h1>
// // 																			<p className="text-[14px] mt-[10px] p-[5px rounded text-green-800">
// // 																				Investment with tax-free returns of 8.1% locked-in till age 58
// // 																			</p>
// // 																		</div>
// // 																	</div>
// // 																	<div className='w-1/2 text-right font-bold text-[16px] mr-[35px]'>
// // 																		<span className="">{formatAmount(component.currentSalary[timeFrame].pf)}</span>
// // 																	</div>
// // 																</div>
// // 															</AccordionContent>
// // 														</div>

// // 													</AccordionItem>
// // 												</Accordion>

// // 												<div className="w-[95%] bg-grayblue-200 h-[2px] my-10" />
// // 												<h1 className="text-center font-bold text-[22px]">Your employer provides some additional benefits</h1>

// // 												<Accordion type="single" collapsible className="pr-[0px] mt-[50px]">
// // 													<AccordionItem value="item-1" className='border-[0px]'>
// // 														<AccordionTrigger className="p-[15px] bg-grayblue-50 rounded-[10px]">
// // 															<div className='flex justify-between w-[105%] items-center'>
// // 																<div className='w-1/2 flex items-center gap-2'>
// // 																	<Image
// // 																		priority
// // 																		src={employerBenefitsLogo}
// // 																		alt="Follow us on Twitter"
// // 																		width={30}
// // 																		height={30}
// // 																	/>
// // 																	<h1 className='text-left font-bold text-[16px]'>
// // 																		Additional Employer Benefits
// // 																	</h1>
// // 																</div>
// // 																<div className='w-1/2 text-right font-bold text-[16px] pr-[15px]'>
// // 																	<span className="">{formatAmount(component.currentSalary[timeFrame].employerBenefits)}</span>
// // 																</div>
// // 															</div>
// // 														</AccordionTrigger>
// // 														<div className='w-full px-[20px]'>
// // 															<AccordionContent>
// // 																<div className='flex justify-between px-[30px] items-center p-4 bg-grayblue-50 rounded-[10px] mt-[20px]'>
// // 																	<div className='w-1/2'>
// // 																		<h1 className='mb-2 font-bold'>
// // 																			PF (Employer contribution)
// // 																		</h1>
// // 																		<p className="text-[14px] flex items-center gap-1">
// // 																			<span className="font-medium">Employees Provident Fund Organisation</span> <BadgeCheck className="h-4 text-blue-500" />
// // 																		</p>
// // 																		<p className="text-[14px] text-green-500 flex items-center gap-1 mt-1">
// // 																			<span className="">Get ₹64.63 lacs tax-free by age 58</span>
// // 																		</p>
// // 																	</div>
// // 																	<div className='w-1/2 text-right'>{formatAmount(component.currentSalary[timeFrame].pfEmployer)}</div>
// // 																</div>
// // 																<div className='flex justify-between px-[30px] items-center p-4 bg-grayblue-50 rounded-[10px] mt-[20px]'>
// // 																	<div className='w-1/2'>
// // 																		<h1 className='mb-2 font-bold'>
// // 																			Gratuity
// // 																		</h1>
// // 																	</div>
// // 																	<div className='w-1/2 text-right'>{formatAmount(component.currentSalary[timeFrame].gratuity)}</div>
// // 																</div>
// // 																<div className='flex justify-between px-[30px] items-center p-4 bg-grayblue-50 rounded-[10px] mt-[20px]'>
// // 																	<div className='w-1/2'>
// // 																		<h1 className='mb-1 font-bold'>
// // 																			Health Insurance
// // 																		</h1>
// // 																		<p className="text-[14px] flex items-center gap-1">
// // 																			<span className="font-medium">Acko</span> <BadgeCheck className="h-4 text-blue-500" />
// // 																		</p>
// // 																		<p className="text-[14px] text-green-500 flex items-center gap-1 mt-1">
// // 																			<span className="">Get ₹5 lacs cover for hospitalization expenses</span>
// // 																		</p>
// // 																	</div>
// // 																	<div className='w-1/2 text-right'>{formatAmount(component.currentSalary[timeFrame].healthInsurance)}</div>
// // 																</div>
// // 															</AccordionContent>
// // 														</div>

// // 													</AccordionItem>
// // 												</Accordion>

// // 											</div>
// // 										</div>
// // 									</div>
// // 									<div className="fixed bottom-0 bg-grayblue-50 w-[70%] right-0">
// // 										<div className="px-[20px] py-1 flex justify-center items-center gap-5">
// // 											<div className="my-5">
// // 												<h1 className="text-center font-medium text-[14px]">Check how much taxes you can save by optimising your CTC</h1>
// // 											</div>
// // 											<Dialog>
// // 												<DialogTrigger><Button className="text-[16px] hover:bg-emerald-400">Optimise my salary</Button></DialogTrigger>
// // 												<DialogContent className="p-[20px]">
// // 													<DialogHeader>
// // 														<DialogTitle>Please enter your house rent</DialogTitle>
// // 														<DialogDescription>
// // 															<div className="mt-[20px]">
// // 																<Input
// // 																	type='text'
// // 																	placeholder='enter rent'
// // 																	className='w-full text-black border'
// // 																/>
// // 															</div>
// // 														</DialogDescription>
// // 													</DialogHeader>
// // 													<DialogFooter className=" mt-[40px]">
// // 														<DialogClose asChild>
// // 															<Button type="button" variant="outline" onClick={() => {
// // 																setShowOptimiseSalaryScreen(true)
// // 																setOnboardingStepsAndAll(currentOnboardingStep, "next")
// // 															}}>
// // 																Optimise Salary
// // 															</Button>
// // 														</DialogClose>
// // 													</DialogFooter>
// // 												</DialogContent>
// // 											</Dialog>
// // 										</div>
// // 									</div>
// // 								</>
// // 							)}

// // 							{currentOnboardingStep.id === 3 && (
// // 								<>
// // 									<div className="mb-[200px]">
// // 										<div className="w-[95%] bg-gray-200 h-[2px] my-10" />
// // 										{/* <div className='flex justify-center mb-[50px]'>
// // 											<Tabs defaultValue="yearly" className='w-[30%]' onValueChange={(tab) => setTimeFrame(tab)}>
// // 												<TabsList className='w-full'>
// // 													<TabsTrigger className='w-[50%]' value="monthly">Monthly</TabsTrigger>
// // 													<TabsTrigger className='w-[50%]' value="yearly">Yearly</TabsTrigger>
// // 												</TabsList>
// // 											</Tabs>
// // 										</div> */}
// // 										<div>
// // 											<div className="">
// // 												<div className='flex justify-between w-[100%] items-center p-[15px] rounded-[10px]'>
// // 													<div className='w-1/2'>
// // 														<h1 className='mb-2 text-left font-bold text-[18px]'>
// // 														</h1>
// // 													</div>
// // 													<div className='w-1/2 text-right font-bold text-[16px] mr-[35px] flex justify-between'>
// // 														<span className="flex-1 text-[18px]">Optimised Structure</span>
// // 														<span className="flex-1 text-[18px]">Current Structure</span>
// // 													</div>
// // 												</div>

// // 												<div className='flex justify-between w-[100%] items-center p-[15px] rounded-[10px] mt-[20px]'>
// // 													<div className='w-1/2 flex items-center gap-2'>
// // 														<Image
// // 															priority
// // 															src={ruppeeLogo}
// // 															alt="Follow us on Twitter"
// // 															width={30}
// // 															height={30}
// // 														/>
// // 														<h1 className='text-left font-medium text-[18px]'>
// // 															Total CTC
// // 														</h1>
// // 													</div>
// // 													<div className='w-1/2 text-right font-medium text-[16px] mr-[35px] flex justify-between'>
// // 														<span className="flex-1">{formatAmount(component.optimiseSalary[optimisedTimeFrame].totalCtc)}</span>
// // 														<span className="flex-1">{formatAmount(component.currentSalary[optimisedTimeFrame].totalCtc)}</span>
// // 													</div>
// // 												</div>

// // 												<div className="w-[95%] bg-grayblue-200 h-[2px] my-5" />

// // 												<div className='flex justify-between w-[100%] items-center p-[15px] rounded-[10px] mt-[20px] bg-grayblue-50'>
// // 													<div className='w-1/2'>
// // 														<h1 className='mb-2 text-left font-medium text-[18px]'>
// // 															<div className="flex items-center gap-2">
// // 																<Image
// // 																	priority
// // 																	src={taxMoneyLogo}
// // 																	alt=""
// // 																	width={30}
// // 																	height={30}
// // 																/>
// // 																<ViewGross btnName="Taxable Gross Salary" />
// // 															</div>
// // 														</h1>
// // 													</div>
// // 													<div className='w-1/2 text-right font-medium text-[16px] mr-[35px] flex justify-between'>
// // 														{/* <span className="flex-1">{formatAmount(component.currentSalary[timeFrame].totalCtc)}</span> */}
// // 														<span className="flex-1">
// // 															<p>{formatAmount(component.optimiseSalary[optimisedTimeFrame].fullTaxable)}</p>
// // 															<p className="text-emerald-500 font-medium"> 70%</p>
// // 														</span>
// // 														<span className="flex-1">
// // 															<p>{formatAmount(component.currentSalary[optimisedTimeFrame].fullTaxable)}</p>
// // 															<p className="text-red-500 font-medium"> 90%</p>
// // 														</span>
// // 													</div>
// // 												</div>

// // 												<div className='flex justify-between w-[100%] items-center p-[15px] rounded-[10px] mt-[20px] bg-grayblue-50'>
// // 													<div className='w-1/2 flex gap-5 items-center'>
// // 														<div className="ml-[-40px]">
// // 															➕
// // 														</div>
// // 														<div className="flex-col">
// // 															<h1 className='text-left font-medium text-[18px] cursor-pointer'>
// // 																<div className="flex items-center gap-2">
// // 																	<Image
// // 																		priority
// // 																		src={taxExemptLogo}
// // 																		alt="Follow us on Twitter"
// // 																		width={30}
// // 																		height={30}
// // 																	/>
// // 																	<div>
// // 																		<span>Tax-exempt Gross Salary</span>
// // 																		<p className="text-emerald-500 font-medium text-[14px] cursor-pointer">
// // 																			<CustomizeCTC btnName="Click to increase this more" />
// // 																		</p>
// // 																	</div>
// // 																</div>
// // 															</h1>
// // 														</div>
// // 													</div>
// // 													<div className='w-1/2 text-right font-medium text-[16px] mr-[35px] flex justify-between'>
// // 														<span className="flex-1">
// // 															<p>{formatAmount(component.optimiseSalary[optimisedTimeFrame].fullTaxExempt)}</p>
// // 															<p className="text-emerald-500 font-medium"> 30%</p>
// // 														</span>
// // 														<span className="flex-1">
// // 															<p>{formatAmount(component.currentSalary[optimisedTimeFrame].fullTaxExempt)}</p>
// // 															<p className="text-red-500 font-medium"> 10%</p>
// // 														</span>
// // 													</div>
// // 												</div>

// // 												<div className='flex justify-between w-[100%] items-center p-[15px] rounded-[10px] mt-[20px]'>
// // 													<div className='w-1/2 flex gap-5 items-center'>
// // 														<div className="ml-[-40px]">
// // 															🟰
// // 														</div>
// // 														<div className="flex-col">
// // 															<div className="flex items-center gap-2">
// // 																<Image
// // 																	priority
// // 																	src={ruppeeLogo}
// // 																	alt="Follow us on Twitter"
// // 																	width={30}
// // 																	height={30}
// // 																/>
// // 																<h1 className='text-left font-medium text-[18px]'>
// // 																	Total Gross Salary
// // 																</h1>
// // 															</div>
// // 														</div>
// // 													</div>

// // 													<div className='w-1/2 text-right font-medium text-[16px] mr-[35px] flex justify-between'>
// // 														<span className="flex-1">{formatAmount(component.optimiseSalary[optimisedTimeFrame].grossSalary)}</span>
// // 														<span className="flex-1">{formatAmount(component.currentSalary[optimisedTimeFrame].grossSalary)}</span>
// // 													</div>
// // 												</div>

// // 												<div className='flex justify-between w-[100%] items-center p-[15px] bg-red-50 cursor-pointer rounded-[10px] mt-[20px]'>
// // 													<div className='w-1/2 flex gap-5 items-center'>
// // 														<div className="ml-[-40px]">
// // 															⛔
// // 														</div>
// // 														<div className="flex-col">
// // 															<h1 className='text-left font-medium text-[18px]'>
// // 																<div className="flex gap-2 items-center">
// // 																	<Image
// // 																		priority
// // 																		src={taxSheetLogo}
// // 																		alt="Follow us on Twitter"
// // 																		width={30}
// // 																		height={30}
// // 																	/>
// // 																	<div>
// // 																		<ViewTaxes btnName="Taxes" />
// // 																		<p className="text-emerald-500 font-medium text-[14px] cursor-pointer">
// // 																			Total savings of ₹1,71,184
// // 																		</p>
// // 																		<p className="text-emerald-500 font-medium text-[14px] cursor-pointer">
// // 																			Effective tax rate of 6.7% vs 15.4%
// // 																		</p>
// // 																	</div>

// // 																</div>
// // 															</h1>
// // 														</div>
// // 													</div>
// // 													<div className='w-1/2 text-right font-medium text-[16px] mr-[35px] flex justify-between'>
// // 														<span className="flex-1">{formatAmount(component.optimiseSalary[optimisedTimeFrame].taxes)}</span>
// // 														<span className="flex-1">{formatAmount(component.currentSalary[optimisedTimeFrame].taxes)}</span>
// // 													</div>
// // 												</div>


// // 												<div className="w-[95%] bg-grayblue-200 h-[2px] my-10" />

// // 												<div className='flex justify-between w-[100%] bg-emerald-50 cursor-pointer items-center p-[15px] rounded-[10px] mt-[10px]'>
// // 													<div className='w-1/2 flex items-center gap-2'>
// // 														<Image
// // 															priority
// // 															src={ruppeeLogo}
// // 															alt="Follow us on Twitter"
// // 															width={30}
// // 															height={30}
// // 														/>
// // 														<h1 className='text-left font-bold text-[18px]'>
// // 															Net Salary
// // 														</h1>
// // 													</div>
// // 													<div className='w-1/2 text-right font-bold text-[16px] mr-[35px] flex justify-between'>
// // 														<span className="flex-1">{formatAmount(component.optimiseSalary[optimisedTimeFrame].netSalary)}</span>
// // 														<span className="flex-1">{formatAmount(component.currentSalary[optimisedTimeFrame].netSalary)}</span>
// // 													</div>
// // 												</div>

// // 												{/* <div className="w-[95%] bg-grayblue-200 h-[2px] my-10" /> */}
// // 												<h1 className="text-center font-bold text-[22px] mt-10">Your Net Salary should be structured as</h1>
// // 												<div className='flex justify-between w-[100%] items-center p-[15px] rounded-[10px] mt-[50px]'>
// // 													<div className='w-1/2'>
// // 														<h1 className='mb-2 text-left font-bold text-[18px]'>
// // 														</h1>
// // 													</div>
// // 													<div className='w-1/2 text-right font-bold text-[16px] mr-[35px] flex justify-between'>
// // 														<span className="flex-1 text-[18px]">Optimised Structure</span>
// // 														<span className="flex-1 text-[18px]">Current Structure</span>
// // 													</div>
// // 												</div>
// // 												<div className="bg-white rounded-[10px]">
// // 													<div className='flex justify-between w-[100%] items-center p-[15px] rounded-[10px] mt-[20px] bg-grayblue-50 cursor-pointer'>
// // 														<div className='w-1/2'>
// // 															<h1 className='mb-2 text-left font-medium text-[16px]'>
// // 																<div className="flex items-center gap-2">
// // 																	<Image
// // 																		priority
// // 																		src={ruppeeLogo}
// // 																		alt="Follow us on Twitter"
// // 																		width={30}
// // 																		height={30}
// // 																	/>
// // 																	<InHand btnName="In Hand Salary" />
// // 																</div>
// // 															</h1>
// // 														</div>
// // 														<div className='w-1/2 text-right font-medium text-[16px] mr-[35px] flex justify-between'>
// // 															<span className="flex-1">{formatAmount(component.optimiseSalary[optimisedTimeFrame].inHandSalary)}</span>
// // 															<span className="flex-1">{formatAmount(component.currentSalary[optimisedTimeFrame].inHandSalary)}</span>
// // 														</div>
// // 													</div>

// // 													<div className='flex justify-between w-[100%] items-center p-[15px] bg-grayblue-50 cursor-pointer rounded-[10px] mt-[20px]'>
// // 														<div className='w-1/2 flex items-center gap-2'>
// // 															<Image
// // 																priority
// // 																src={deductionsLogo}
// // 																alt="Follow us on Twitter"
// // 																width={30}
// // 																height={30}
// // 															/>
// // 															<div>
// // 																<h1 className='text-left font-medium text-[16px]'>
// // 																	<ViewAssets btnName="Deductions for Investments" />
// // 																</h1>
// // 																{/* <p className="text-emerald-500 font-medium text-[14px] cursor-pointer">
// // 																Total assets in 30 yrs at this rate
// // 															</p> */}
// // 															</div>
// // 														</div>
// // 														<div className='w-1/2 text-right font-medium text-[16px] mr-[35px] flex justify-between'>
// // 															<span className="flex-1">
// // 																<p>{formatAmount(component.optimiseSalary[optimisedTimeFrame].assetCreationInvestment)}</p>
// // 																<p className="text-emerald-500 font-medium">↑ ₹9.34 crs</p>
// // 															</span>
// // 															<span className="flex-1">
// // 																<p>{formatAmount(component.currentSalary[optimisedTimeFrame].assetCreationInvestment)}</p>
// // 																<p className="text-red-500 font-medium">↓ ₹0.79 crs</p>
// // 															</span>
// // 														</div>
// // 													</div>

// // 													{/* <div className='flex justify-between w-[100%] items-center p-[15px] bg-grayblue-50 cursor-pointer rounded-[10px] mt-[20px]'>
// // 														<div className='w-1/2'>
// // 															<h1 className='mb-2 text-left font-medium text-[16px]'>
// // 																Insurance
// // 															</h1>
// // 															<p className="text-emerald-500 font-medium text-[14px] cursor-pointer">
// // 																Additional cover of 45 lacs for you & your parents
// // 															</p>
// // 														</div>
// // 														<div className='w-1/2 text-right font-medium text-[16px] mr-[35px] flex justify-between'>
// // 															<span className="flex-1">{formatAmount(component.optimiseSalary[optimisedTimeFrame].healthInsurance)}</span>
// // 															<span className="flex-1"></span>
// // 														</div>
// // 													</div> */}
// // 												</div>

// // 												<div className="w-[95%] bg-grayblue-200 h-[2px] my-10" />
// // 												<h1 className="text-center font-bold text-[22px]">Your employer provides some additional benefits</h1>
// // 												<div className='flex justify-between w-[100%] items-center p-[15px] rounded-[10px] mt-[50px]'>
// // 													<div className='w-1/2'>
// // 														<h1 className='mb-2 text-left font-bold text-[18px]'>
// // 														</h1>
// // 													</div>
// // 													<div className='w-1/2 text-right font-bold text-[16px] mr-[35px] flex justify-between'>
// // 														<span className="flex-1 text-[18px]">Optimised Structure</span>
// // 														<span className="flex-1 text-[18px]">Current Structure</span>
// // 													</div>
// // 												</div>
// // 												<div className='flex justify-between w-[100%] items-center p-[15px] bg-grayblue-50 cursor-pointer rounded-[10px] mt-[50px]'>
// // 													<div className='w-1/2 flex items-center gap-2'>
// // 														<Image
// // 															priority
// // 															src={employerBenefitsLogo}
// // 															alt="Follow us on Twitter"
// // 															width={30}
// // 															height={30}
// // 														/>
// // 														<h1 className='text-left font-medium text-[16px]'>
// // 															<EmployerContribution btnName="Employer Benefits" />
// // 														</h1>
// // 													</div>
// // 													<div className='w-1/2 text-right font-medium text-[16px] mr-[35px] flex justify-between'>
// // 														<span className="flex-1">{formatAmount(component.optimiseSalary[optimisedTimeFrame].employerBenefits)}</span>
// // 														<span className="flex-1">{formatAmount(component.currentSalary[optimisedTimeFrame].employerBenefits)}</span>
// // 													</div>
// // 												</div>
// // 											</div>
// // 										</div>
// // 									</div>
// // 									<div className="fixed bottom-0 bg-grayblue-50 w-[70%] right-0">
// // 										<div className="px-[20px] py-1 flex justify-center items-center gap-5">
// // 											<div className="my-5">
// // 												<h1 className="text-center font-medium text-[14px]">Confirm your salary below to get tax savings of 1.71 lacs</h1>
// // 											</div>
// // 											<Link href="/dashboard" className="p-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-[5px]">
// // 												Confirm and submit to HR
// // 											</Link>
// // 										</div>
// // 									</div>
// // 								</>
// // 							)}
// // 						</div>
// // 					</div>
// // 				</div>
// // 			</div>
// // 		</div>
// // 	);
// // }
