"use client";
import React, { useState, useEffect, memo } from "react";
import { useRouter } from 'next/navigation';
// import { signIn, useSession } from "next-auth/react";
import bicameralLogo from "../public/images/bicameral.svg";
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2'
import OtpInput from 'react18-input-otp';
import 'react-phone-input-2/lib/style.css'
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

export default function Home() {
	const router = useRouter();
	const [phoneNumber, setPhoneNumber] = useState("")

	const [showOTPScreen, setShowOTPScreen] = useState(false)

	const [otp, setOtp] = useState('');

	const handleOtp = (enteredOtp) => {
		setOtp(enteredOtp);
	};

	const goToOnboarding = () => {
		router.push('/onboarding');
	}

	return (
		<div className="flex">
			<div className="w-[50%] bg-gray-800 py-[20px] px-[20px] flex flex-col justify-center">
				<div className="flex items-center gap-4 justify-center mt-[30px]">
					<Image
						priority
						src={bicameralLogo}
						alt="Follow us on Twitter"
						width={340}
					/>
				</div>
				<h1 className="text-[32px] text-gray-100 leading-none text-center mt-[50px] font-bold">
					Finance co-pilot for
				</h1>
				<TypeAnimation
					className="text-gray-100 text-[32px] leading text-center mt-[5px] font-bold"
					sequence={[
						"your employee benefits",
						1000,
						"reducing taxes for employees",
						1000,
					]}
					speed={180}
					repeat={Infinity}
				/>
			</div>
			<div className="w-[50%] min-h-screen flex flex-col items-center justify-between p-4 bg-gray-900">
				<div className="w-[100%] m-[auto]">
					<div className="flex flex-col gap-4 w-full">
						<div className="text-gray-100 text-center font-bold text-[24px]">Signin to Bicameral Minds</div>
						<div className="text-gray-300 text-center">We suggest using the phone number that you have in your HR system.</div>
					</div>
					<div className="flex-col justify-center items-center m-[50px]">
						<div className="mt-4 text-center mt-[20px] text-[18px]">
							<div className="text-gray-300">Login to your workspace with your registered phone number</div>
						</div>
						<div className="m-[auto] w-[100%]">
							<div className="flex flex-col gap-4 w-[50%] m-[auto] mt-[54px] justify-center items-center">
								{showOTPScreen ? (
									<>
										<span className="text-gray-100">Enter OTP</span>
										<OtpInput
											inputStyle={{ 
												color: "white", 
												border: "1px solid rgb(55, 65, 81)",
												padding: "20px", 
												width: "100%", 
												background: "rgb(31, 41, 55)",
												margin: "5px" 
											}}
											isInputNum
											value={otp}
											onChange={handleOtp}
											numInputs={4} 
											separator={<span>-</span>} 
										/>
										<div className="flex justify-center gap-4">
											<button onClick={() => setShowOTPScreen(false)} type="button" className="px-[20px] py-[10px] bg-gray-800 hover:bg-gray-700 text-gray-100 rounded m-[auto] w-full border border-gray-700">Back</button>
											<button onClick={goToOnboarding} type="button" className="px-[20px] py-[10px] bg-emerald-500 hover:bg-emerald-600 text-white rounded m-[auto] w-full">Next</button>
										</div>
									</>
								) : (
									<>
										<PhoneInput
											inputStyle={{ 
												color: "white", 
												width: "100%",
												background: "rgb(31, 41, 55)",
												border: "1px solid rgb(55, 65, 81)"
											}}
											searchStyle={{ padding: "20px" }}
											dropdownStyle={{ 
												color: "white", 
												padding: "10px",
												background: "rgb(31, 41, 55)" 
											}}
											containerStyle={{ padding: "0px" }}
											buttonStyle={{ 
												background: "rgb(31, 41, 55)",
												borderColor: "rgb(55, 65, 81)" 
											}}
											country={'in'}
											value={phoneNumber}
											onChange={(phone) => setPhoneNumber(phone)}
										/>
										<button onClick={() => setShowOTPScreen(true)} type="button" className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded m-[auto] w-full">Login with OTP</button>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-10">
					<div className="text-md text-gray-400 font-light mt-4 text-[14px] hover:text-gray-300 cursor-pointer">Privacy & terms</div>
					<div className="text-md text-gray-400 font-light mt-4 text-[14px] hover:text-gray-300 cursor-pointer">Contact us</div>
					<div className="text-md text-gray-400 font-light mt-4 text-[14px] hover:text-gray-300 cursor-pointer">Change region</div>
				</div>
			</div>
		</div>
	);
}
