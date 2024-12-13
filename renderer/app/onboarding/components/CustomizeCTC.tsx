import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import AirtelLogo from "@/public/images/airtel.svg";
import Image from "next/image";
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
import homeLogo from "@/public/images/home.png";
import telecomeLogo from "@/public/images/telecome.png";
import giftLogo from "@/public/images/gift.png";
import travelLogo from "@/public/images/travel.png";
import foodLogo from "@/public/images/food.png";
import fuelLogo from "@/public/images/fuel.png";
import driverLogo from "@/public/images/driver.png";
import gadgetLogo from "@/public/images/gadget.png";
import professionalDevLogo from "@/public/images/professionalDev.png";

import amazonLogo from "@/public/images/amazon.png";
import chatgptLogo from "@/public/images/chatgpt.png";
import driveuLogo from "@/public/images/driveu.png";
import iocLogo from "@/public/images/ioc.png";
import makemytripLogo from "@/public/images/makemytrip.png";
import samsungLogo from "@/public/images/samsung.png";
import zomatoLogo from "@/public/images/zomato.png";

import { IndianRupee, House, HandCoins } from "lucide-react"

export default function SheetDemo({ btnName }) {
	const [items, setItems] = useState([
		{
			header: "HRA (tax exempt component)",
			subheader: "Save ₹6,209 more annually",
			spendCategories: "House Rent",
			icon: <Image
				priority
				src={homeLogo}
				alt="Follow us on Twitter"
				width={60}
			/>,
			amountBelowText: "Optimised",
			optimised: 19900,
			current: 16000,
			amount: 25000,
			maxAmount: 20400,
			value: 79,
			disabled: true,
			perMonth: true,
			perYear: false,
		},
		{
			header: "Telecom Allowance",
			subheader: "Save ₹11,232 more annually",
			amountBelowText: "Recommended",
			icon: <Image
				priority
				src={telecomeLogo}
				alt="Follow us on Twitter"
				width={60}
			/>,
			optimised: 36000,
			current: null,
			amount: 36000,
			maxAmount: 48000,
			spendCategories: "Mobile, Internet",
			sampleMerchants: "ACT",
			value: 75,
			perMonth: false,
			perYear: true,
			icons: [<Image
				priority
				src={AirtelLogo}
				alt="AirtelLogo"
				width={30}
			/>]
		},
		{
			header: "Food Allowance",
			subheader: "Save ₹8,237 more annually",
			amountBelowText: "Recommended",
			icon: <Image
				priority
				src={foodLogo}
				alt="Follow us on Twitter"
				width={60}
			/>,
			optimised: 2200,
			current: null,
			amount: 26400,
			maxAmount: 2200,
			spendCategories: "Food vouchers",
			sampleMerchants: "ACT",
			value: 100,
			perMonth: true,
			perYear: false,
			icons: [<Image
				priority
				src={zomatoLogo}
				alt="zomatoLogo"
				width={30}
			/>]
		},
		{
			header: "Vehicle Allowance",
			subheader: "Save ₹8,986 more annually",
			amountBelowText: "Recommended",
			icon: <Image
				priority
				src={fuelLogo}
				alt="Follow us on Twitter"
				width={60}
			/>,
			optimised: 2400,
			current: null,
			amount: 28800,
			maxAmount: 2400,
			spendCategories: "Fuel, Maintenance",
			sampleMerchants: "ACT",
			value: 100,
			perMonth: true,
			perYear: true,
			icons: [<Image
				priority
				src={iocLogo}
				alt="AirtelLogo"
				width={30}
			/>]
		},
		{
			header: "Driver Salary Allowance",
			subheader: "Save ₹3,370 more annually",
			amountBelowText: "Recommended",
			icon: <Image
				priority
				src={driverLogo}
				alt="Follow us on Twitter"
				width={60}
			/>,
			optimised: 900,
			current: null,
			amount: 10800,
			maxAmount: 900,
			spendCategories: "Driver Salary",
			sampleMerchants: "ACT",
			value: 100,
			perMonth: true,
			perYear: false,
			icons: [<Image
				priority
				src={driveuLogo}
				alt="driveuLogo"
				width={30}
			/>]
		},
		{
			header: "Vacation Travel Allowance",
			subheader: "Save ₹18,720 more annually",
			amountBelowText: "Recommended",
			icon: <Image
				priority
				src={travelLogo}
				alt="Follow us on Twitter"
				width={60}
			/>,
			icons: [<Image
				priority
				src={makemytripLogo}
				alt="makemytripLogo"
				width={30}
			/>],
			optimised: 60000,
			current: null,
			amount: 60000,
			maxAmount: 100000,
			spendCategories: "Travel (Flights, Trains, Bus, Taxi)",
			sampleMerchants: "ACT",
			value: 60,
			perMonth: false,
			perYear: true,
		},
		{
			header: "Professional Development Allowance",
			subheader: "Save ₹31,200 more annually",
			amountBelowText: "Recommended",
			icon: <Image
				priority
				src={professionalDevLogo}
				alt="Follow us on Twitter"
				width={60}
			/>,
			icons: [<Image
				priority
				src={chatgptLogo}
				alt="chatgptLogo"
				width={30}
			/>],
			optimised: 100000,
			current: null,
			amount: 100000,
			maxAmount: 150000,
			spendCategories: "Courses, Books, Subscriptions, etc",
			sampleMerchants: "ACT",
			value: 66,
			perMonth: false,
			perYear: true,
		},
		{
			header: "Gadget Allowance",
			subheader: "Save ₹31,200 more annually",
			amountBelowText: "Recommended",
			icon: <Image
				priority
				src={gadgetLogo}
				alt="Follow us on Twitter"
				width={60}
			/>,
			icons: [<Image
				priority
				src={samsungLogo}
				alt="sa"
				width={70}
			/>],
			optimised: 100000,
			current: null,
			amount: 100000,
			maxAmount: 150000,
			spendCategories: "Electronics, Appliances",
			sampleMerchants: "ACT",
			value: 66,
			perMonth: false,
			perYear: true,
		},
		{
			header: "Gift Allowance",
			subheader: "Save ₹1,560 more annually",
			amountBelowText: "Recommended",
			icon: <Image
				priority
				src={giftLogo}
				alt="Follow us on Twitter"
				width={60}
			/>,
			icons: [<Image
				priority
				src={amazonLogo}
				alt="amazonLogo"
				width={30}
			/>],
			optimised: 5000,
			current: null,
			amount: 5000,
			maxAmount: 5000,
			spendCategories: "Gift cards or vouchers",
			sampleMerchants: "ACT",
			value: 100,
			perMonth: false,
			perYear: true,
		},
	])
	const setAmount = (header, value) => {

	}
	const sliderChange = (val, index) => {
		const localItems = items
		const taxSave = parseInt(((localItems[index].maxAmount * val[0]) / 100) * 0.3 * 1.04, 10)
		localItems[index].value = val[0]
		localItems[index].amount = (localItems[index].maxAmount * val[0]) / 100
		localItems[index].optimised = (localItems[index].maxAmount * val[0]) / 100
		localItems[index].subheader = `Save ₹${taxSave.toLocaleString()} more annually`
		setItems([...localItems])
	}
	return (
		<div>
			<Sheet>
				<SheetTrigger asChild >
					<div>{btnName}</div>
				</SheetTrigger>
				<SheetContent className="w-[50%] !max-w-[100%] bg-gray-900 border-gray-700">
					<SheetHeader>
						<SheetTitle className="text-center text-[22px] text-white">Tax-exempt Gross Salary</SheetTitle>
					</SheetHeader>
					<div className="grid gap-4 py-4 mt-[20px]  h-[80%] overflow-y-auto">
						{items.map((item, index) => (
							<div className="mb-[10px] border border-gray-700 p-6 rounded-[10px] flex items-start gap-5">
								<div className="mt-[0]">{item.icon}</div>
								<div className="w-full">
									<div className="flex justify-between">
										<div>
											<h1 className="font-bold text-[16px] text-white">{item.header}</h1>
											{item.subheader && (<p className="font-medium text-[14px] text-emerald-500">{item.subheader}</p>)}
										</div>
										<div className="text-right">
											<p className="text-black font-medium text-[16px] text-white">₹{item.optimised.toLocaleString()} {item.perMonth ? <span className="text-gray-500 font-[12px]">per month</span> : <span className="text-gray-500 font-[12px]">per year</span>}</p>
											<p className="text-emerald-500 font-medium text-[14px]">{item.amountBelowText}</p>
										</div>
									</div>
									<div className="my-[30px]">
										{item.spendCategories && (
											<div className="flex items-center gap-3">
												<h1 className="font-bold text-[16px] text-white">Spend Categories -</h1>
												<p className="font-medium text-[16px] text-white">{item.spendCategories}</p>
											</div>
										)}
										{item.sampleMerchants && (
											<div className="flex items-center gap-3 mt-[10px]">
												<h1 className="font-bold text-[16px] text-white">Sample Merchants -</h1>
												{item.icons && (
													<p className="font-bold text-[14px] text-white">{item.icons.map(icon => <span>{icon}</span>)}</p>
												)}

											</div>
										)}
									</div>
									<div className={` rounded-[5px] p-[20px] mb-[20px] bg-gray-700 mt-[5px] ${index === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}>
										<div className="flex justify-between font-bold">
											<h4 className="text-white">0</h4>
											<h4 className="text-white">{item.maxAmount}</h4>
										</div>
										{index === 0 ? (
											<div className="flex relative py-[5px]">
												<div className="ml-[25%] absolute bottom-[15px] font-bold text-center">
													<div className="text-[14px] text-red-500">16,000</div>
													<div className="text-[14px] text-red-500">(current)</div>
												</div>
												<div className="ml-[60%] absolute bottom-[15px] font-bold text-center">
													<div className="text-[14px] text-emerald-500">19,900</div>
													<div className="text-[14px] text-emerald-500">(optimised)</div>
												</div>
												<Slider
													className="mt-[10px] w-[30%]"
													barClassName="bg-red-500"
													thumbClassName="border-red-500"
													defaultValue={[50]}
													max={100}
													step={1}
													value={[100]}
													disabled
													onValueChange={(val) => sliderChange(val, index)}
												/>
												<Slider
													className="mt-[10px] w-[70%]"
													defaultValue={[50]}
													max={100}
													step={1}
													value={[50]}
													disabled
													onValueChange={(val) => sliderChange(val, index)}
												/>
											</div>
										) : (
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
										)}
										
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
