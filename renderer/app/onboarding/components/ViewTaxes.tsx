import { Button } from "@/components/ui/button"
import { CircleMinus, CircleCheckBig, BadgeCheck } from "lucide-react"
import { useState } from "react"
import Image from "next/image";
import TaxLogo from "@/public/images/tax.png";
import PFTaxLogo from "@/public/images/pfTax.png";
import TickLogo from "@/public/images/tick.png";
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

export default function SheetDemo({ btnName }) {
	const [items, setItems] = useState([
		{
			header: "Income Tax (as per old tax regime)",
			subheader1: "Government of India",
			subheader2: "Total savings of ₹1,71,184",
			optimised: 131664,
			current: 302848,
			icon: <Image
				priority
				src={TaxLogo}
				alt="TaxLogo"
				width={30}
			/>
		},
		{
			header: "Professional tax",
			subheader1: "Government of Karnataka",
			optimised: 2400,
			current: 2400,
			icon: <Image
				priority
				src={PFTaxLogo}
				alt="TaxLogo"
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
				<SheetContent className="w-[60%] !max-w-[60%]">
					<SheetHeader>
						<SheetTitle className="text-center text-[22px]">Taxes</SheetTitle>
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
									<h1 className='mb-2 text-left font-medium text-[16px]'>
										<div className="flex-col">
											<div className="flex gap-4 items-center">
												<div>
													{item.icon}
												</div>
												<div>
													<p className="font-bold">{item.header}</p>
													<p className="text-[14px] flex items-center gap-1">
														<span className="font-medium">{item.subheader1}</span> <Image alt="TaxLogo" width={18} src={TickLogo} className="" />
													</p>
													<p className="text-emerald-500 text-[14px] font-medium">
														{item.subheader2}
													</p>
												</div>
											</div>

										</div>
									</h1>
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
