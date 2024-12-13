import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import AirtelLogo from "@/public/images/airtel.svg";
import Image from "next/image";
import { CircleMinus, CircleCheckBig, BadgeCheck } from "lucide-react"
import TaxLogo from "@/public/images/tax.png";
import PrdaLogo from "@/public/images/prda.png";
import TickLogo from "@/public/images/tick.png";
import InsuranceLogo from "@/public/images/insurance.png";
import { useState } from "react"
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { IndianRupee, House, HandCoins } from "lucide-react"

export default function SheetDemo({ btnName }) {
	const [items, setItems] = useState([
		{
			header: "80C Investment",
			subheader: "Save ₹40,060 more this year",
			subheaders: [
				"Risk - High 🚨",
				"Returns - Market benchmark of 15% ✅ (one of the best in industry)",
				"*Remaining 80C will be filled through PF",
			],
			icon: <Image priority src={TaxLogo} alt="TaxLogo" width={60} />,
			amountBelowText: "Recommended",
			optimised: 128400,
			current: 16000,
			amount: 25000,
			maxAmount: 150000,
			value: 85,
			disabled: true,
			perMonth: true,
			perYear: false,
		},
		{
			header: "National Pension Scheme (Employee)",
			serviceHeader: "PFRDA",
			subheader: "Save ₹15,600 more this year",
			subheaders: ["Risk - Low  ✅", "Returns - Get ₹76.29 lacs by age 60 ✅", "Tax free - Save ₹5.72 lacs on withdrawal year ✅ "],
			icon: <Image priority src={PrdaLogo} alt="TaxLogo" width={60} />,
			amountBelowText: "Recommended",
			optimised: 50000,
			current: 16000,
			amount: 25000,
			maxAmount: 50000,
			value: 100,
			disabled: true,
			perMonth: true,
			perYear: false,
		},
		{
			header: "Health Insurance",
			serviceHeader: "Acko",
			subheader: "Save ₹12,480 more this year",
			subheaders: ["₹45 lacs cover for hospitalization   ", "*In addition to employer health insurance"],
			icon: <Image priority src={InsuranceLogo} alt="TaxLogo" width={60} />,
			amountBelowText: "Recommended",
			optimised: 40000,
			current: 16000,
			amount: 25000,
			maxAmount: 100000,
			value: 40,
			disabled: true,
			perMonth: true,
			perYear: false,
		},
	])
	const [calculation, setCalculation] = useState([
		{
			label: "Taxes",
			amount: 12500,
		},
		{
			label: "In hand",
			amount: 222500,
		}
	])
	const sliderChange = (val, index) => {
		const localItems = items
		const taxSave = parseInt(((localItems[index].maxAmount * val[0]) / 100) * 0.3 * 1.04, 10)
		localItems[index].value = val[0]
		localItems[index].amount = (localItems[index].maxAmount * val[0]) / 100
		localItems[index].optimised = (localItems[index].maxAmount * val[0]) / 100
		localItems[index].subheader = `Save ₹${taxSave.toLocaleString()} more this year`
		setItems([...localItems])
	}
	return (
		<div>
			<Sheet>
				<SheetTrigger asChild >
					<div>{btnName}</div>
				</SheetTrigger>
				<SheetContent className="w-[50%] !max-w-[100%] bg-gray-900 border-gray-900">
					<SheetHeader>
						<SheetTitle className="text-center text-[22px] text-white">In Hand Salary</SheetTitle>
					</SheetHeader>
					<div className="grid gap-4 py-4 mt-[20px]  h-[80%] overflow-y-auto">
						{items.map((item, index) => (
							<div className="mb-[10px] border border-gray-700 p-6 rounded-[10px] flex items-start gap-5">
								<div className="mt-[10px]">{item.icon}</div>
								<div className="w-full">
									<div className="flex justify-between">
										<div>
											<h1 className="font-bold text-[16px] text-white">{item.header}</h1>

											{item.serviceHeader && (<p className="text-[14px] flex items-center gap-1">
												<span className="font-medium text-white">{item.serviceHeader}</span> <Image alt="TaxLogo" width={18} src={TickLogo} className="" />
											</p>)}
											{item.subheader && (<p className="font-medium text-[14px] text-emerald-500">{item.subheader}</p>)}
										</div>
										<div className="text-right">
											<p className="text-black font-medium text-[16px] text-white">₹{item.optimised.toLocaleString()} {item.perMonth ? <span className="text-gray-500 font-[12px]">per month</span> : <span className="text-gray-500 font-[12px]">per year</span>}</p>
											<p className="text-emerald-500 font-medium text-[14px]">{item.amountBelowText}</p>
										</div>
									</div>
									<div className="my-[15px]">
										{item.spendCategories && (
											<div className="flex items-center gap-3">
												<h1 className="font-bold text-[14px] text-white">Spend Categories -</h1>
												<p className="font-medium text-[14px] text-white">{item.spendCategories}</p>
											</div>
										)}
									</div>
									<div className="mb-[30px]">
										{item.subheaders.map(header => (
											<div className="flex items-center gap-3 my-1">
												<p className="font-bold text-[14px] text-white">{header}</p>
											</div>
										))}
									</div>
									<div className={`bg-gray-700 rounded-[5px] p-[20px] mb-[20px] mt-[5px] ${index === 0 ? "cursor-pointer" : "cursor-pointer"}`}>
										<div className="flex justify-between font-bold">
											<h4 className="text-white">0</h4>
											<h4 className="text-white">{item.maxAmount}</h4>
										</div>
										<div className="cursor-pointer">
											<Slider
												className="mt-[10px]"
												defaultValue={[50]}
												max={100}
												step={1}
												value={[item.value]}
												onValueChange={(val) => sliderChange(val, index)}
											/>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<SheetFooter>
						<div className="w-full absolute bottom-0 right-0 p-[20px] shadow border-t border-gray-700">
							<div className="flex justify-between">
								<div className="flex justify-start gap-10">
									{/* {calculation.map(cal => (
										<div className="flex-col flex">
											<span>
												{cal.label}
											</span>
											<span>
												₹{cal.amount}
											</span>
										</div>
									))} */}
								</div>
								<div className="flex gap-10">
									<Button>Reset</Button>
									<SheetClose asChild>
										<Button>Save</Button>
									</SheetClose>
								</div>
							</div>
						</div>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	)
}
