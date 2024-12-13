import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import AirtelLogo from "@/public/images/airtel.svg";
import Image from "next/image";
import { CircleMinus, CircleCheckBig, BadgeCheck } from "lucide-react"
import PFLogo from "@/public/images/pf.png";
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
			header: "PF (Employee contribution)",
			serviceHeader: "Employees Provident Fund Organisation",
			subheader: "Save ₹6,739 more this year",
			subheaders: ["Risk - Low  ✅", "Returns - Get 79.42 lacs by age 60 ✅", "Tax free - Save 10 lacs on withdrawal year ✅ "],
			icon: <Image priority src={PFLogo} alt="TaxLogo" width={30} />,
			amountBelowText: "Recommend to increase",
			optimised: 21600,
			current: 16000,
			amount: 25000,
			maxAmount: 73440,
			value: 29,
			disabled: true,
			perMonth: false,
			perYear: true,
		},
		{
			header: "National Pension Scheme (Employee)",
			serviceHeader: "PFRDA",
			subheader: "Save ₹19,094 more this year",
			subheaders: ["Risk - Low  ✅", "Returns - Get 1.12 crs by age 60 ✅", "Tax free - Save 8.4 lacs on withdrawal year ✅ "],
			icon: <Image priority src={PrdaLogo} alt="TaxLogo" width={30} />,
			amountBelowText: "Recommended",
			optimised: 61200,
			current: 16000,
			amount: 25000,
			maxAmount: 61200,
			value: 100,
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
		localItems[index].value = val[0]
		localItems[index].amount = (localItems[index].maxAmount * val[0]) / 100
		setItems([...localItems])
	}
	return (
		<div>
			<Sheet>
				<SheetTrigger asChild >
					<div>{btnName}</div>
				</SheetTrigger>
				<SheetContent className="w-[60%] !max-w-[100%]">
					<SheetHeader>
						<SheetTitle>Customize Your CTC</SheetTitle>
						<SheetDescription>
							Claim or check status of your allowances
						</SheetDescription>
					</SheetHeader>
					<div className="grid gap-4 py-4 mt-[20px]  h-[80%] overflow-y-auto">
						{items.map((item, index) => (
							<div className="mb-[10px] border p-6 rounded-[10px] flex items-start gap-5">
								<div className="mt-[10px]">{item.icon}</div>
								<div className="w-full">
									<div className="flex justify-between">
										<div>
											<h1 className="font-bold text-[16px]">{item.header}</h1>

											{item.serviceHeader && (<p className="text-[14px] flex items-center gap-1">
												<span className="font-medium">{item.serviceHeader}</span> <Image alt="TaxLogo" width={18} src={TickLogo} className="" />
											</p>)}
											{item.subheader && (<p className="font-medium text-[14px] text-emerald-500">{item.subheader}</p>)}
										</div>
										<div className="text-right">
											<p className="text-black font-medium text-[16px]">₹{item.optimised.toLocaleString()} {item.perMonth ? <span className="text-gray-500 font-[12px]">per month</span> : <span className="text-gray-500 font-[12px]">per year</span>}</p>
											<p className="text-emerald-500 font-medium text-[14px]">{item.amountBelowText}</p>
										</div>
									</div>
									<div className="mb-[30px]">
										{item.subheaders.map(header => (
											<div className="flex items-center gap-3 my-1">
												<p className="font-bold text-[14px]">{header}</p>
											</div>
										))}
									</div>
									<div className={`bg-grayblue-50 rounded-[5px] p-[20px] mb-[20px] mt-[5px] ${index === 0 ? "cursor-pointer" : "cursor-pointer"}`}>
										<div className="flex justify-between font-bold">
											<h4>0</h4>
											<h4>{item.maxAmount}</h4>
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
						<div className="w-full absolute bottom-0 right-0 p-[20px] shadow border-t">
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
