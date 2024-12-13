"use client";
import React, { useState, useEffect, memo } from "react";
import { useRouter } from 'next/navigation';
// import { signIn, useSession } from "next-auth/react";
import bicameralLogo from "@/public/images/bicameral-logo.svg";
import OtpInput from 'react18-input-otp';
import Link from 'next/link';
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import { Button } from '@/components/ui/button'

export default function Home() {
	const router = useRouter();
	const salaryStructure = {
		optimised: {
			totalCtc: {
				label: "Total CTC",
				monthly: "₹1,70,000",
				yearly: "₹20,40,000",
			},
			grossSalary: [
				{
					label: "Basic Pay",
					monthly: "₹51,000",
					yearly: "₹6,12,000",
				},
				{
					label: "HRA",
					monthly: "₹20,400",
					yearly: "₹2,44,800",
				},
				{
					label: "Special Allowances",
					monthly: "₹65,017",
					yearly: "₹7,80,200",
				},
				{
					label: "Telecom Allowance",
					monthly: "₹3,000",
					yearly: "₹36,000",
				},
				{
					label: "Food Allowance",
					monthly: "₹2,200",
					yearly: "₹26,400",
				},
				{
					label: "Vehicle Allowance",
					monthly: "₹2,400",
					yearly: "₹28,800",
				},
				{
					label: "Driver Salary Allowance",
					monthly: "₹900",
					yearly: "₹10,800",
				},
				{
					label: "Leave Travel Allowance",
					monthly: "₹5,000",
					yearly: "₹60,000",
				},
				{
					label: "Professional Pursuit Allowance",
					monthly: "₹8,333",
					yearly: "₹1,00,000",
				},
				{
					label: "Gadget Allowance",
					monthly: "₹8,333",
					yearly: "₹1,00,000",
				},
				{
					label: "Gift Allowance",
					monthly: "₹417",
					yearly: "₹5,000",
				}
			],
			employeerContribution: [
				{
					label: "PF (Employer contribution)",
					monthly: "₹1,800",
					yearly: "₹21,600",
				},
				{
					label: "Gratuity",
					monthly: "₹700",
					yearly: "₹8,400",
				},
				{
					label: "Health Insurance",
					monthly: "₹500",
					yearly: "₹6,000",
				}
			],
			deductionFromGross: {
				label: "PF (Employee contribution)",
				monthly: "₹6,120",
				yearly: "₹73,440",
			},
		},
		current: {
			totalCtc: {
				label: "Total CTC",
				monthly: "₹1,70,000",
				yearly: "₹20,40,000",
			},
			grossSalary: [
				{
					label: "Basic Pay",
					monthly: "₹90,000",
					yearly: "₹10,80,000",
				},
				{
					label: "HRA",
					monthly: "₹45,000",
					yearly: "₹5,40,000",
				},
				{
					label: "Special Allowances",
					monthly: "₹32,000",
					yearly: "₹3,84,000",
				},
				{
					label: "Telecom Allowance",
					monthly: "X",
					yearly: "X",
				},
				{
					label: "Food Allowance",
					monthly: "X",
					yearly: "X",
				},
				{
					label: "Vehicle Allowance",
					monthly: "X",
					yearly: "X",
				},
				{
					label: "Driver Salary Allowance",
					monthly: "X",
					yearly: "X",
				},
				{
					label: "Leave Travel Allowance",
					monthly: "X",
					yearly: "X",
				},
				{
					label: "Professional Pursuit Allowance",
					monthly: "X",
					yearly: "X",
				},
				{
					label: "Gadget Allowance",
					monthly: "X",
					yearly: "X",
				},
				{
					label: "Gift Allowance",
					monthly: "X",
					yearly: "X",
				}
			],
			employeerContribution: [
				{
					label: "PF (Employer contribution)",
					monthly: "₹1,800",
					yearly: "₹21,600",
				},
				{
					label: "Gratuity",
					monthly: "₹700",
					yearly: "₹8,400",
				},
				{
					label: "Health Insurance",
					monthly: "₹500",
					yearly: "₹6,000",
				}
			],
			deductionFromGross: {
				label: "PF (Employee contribution)",
				monthly: "₹1,800",
				yearly: "₹21,600",
			},
		}
	}

	const steps = [
		{
			id: 1,
			status: "ongoing",
			header: "Optimise your salary with Bicameral Minds",
			para: ""
		},
		{
			id: 2,
			status: "pending",
			header: "Verify Your Work Email",
			para: "Check your work email for the verification code, and enter it to verify your workspace details."
		},
		{
			id: 3,
			status: "pending",
			header: "Sync Gmail",
			para: "Grant permission to sync only transactional emails and bills from your Gmail account to your local machine."
		}
	];


	const getStatusSVG = (step) => {
		if (step.status === "ongoing") {
			return (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 bg-blue-50 border-blue-500 border-[2px] rounded-[50px] p-2 text-white" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
				</svg>
			)
		}
		if (step.status === "completed") {
			return (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 bg-blue-500 border-blue-500 border-[2px] rounded-[50px] p-2 text-white" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
				</svg>
			)
		}
		if (step.status === "pending") {
			return (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 bg-white border-gray-300 border-[2px] rounded-[50px] p-2 text-white" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
				</svg>
			)
		}
	}

	const [otp, setOtp] = useState('');

	const [showRegimeCompare, setShowRegimeCompare] = useState(false);
	const [showOptimiseSalaryScreen, setShowOptimiseSalaryScreen] = useState(false);

	const [componentTax, setComponentTax] = useState({
		oldRegime: {
			payableTax: 302848,
			hra: 192000,
			eightyC: 150000
		},
		newRegime: {
			payableTax: 307944,
			hra: "X",
			eightyC: "X"
		},
	});

	const handleOtp = (enteredOtp) => {
		setOtp(enteredOtp);
	};

	const [onboardingSteps, setOnboardingSteps] = useState(steps)

	const [currentOnboardingStep, setCurrentOnboardingStep] = useState(steps[0])

	const setOnboardingStepsAndAll = (currentStep, direction) => {
		const index = onboardingSteps.findIndex(step => step.id === currentStep.id)
		const steps = onboardingSteps
		steps[index].status = direction === "next" ? "completed" : "pending"
		const newIndex = direction === "next" ? index + 1 : index - 1
		setOnboardingSteps([...steps])
		setCurrentOnboardingStep({ ...steps[newIndex] })
	}

	const [name, setName] = useState("Ashwani Kumar")
	const [workEmail, setWorkEmail] = useState("ashwani@bicameralminds.com")

	return (
		<div className="flex bg-grayblue-100">
			<div className="w-[100%] min-h-screen flex flex-col items-center justify-between p-4 overflow-scroll">
				<div className="w-[100%] m-[auto]">
					<div className="flex flex-col gap-4 w-full">
						<div className="text-gray-700 text-center font-bold text-[24px]">{currentOnboardingStep.header}</div>
						<div className="text-gray-500 text-center">{currentOnboardingStep.para}</div>
					</div>
					<div className="flex-col justify-center items-center m-[50px]">
						<div className="w-full flex justify-between items-center">

							<div className="flex-col justify-center items-center bg-grayblue-100 w-[50%]">
								<div className="flex justify-center items-center">
									<div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full">
										<div className="p-6 border-b border-gray-500 text-right">
											<h2 className="text-2xl font-bold text-gray-800">Current Salary Structure</h2>
											<p className="text-sm text-gray-500">Current Breakdown</p>
										</div>
										<table className="min-w-full bg-white">
											<thead className="">
												<tr>
													<th className="py-4 px-6 text-left font-semibold text-gray-600"></th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
												</tr>
											</thead>
											<tbody className="text-gray-700">
												<tr className="border-b">
													<td className="py-4 px-6 font-medium">{salaryStructure.current.totalCtc.label}</td>
													<td className="py-4 px-6 text-center">{salaryStructure.current.totalCtc.monthly}</td>
													<td className="py-4 px-6 text-center">{salaryStructure.current.totalCtc.yearly}</td>
												</tr>
												<tr className="border-b">
													<div className="p-6 border-b border-gray-500">
														<h2 className="text-2xl font-bold text-gray-800">Gross salary</h2>
													</div>
												</tr>
												<tr>
													<th className="py-4 px-6 text-left font-semibold text-gray-600">Component</th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
												</tr>
												{salaryStructure.current.grossSalary.map(gross => (
													<tr className="">
														<td className="py-4 px-6">{gross.label}</td>
														<td className="py-4 px-6 text-center">{gross.monthly}</td>
														<td className="py-4 px-6 text-center">{gross.yearly}</td>
													</tr>
												))}
												<tr className="border-b">
													<div className="p-6 border-b border-gray-500">
														<h2 className="text-2xl font-bold text-gray-800">Employer contribution</h2>
													</div>
												</tr>
												<tr className="">
													<th className="py-4 px-6 text-left font-semibold text-gray-600">Component</th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
												</tr>
												{salaryStructure.current.employeerContribution.map(contribution => (
													<tr className="">
														<td className="py-4 px-6">{contribution.label}</td>
														<td className="py-4 px-6 text-center">{contribution.monthly}</td>
														<td className="py-4 px-6 text-center">{contribution.yearly}</td>
													</tr>
												))}
												<tr className="border-b">
													<div className="p-6 border-b border-gray-500">
														<h2 className="text-2xl font-bold text-gray-800">Deduction from gross</h2>

													</div>
												</tr>
												<tr>
													<th className="py-4 px-6 text-left font-semibold text-gray-600">Component</th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
												</tr>
												<tr className="">
													<td className="py-4 px-6">{salaryStructure.current.deductionFromGross.label}</td>
													<td className="py-4 px-6 text-center">{salaryStructure.current.deductionFromGross.monthly}</td>
													<td className="py-4 px-6 text-center">{salaryStructure.current.deductionFromGross.yearly}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							{/* <div className="flex flex-col items-center justify-center">
								<div className="w-[2px] bg-gray-300 h-[550px]"></div>
								
								<div className="w-[2px] bg-gray-300 h-[350px]"></div>
							</div> */}

							<div className="flex-col justify-center items-center bg-grayblue-100 w-[50%]">
								<div className="flex justify-center items-center">
									<div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full">
										<div className="p-6 border-b border-gray-500 text-right">
											<h2 className="text-2xl font-bold text-gray-800">Optimised Salary Structure</h2>
											<p className="text-sm text-gray-500">New Breakdown</p>
										</div>
										<table className="min-w-full bg-white">
											<thead className="">
												<tr>
													<th className="py-4 px-6 text-left font-semibold text-gray-600"></th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
												</tr>
											</thead>
											<tbody className="text-gray-700">
												<tr className="border-b">
													{/* <td className="py-4 px-6 font-medium">{salaryStructure.optimised.totalCtc.label}</td> */}
													<td className="py-4 px-6 font-medium"></td>
													<td className="py-4 px-6 text-center">{salaryStructure.optimised.totalCtc.monthly}</td>
													<td className="py-4 px-6 text-center">{salaryStructure.optimised.totalCtc.yearly}</td>
												</tr>
												<tr className="border-b">
													<div className="p-6 border-b border-gray-500">
														{/* <h2 className="text-2xl font-bold text-gray-800">Gross salary</h2> */}
														<h2 className="text-2xl font-bold text-gray-800 w-full">Gross salary</h2>
													</div>
												</tr>
												<tr>
													{/* <th className="py-4 px-6 text-left font-semibold text-gray-600">Component</th> */}
													<th className="py-4 px-6 text-left font-semibold text-gray-600"></th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
												</tr>
												{salaryStructure.optimised.grossSalary.map(gross => (
													<tr className="">
														{/* <td className="py-4 px-6">{gross.label}</td> */}
														<td className="py-4 px-6"></td>
														<td className="py-4 px-6 text-center">{gross.monthly}</td>
														<td className="py-4 px-6 text-center">{gross.yearly}</td>
													</tr>
												))}
												<tr className="border-b">
													<div className="p-6 border-b border-gray-500">
														<h2 className="text-2xl font-bold text-gray-800">Employer contribution</h2>
													</div>
												</tr>
												<tr>
													<th className="py-4 px-6 text-left font-semibold text-gray-600"></th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
												</tr>
												{salaryStructure.optimised.employeerContribution.map(contribution => (
													<tr>
														<td className="py-4 px-6"></td>
														<td className="py-4 px-6 text-center">{contribution.monthly}</td>
														<td className="py-4 px-6 text-center">{contribution.yearly}</td>
													</tr>
												))}
												<tr className="border-b">
													<div className="p-6 border-b border-gray-500">
														<h2 className="text-2xl font-bold text-gray-800">Deduction from gross</h2>
													</div>
												</tr>
												<tr>
													<th className="py-4 px-6 text-left font-semibold text-gray-600"></th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
													<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
												</tr>
												<tr className="">
													<td className="py-4 px-6"></td>
													<td className="py-4 px-6 text-center">{salaryStructure.optimised.deductionFromGross.monthly}</td>
													<td className="py-4 px-6 text-center">{salaryStructure.optimised.deductionFromGross.yearly}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>

							{/* <>
								{showOptimiseSalaryScreen ? (
									<>
										<div className="flex-col justify-center items-center">
											<div className="flex justify-center items-center">
												<div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full">
													<div className="p-6 border-b border-gray-500">
														<h2 className="text-2xl font-bold text-gray-800">Salary Structure</h2>
														<p className="text-sm text-gray-500">Current Breakdown</p>
													</div>
													<table className="min-w-full bg-white">
														<thead className="bg-gray-50">
															<tr>
																<th className="py-4 px-6 text-left font-semibold text-gray-600"></th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
															</tr>
														</thead>
														<tbody className="text-gray-700">
															<tr className="border-b">
																<td className="py-4 px-6 font-medium">Total CTC</td>
																<td className="py-4 px-6 text-center">₹1,70,000</td>
																<td className="py-4 px-6 text-center">₹20,40,000</td>
															</tr>
															<tr className="border-b">
																<div className="p-6 border-b border-gray-500">
																	<h2 className="text-2xl font-bold text-gray-800">Gross salary</h2>

																</div>
															</tr>
															<tr>
																<th className="py-4 px-6 text-left font-semibold text-gray-600">Component</th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
															</tr>
															<tr className="bg-gray-50">
																<td className="py-4 px-6">Basic Pay</td>
																<td className="py-4 px-6 text-center">₹90,000</td>
																<td className="py-4 px-6 text-center">₹10,80,000</td>
															</tr>
															<tr>
																<td className="py-4 px-6">HRA</td>
																<td className="py-4 px-6 text-center">₹45,000</td>
																<td className="py-4 px-6 text-center">₹5,40,000</td>
															</tr>
															<tr className="bg-gray-50">
																<td className="py-4 px-6">Special Allowances</td>
																<td className="py-4 px-6 text-center">₹32,000</td>
																<td className="py-4 px-6 text-center">₹3,84,000</td>
															</tr>
															<tr className="border-b">
																<div className="p-6 border-b border-gray-500">
																	<h2 className="text-2xl font-bold text-gray-800">Employer contribution</h2>

																</div>
															</tr>
															<tr>
																<th className="py-4 px-6 text-left font-semibold text-gray-600">Component</th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
															</tr>
															<tr>
																<td className="py-4 px-6">PF (Employer Contribution)</td>
																<td className="py-4 px-6 text-center">₹1,800</td>
																<td className="py-4 px-6 text-center">₹21,600</td>
															</tr>
															<tr className="bg-gray-50">
																<td className="py-4 px-6">Gratuity</td>
																<td className="py-4 px-6 text-center">₹700</td>
																<td className="py-4 px-6 text-center">₹8,400</td>
															</tr>
															<tr>
																<td className="py-4 px-6">Health Insurance</td>
																<td className="py-4 px-6 text-center">₹500</td>
																<td className="py-4 px-6 text-center">₹6,000</td>
															</tr>
															<tr className="border-b">
																<div className="p-6 border-b border-gray-500">
																	<h2 className="text-2xl font-bold text-gray-800">Deduction from gross</h2>

																</div>
															</tr>
															<tr>
																<th className="py-4 px-6 text-left font-semibold text-gray-600">Component</th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
															</tr>
															<tr className="bg-gray-50">
																<td className="py-4 px-6">PF (Employee Contribution)</td>
																<td className="py-4 px-6 text-center">₹1,800</td>
																<td className="py-4 px-6 text-center">₹21,600</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
										<div className="p-6 border-t border-gray-200 text-center">
											<button onClick={() => {
												setShowRegimeCompare(true)
												setTimeout(() => {
													const regimeCompareSection = document.getElementById('regimeCompareSection');
													if (regimeCompareSection) {
														regimeCompareSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
													}
												}, 1000)
											}} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
												Calculate Tax deducation in Old Tax And New Tax Regime
											</button>
										</div>
										{showRegimeCompare && (
											<div id="regimeCompareSection" className="mt-[50px] h-screen">
												<div className="justify-between h-full w-full">
													<div className="flex-col justify-center items-center w-full">
														<div className="flex justify-center items-center">
															<div className="bg-white rounded-lg overflow-hidden w-full">
																<div className="p-6 border-b border-gray-500">
																	<h2 className="text-2xl font-bold text-gray-800">Your deducation old vs new tax regime</h2>
																	<p className="text-sm text-gray-500">Below is the current comparision tax deducation based on your CTC structure</p>
																	<div className="mt-[10px] text-center">
																		<div className="text-black">To have a proper calcualtion, please enter your rent amount per month</div>
																		<div className="flex gap-5 mt-[20px] items-center justify-center">
																			<div className="text-blue-700 mb-[5px] text-[16px] font-medium">Monthly Rent</div>
																			<input type="text" placeholder="Name" value={15000} className="p-2 border border-grayblue-300 rounded text-grayblue-700 text-center" />
																		</div>
																	</div>
																</div>
																<table className="min-w-full bg-white">
																	<thead className="bg-gray-50">
																		<tr>
																			<th className="py-4 px-6 text-left font-semibold text-gray-600"></th>
																			<th className="py-4 px-6 text-center font-semibold text-gray-600">New Tax Regime</th>
																			<th className="py-4 px-6 text-center font-semibold text-gray-600">Old Tax Regime</th>
																		</tr>
																	</thead>
																	<tbody className="text-gray-700">
																		<tr className="border-b">
																			<td className="py-4 px-6 font-medium">Payable Tax (before)</td>
																			<td className="py-4 px-6 text-center">₹ {componentTax.newRegime.payableTax}</td>
																			<td className="py-4 px-6 text-center">₹ {componentTax.oldRegime.payableTax}</td>
																		</tr>
																		<tr className="border-b">
																			<div className="p-6 pb-2 border-b border-gray-500">
																				<h2 className="text-2xl font-bold text-gray-800">Tax exemption</h2>
																			</div>
																		</tr>
																		<tr className="border-b">
																			<td className="py-4 px-6 font-medium">HRA</td>
																			<td className="py-4 px-6 text-center">{componentTax.newRegime.hra}</td>
																			<td className="py-4 px-6 text-center">₹ {componentTax.oldRegime.hra}</td>
																		</tr>
																		<tr className="border-b">
																			<div className="p-6 pb-2 border-b border-gray-500">
																				<h2 className="text-2xl font-bold text-gray-800">Tax deduction</h2>
																			</div>
																		</tr>
																		<tr className="border-b">
																			<td className="py-4 px-6 font-medium">80C</td>
																			<td className="py-4 px-6 text-center">{componentTax.newRegime.eightyC}</td>
																			<td className="py-4 px-6 text-center">₹ {componentTax.oldRegime.eightyC}</td>
																		</tr>
																		<tr className="border-b">
																			<div className="p-6 pb-2 border-b border-gray-500">
																				<h2 className="text-2xl font-bold text-gray-800">Total</h2>
																			</div>
																		</tr>
																		<tr className="border-b">
																			<td className="py-4 px-6 font-medium">Payable Tax (after)</td>
																			<td className="py-4 px-6 text-center">₹ {componentTax.newRegime.payableTax}</td>
																			<td className="py-4 px-6 text-center">₹ {componentTax.oldRegime.payableTax}</td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
													<div className="mt-16 border-t border-gray-200 text-center">
														<button onClick={() => {
															setShowRegimeCompare(true)
															setTimeout(() => {
																const regimeCompareSection = document.getElementById('regimeCompareSection');
																if (regimeCompareSection) {
																	regimeCompareSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
																}
															}, 1000)
														}} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
															Optimise your salary structure and savings
														</button>
													</div>
												</div>
											</div>
										)}
									</>
								) : (
									<>
										<div className="flex-col justify-center items-center bg-grayblue-100">
											<div className="flex justify-center items-center">
												<div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full">
													<div className="p-6 border-b border-gray-500">
														<h2 className="text-2xl font-bold text-gray-800">Salary Structure</h2>
														<p className="text-sm text-gray-500">Current Breakdown</p>
													</div>
													<table className="min-w-full bg-white">
														<thead className="bg-gray-50">
															<tr>
																<th className="py-4 px-6 text-left font-semibold text-gray-600"></th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
															</tr>
														</thead>
														<tbody className="text-gray-700">
															<tr className="border-b">
																<td className="py-4 px-6 font-medium">Total CTC</td>
																<td className="py-4 px-6 text-center">₹1,70,000</td>
																<td className="py-4 px-6 text-center">₹20,40,000</td>
															</tr>
															<tr className="border-b">
																<div className="p-6 border-b border-gray-500">
																	<h2 className="text-2xl font-bold text-gray-800">Gross salary</h2>

																</div>
															</tr>
															<tr>
																<th className="py-4 px-6 text-left font-semibold text-gray-600">Component</th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
															</tr>
															<tr className="bg-gray-50">
																<td className="py-4 px-6">Basic Pay</td>
																<td className="py-4 px-6 text-center">₹90,000</td>
																<td className="py-4 px-6 text-center">₹10,80,000</td>
															</tr>
															<tr>
																<td className="py-4 px-6">HRA</td>
																<td className="py-4 px-6 text-center">₹45,000</td>
																<td className="py-4 px-6 text-center">₹5,40,000</td>
															</tr>
															<tr className="bg-gray-50">
																<td className="py-4 px-6">Special Allowances</td>
																<td className="py-4 px-6 text-center">₹32,000</td>
																<td className="py-4 px-6 text-center">₹3,84,000</td>
															</tr>
															<tr className="border-b">
																<div className="p-6 border-b border-gray-500">
																	<h2 className="text-2xl font-bold text-gray-800">Employer contribution</h2>

																</div>
															</tr>
															<tr>
																<th className="py-4 px-6 text-left font-semibold text-gray-600">Component</th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
															</tr>
															<tr>
																<td className="py-4 px-6">PF (Employer Contribution)</td>
																<td className="py-4 px-6 text-center">₹1,800</td>
																<td className="py-4 px-6 text-center">₹21,600</td>
															</tr>
															<tr className="bg-gray-50">
																<td className="py-4 px-6">Gratuity</td>
																<td className="py-4 px-6 text-center">₹700</td>
																<td className="py-4 px-6 text-center">₹8,400</td>
															</tr>
															<tr>
																<td className="py-4 px-6">Health Insurance</td>
																<td className="py-4 px-6 text-center">₹500</td>
																<td className="py-4 px-6 text-center">₹6,000</td>
															</tr>
															<tr className="border-b">
																<div className="p-6 border-b border-gray-500">
																	<h2 className="text-2xl font-bold text-gray-800">Deduction from gross</h2>

																</div>
															</tr>
															<tr>
																<th className="py-4 px-6 text-left font-semibold text-gray-600">Component</th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Month</th>
																<th className="py-4 px-6 text-center font-semibold text-gray-600">Per Year</th>
															</tr>
															<tr className="bg-gray-50">
																<td className="py-4 px-6">PF (Employee Contribution)</td>
																<td className="py-4 px-6 text-center">₹1,800</td>
																<td className="py-4 px-6 text-center">₹21,600</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
										<div className="p-6 border-t border-gray-200 text-center">
											<button onClick={() => {
												setShowRegimeCompare(true)
												setTimeout(() => {
													const regimeCompareSection = document.getElementById('regimeCompareSection');
													if (regimeCompareSection) {
														regimeCompareSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
													}
												}, 1000)
											}} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
												Calculate Tax deducation in Old Tax And New Tax Regime
											</button>
										</div>
										{showRegimeCompare && (
											<div id="regimeCompareSection" className="mt-[50px] h-screen">
												<div className="justify-between h-full w-full">
													<div className="flex-col justify-center items-center w-full">
														<div className="flex justify-center items-center">
															<div className="bg-white rounded-lg overflow-hidden w-full">
																<div className="p-6 border-b border-gray-500">
																	<h2 className="text-2xl font-bold text-gray-800">Your deducation old vs new tax regime</h2>
																	<p className="text-sm text-gray-500">Below is the current comparision tax deducation based on your CTC structure</p>
																	<div className="mt-[10px] text-center">
																		<div className="text-black">To have a proper calcualtion, please enter your rent amount per month</div>
																		<div className="flex gap-5 mt-[20px] items-center justify-center">
																			<div className="text-blue-700 mb-[5px] text-[16px] font-medium">Monthly Rent</div>
																			<input type="text" placeholder="Name" value={15000} className="p-2 border border-grayblue-300 rounded text-grayblue-700 text-center" />
																		</div>
																	</div>
																</div>
																<table className="min-w-full bg-white">
																	<thead className="bg-gray-50">
																		<tr>
																			<th className="py-4 px-6 text-left font-semibold text-gray-600"></th>
																			<th className="py-4 px-6 text-center font-semibold text-gray-600">New Tax Regime</th>
																			<th className="py-4 px-6 text-center font-semibold text-gray-600">Old Tax Regime</th>
																		</tr>
																	</thead>
																	<tbody className="text-gray-700">
																		<tr className="border-b">
																			<td className="py-4 px-6 font-medium">Payable Tax (before)</td>
																			<td className="py-4 px-6 text-center">₹ {componentTax.newRegime.payableTax}</td>
																			<td className="py-4 px-6 text-center">₹ {componentTax.oldRegime.payableTax}</td>
																		</tr>
																		<tr className="border-b">
																			<div className="p-6 pb-2 border-b border-gray-500">
																				<h2 className="text-2xl font-bold text-gray-800">Tax exemption</h2>
																			</div>
																		</tr>
																		<tr className="border-b">
																			<td className="py-4 px-6 font-medium">HRA</td>
																			<td className="py-4 px-6 text-center">{componentTax.newRegime.hra}</td>
																			<td className="py-4 px-6 text-center">₹ {componentTax.oldRegime.hra}</td>
																		</tr>
																		<tr className="border-b">
																			<div className="p-6 pb-2 border-b border-gray-500">
																				<h2 className="text-2xl font-bold text-gray-800">Tax deduction</h2>
																			</div>
																		</tr>
																		<tr className="border-b">
																			<td className="py-4 px-6 font-medium">80C</td>
																			<td className="py-4 px-6 text-center">{componentTax.newRegime.eightyC}</td>
																			<td className="py-4 px-6 text-center">₹ {componentTax.oldRegime.eightyC}</td>
																		</tr>
																		<tr className="border-b">
																			<div className="p-6 pb-2 border-b border-gray-500">
																				<h2 className="text-2xl font-bold text-gray-800">Total</h2>
																			</div>
																		</tr>
																		<tr className="border-b">
																			<td className="py-4 px-6 font-medium">Payable Tax (after)</td>
																			<td className="py-4 px-6 text-center">₹ {componentTax.newRegime.payableTax}</td>
																			<td className="py-4 px-6 text-center">₹ {componentTax.oldRegime.payableTax}</td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
													<div className="mt-16 border-t border-gray-200 text-center">
														<button onClick={() => {
															setShowOptimiseSalaryScreen(true)
															setTimeout(() => {
																const regimeCompareSection = document.getElementById('regimeCompareSection');
																if (regimeCompareSection) {
																	regimeCompareSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
																}
															}, 700)
														}} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
															Optimise your salary structure and savings
														</button>
													</div>
												</div>
											</div>
										)}
									</>
								)}
							</> */}

						</div>
						<div className="p-[20px] flex justify-center gap-10 pt-[50px]">
							<Button onClick={() => router.push('/dashboard')}>Skip to dashboard</Button>
							<Button onClick={() => router.push('/dashboard')}>Send to HR</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
