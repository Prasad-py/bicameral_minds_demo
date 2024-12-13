import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import Image from "next/image";
import HraLogo from "@/public/images/hrs.png";
import ruppeeLogo from "@/public/images/ruppee.png";
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
			header: "Basic Pay",
			optimised: 612000,
			current: 1080000,
			subheader: "Fully taxable",
			icon: <Image
				priority
				src={ruppeeLogo}
				alt="Follow us on Twitter"
				width={30}
			/>
		},
		{
			header: "HRA (taxable component)",
			optimised: 6000,
			current: 348000,
			subheader: "Fully taxable",
			icon: <Image
				priority
				src={HraLogo}
				alt="Follow us on Twitter"
				width={30}
			/>
		},
		{
			header: "Special Allowances",
			optimised: 780200,
			current: 384000,
			value: 60,
			subheader: "Fully taxable",
			icon: <Image
				priority
				src={ruppeeLogo}
				alt="Follow us on Twitter"
				width={30}
			/>
		}
	])

	const formatAmount = (amount) => {
		return new Intl.NumberFormat('en-IN', {
			style: 'currency',
			currency: 'INR',
			minimumFractionDigits: 2
		}).format(amount);
	};

	return (
		<div>
			<Sheet>
				<SheetTrigger asChild >
					<div className="cursor-pointer">{btnName}</div>
				</SheetTrigger>
				<SheetContent className="w-[50%] !max-w-[60%]">
					<SheetHeader>
						<SheetTitle className="text-center text-[22px]">Taxable Gross Salary</SheetTitle>
					</SheetHeader>
					<div className="grid gap-4 py-4 mt-[20px]">
						<div className='flex justify-between w-[100%] items-center p-[15px] rounded-[10px]'>
							<div className='w-1/2'>
								<h1 className='mb-2 text-left font-bold text-[18px]'>
								</h1>
							</div>
							<div className='w-1/2 text-right font-bold text-[16px] mr-[35px] flex justify-between'>
								<span className="flex-1 text-[18px] pr-6">Optimised</span>
								<span className="flex-1 text-[18px] pr-6">Current</span>
							</div>
						</div>
						{items.map((item, index) => (
							<div className="mb-[20px] border p-6 rounded-[10px]">
								<div className="flex justify-between">
									<div className="flex items-center gap-2">
										<div>{item.icon}</div>
										<div className="flex flex-col">
											<h1 className='text-left font-medium text-[16px] flex'>{item.header}</h1>
											<p className="text-[14px] text-red-500">{item.subheader}</p>
										</div>
									</div>
									
									<div className='w-1/2 text-right font-medium text-[16px] mr-[35px] flex justify-between'>
										<span className="flex-1">{formatAmount(item.optimised)}</span>
										<span className="flex-1">{formatAmount(item.current)}</span>
									</div>
								</div>
							</div>
						))}
					</div>
					<SheetFooter>
						<div className="w-full absolute bottom-0 right-0 p-[20px]">

							<div className="flex justify-end">
								<div className="w-1/4">
									<SheetClose asChild>
										<Button className="w-full hover:bg-emerald-400">Close</Button>
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
