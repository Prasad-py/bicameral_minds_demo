"use client";
import React, { useState, useRef, useEffect } from "react";
import { format, addMonths, subMonths } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Search } from '@/components/search';
import { UserNav } from '@/components/user-nav';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from 'recharts';import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ExpenseSection from '@/app/dashboard/components/expense';
import AssetsSection from '@/app/dashboard/components/assets';
import LiabilitiesSection from '@/app/dashboard/components/liabilities';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronRightIcon as ChevronClosedIcon } from '@heroicons/react/solid';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

// Add this near the top of the file, after imports
const SHOW_FLOATING_BACKGROUND = false;

// Sample income data structure with nested components and tax-related information
const incomeData = {
    totalIncome: 1682450,
    entities: [
      {
        name: "Salary",
        type: "Tata Consultancy Services",
        logo: "/images/tcs-logo.png",
        amount: 1670000,
        suggestion: "Save ₹12,140 by submitting tax exemptions",
        components: [
          {
            name: "Taxable components",
            amount: 1160170,
          },
          {
            name: "HRA",
            amount: 20400,
          },
          {
            name: "Monthly Flexi Benefits",
            amount: 3200,
            subComponents: [
              {
                name: "Food Allowance",
                amount: 1000,
                utilization: "45%",
                maxAmount: 2200,
                recommendation: "Save ₹1200 with our recommended salary structure",
              },
              {
                name: "Vehicle Allowance",
                amount: 2200,
                utilization: "92%",
                maxAmount: 2400,
                recommendation: "Save ₹200 with our recommended salary structure",
              },
              {
                name: "Driver Salary Allowance",
                amount: 0,
                utilization: "0%",
                maxAmount: 900,
                recommendation: "Save ₹1200 with our recommended salary structure",
              },
            ],
          },
          {
            name: "Annual Flexi Benefits",
            amount: 0,
            subComponents: [
              {
                name: "Telecom Allowance",
                amount: 24000,
                utilization: "67%",
                maxAmount: 36000,
                recommendation: "Save ₹12000 with our recommended salary structure",
              },
              {
                name: "Leave Travel Allowance",
                amount: 0,
                utilization: "0%",
                maxAmount: 60000,
                recommendation: "Save ₹12000 with our recommended salary structure",
              },
              {
                name: "Professional Pursuit Allowance",
                amount: 78000,
                utilization: "78%",
                maxAmount: 100000,
                recommendation: "Save ₹22000 with our recommended salary structure",
              },
              {
                name: "Gadget Allowance",
                amount: 85000,
                utilization: "85%",
                maxAmount: 100000,
                recommendation: "Save ₹15000 with our recommended salary structure",
              },
              {
                name: "Gift Allowance",
                amount: 2000,
                utilization: "40%",
                maxAmount: 5000,
                recommendation: "Save ₹3000 with our recommended salary structure",
              },
            ],
          },
        ],
      },
      {
        name: "Business",
        type: "View suggestions for alternate income",
        logo: "/images/ruppee.png",
        amount: 0,
        suggestion: "Make ₹20,000 by offering consulting services",
        components: [
          {
            name: "Consulting Services",
            amount: 0,
            subComponents: [
              {
                name: "Project Fees",
                amount: 0,
                utilization: "0%",
                maxAmount: 10000,
                recommendation: "Earn 10k more",
              },
              {
                name: "Freelancing",
                amount: 0,
                utilization: "0%",
                maxAmount: 5000,
                recommendation: "Earn 5k more",
              },
            ],
          },
        ],
        recommendation: "Earn 20k more",
      },
      {
        name: "Capital Gains",
        type: "View suggestions for withdrawal plan",
        logo: "/images/ruppee.png",
        amount: 0,
        suggestion: "Withdraw funds with low returns at 0% tax",
        components: [
          {
            name: "Investments",
            amount: 0,
            subComponents: [
              {
                name: "Stocks",
                amount: 0,
                utilization: "0%",
                maxAmount: 50000,
                recommendation: "Invest 50k more",
              },
              {
                name: "Bonds",
                amount: 0,
                utilization: "0%",
                maxAmount: 30000,
                recommendation: "Invest 30k more",
              },
            ],
          },
        ],
        recommendation: "Save 16,250",
      },
      {
        name: "Other Sources",
        type: "2 sources",
        logo: "/images/icici-logo.png",
        amount: 1450,
        suggestion: "Get ₹500 more with a new savings account",
        subSources: [
          {
            name: "ICICI Bank",
            type: "Interest from Savings account",
            amount: 350,
            recommendation: "Save 1k",
          },
          {
            name: "Sibling",
            type: "Gift",
            amount: 1000,
          },
          {
            name: "Amazon Pay",
            type: "Rewards",
            amount: 100,
          },
        ],
      },
    ],
  };
  
  // Component to display a progress bar for tax exemption utilization
  const UtilizationBar = ({ percentage }) => (
    <div className="flex items-center space-x-2">
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-emerald-500 h-2"
        />
      </div>
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs text-gray-400 w-10"
      >
        {percentage}%
      </motion.span>
    </div>
  );

  // Component to display column headers for the income breakdown table
  const ColumnHeaders = () => (
    <div className="grid grid-cols-3 gap-4 text-base font-semibold text-gray-400 mb-4 px-4">
      <div>Source</div>
      <div className="text-center whitespace-nowrap pl-66">Utilization of Tax Exemption</div>
      <div className="text-right">Amount</div>
    </div>
  );

  // Add this interface for the drawer props
  interface FoodAllowanceDrawerProps {
    open: boolean;  
    onOpenChange: (open: boolean) => void;
  }

  // Update the drawer component with proper typing and logos
  const FoodAllowanceDrawer = ({ open, onOpenChange }: FoodAllowanceDrawerProps) => {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent 
          side="right"
          className="w-[40vw] max-w-[40vw] sm:max-w-[40vw] bg-gray-800 border-l border-gray-700 overflow-y-auto"
          style={{ width: '40vw' }}
        >
          <SheetHeader className="border-b border-gray-700 pb-4">
            <SheetTitle className="text-2xl font-bold text-gray-100">
              Corporate Policy for Food Allowance
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6 pb-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Food Allowance</span>
                <span className="text-gray-100">₹2,200 per month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Tax savings</span>
                <span className="text-gray-100">₹8,237 per year</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Current month utilization</span>
                <span className="text-gray-100">45%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "45%" }} />
              </div>
              <span className="text-emerald-400 text-sm">Save ₹686 this month</span>
            </div>

            <div className="border-t border-blue-500/20 my-6" />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-100">How to use Food Allowance</h3>
              
              <div className="space-y-2">
                <p className="text-gray-300">Step 1 - Buy a food voucher from the below link -</p>
                <a href="http://www.amazon.com" className="text-blue-400 hover:underline">www.amazon.com</a>
              </div>

              <div className="space-y-2">
                <p className="text-gray-300">You can buy any food voucher from your favourite brands like</p>
                <div className="flex space-x-4">
                  {[
                    { name: 'swiggy', logo: '/images/swiggy.png' },
                    { name: 'zomato', logo: '/images/zomato.png' },
                    { name: 'starbucks', logo: '/images/starbucks.png' },
                    { name: 'kfc', logo: '/images/kfc.png' },
                    { name: 'hardrock', logo: '/images/hardrock.png' }
                  ].map((brand) => (
                    <div key={brand.name} className="w-12 h-12 relative rounded-lg overflow-hidden bg-white p-1">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain relative z-10"
                        sizes="48px"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-gray-300">Step 2 - Use the below address for billing</p>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-gray-100 font-bold">TCS</p>
                  <p className="text-gray-100">Think Campus, Electronic City,</p>
                  <p className="text-gray-100">Bengaluru, Karnataka 560100</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-gray-300">Step 3 - Upload the bill here</p>
              </div>
            </div>

            <div className="border-t border-blue-500/20 my-6" />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-100">Oct 2024</h3>
              <div className="bg-gray-700/50 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 relative rounded-lg overflow-hidden">
                    <Image
                      src="/images/zomato.png"
                      alt="Zomato"
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="text-gray-100 font-medium">Gift Voucher</p>
                    <p className="text-gray-300">Zomato</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-gray-100 font-medium">₹1,000</p>
                  <p className="text-gray-400 text-sm">Oct 21, 2024</p>
                  <p className="text-emerald-400 text-sm">Save ₹300</p>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className="w-12 h-12 relative">
                    <Image
                      src="/images/pdf_image.png"
                      alt="PDF"
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Approved
                  </span>
                </div>
              </div>
            </div>

            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => {}}
            >
              Upload more bills
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  // Recursive component to render nested income/tax information with expandable sections
  // level: determines the indentation and styling
  // isAllExpanded: controls if all sections should be expanded by default
  const IncomeDropdown = ({ data, level = 0, isAllExpanded = false }) => {
    const [isOpen, setIsOpen] = useState(level === 0);
    const [drawerOpen, setDrawerOpen] = useState(false);
  
    useEffect(() => {
      setIsOpen(isAllExpanded);
    }, [isAllExpanded]);
  
    const toggleOpen = () => setIsOpen(!isOpen);
  
    const getBgColor = (level) => {
      switch (level) {
        case 0:
          return 'bg-gray-800';
        case 1:
          return 'bg-gray-800/90';
        case 2:
          return 'bg-gray-800/80';
        default:
          return 'bg-gray-800/70';
      }
    };

    const calculatePercentage = (amount, maxAmount) => {
      if (!amount || !maxAmount) return null;
      return Math.round((amount / maxAmount) * 100);
    };
  
    const handleClick = (componentName) => {
      if (componentName === "Food Allowance") {
        setDrawerOpen(true);
      }
    };
  
    return (
      <>
      <motion.div 
        className={`
          ${level === 0 ? 'mb-4' : 'mb-3'} 
          rounded-xl overflow-hidden
          ${level === 0 ? 'border-2 border-gray-700' : 'border-l-4 border-emerald-500/30'}
          ${getBgColor(level)}
          ${level !== 0 ? 'mx-4' : ''}
          shadow-lg
          transition-all duration-200
          hover:shadow-emerald-500/5
        `}
        initial={false}
      >
        <motion.div
          className={`
            flex items-center ${level < 2 ? 'cursor-pointer' : ''} py-4 px-4
            ${level === 0 ? 'hover:bg-gray-700' : 'hover:bg-gray-700/50'}
            transition-all duration-200 rounded-xl
            border-b border-gray-700/50
            backdrop-blur-sm
          `}
          onClick={level < 2 ? toggleOpen : undefined}
          whileHover={{ scale: level < 2 ? 1.005 : 1 }}
          whileTap={{ scale: level < 2 ? 0.995 : 1 }}
        >
          <div className="flex items-center space-x-2 w-[40%]">
            {level < 2 && (
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronClosedIcon className="h-4 w-4 text-gray-400" />
              </motion.div>
            )}
            {level === 0 ? (
              <div className="flex items-start space-x-3">
                {data.logo && (
                  <div className="w-12 h-12 relative flex-shrink-0 rounded-full overflow-hidden">
                    <Image 
                      src={data.logo} 
                      alt={data.name} 
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-medium text-gray-100">{data.name}</span>
                  {data.type && (
                    <span className="text-sm text-gray-400">{data.type}</span>
                  )}
                  {data.suggestion && (
                    <span className="text-sm text-emerald-400">{data.suggestion}</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className={`font-medium ${level === 0 ? 'text-gray-100' : 'text-gray-300'}`}>
                  {data.name}
                  {data.type && (
                    <span className="text-sm text-gray-400 ml-2">({data.type})</span>
                  )}
                </span>
                {level === 2 && data.recommendation && (
                  <span className="text-sm text-emerald-400 mt-1">{data.recommendation}</span>
                )}
              </div>
            )}
          </div>
          <div className="w-[35%] pl-28">
            {level === 0 && data.utilization && (
              <UtilizationBar percentage={parseFloat(data.utilization)} />
            )}
            {data.maxAmount && (
              <div className="flex items-center space-x-2">
                <div className="bg-gray-700 h-2 rounded-full overflow-hidden w-[180px]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${calculatePercentage(data.amount, data.maxAmount)}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-emerald-500 h-full rounded-full"
                  />
                </div>
                <span className="text-xs text-gray-400 w-10">
                  {calculatePercentage(data.amount, data.maxAmount)}%
                </span>
              </div>
            )}
          </div>
          <div className="w-[25%] text-right">
            <span className={`${level === 0 ? 'text-gray-100' : 'text-gray-300'}`}>
              ₹{data.name === "HRA" ? data.amount?.toLocaleString() : 
                data.amount?.toLocaleString() + (data.maxAmount ? 
                  ` / ${data.maxAmount.toLocaleString()}` : '')}
            </span>
          </div>
        </motion.div>

        {level < 2 && (
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden bg-gray-800/20 p-3"
              >
                <div className={`space-y-3`}>
                  {data.components?.map((component, index) => (
                    <div key={index} className="border border-gray-700/30 rounded-xl hover:border-emerald-500/20 transition-colors duration-200">
                      <IncomeDropdown 
                        data={component} 
                        level={level + 1} 
                        isAllExpanded={isAllExpanded}
                      />
                    </div>
                  ))}
                  {data.subComponents?.map((subComponent, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-700/30 rounded-xl hover:border-emerald-500/20 transition-colors duration-200"
                      onClick={() => handleClick(subComponent.name)}
                    >
                      <IncomeDropdown 
                        data={subComponent} 
                        level={level + 1}
                        isAllExpanded={isAllExpanded}
                      />
                    </div>
                  ))}
                  {data.subSources?.map((subSource, index) => (
                    <div key={index} className="border border-gray-700/30 rounded-xl hover:border-emerald-500/20 transition-colors duration-200">
                      <IncomeDropdown 
                        data={subSource} 
                        level={level + 1}
                        isAllExpanded={isAllExpanded}
                      />
                    </div>
                  ))}
                  {data.recommendation && data.amount > 0 && level !== 2 && data.name !== "Salary" && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-emerald-400 mt-2 ml-7 bg-emerald-500/10 inline-block px-3 py-1 rounded-full"
                    >
                      {data.recommendation}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
      <FoodAllowanceDrawer 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen}
      />
    </>
    );
  };


// Generate mock savings data for the calendar view
const generateSavingsData = (month: Date) => {
  const data = [
    {
      date: 1,
      amount: 139000,
      type: "Income",
      company: "TCS",
      logo: "/images/tcs-logo.png",
      description: "Monthly Salary",
      status: "Received",
      logoSize: "40px",
    },
    {
      date: 4,
      amount: 1000,
      type: "Expense",
      company: "Airtel",
      logo: "/images/airtelLogo.png",
      description: "Mobile Bill",
      status: "Pending",
      savings: 300,
      logoSize: "40px",
    },
    {
      date: 7,
      amount: 4300,
      type: "Investment",
      company: "Acko Insurance",
      logo: "/images/ackoLogo.jpg",
      description: "Insurance Premium",
      status: "Pending",
      savings: 1200,
      logoSize: "40px",
    },
    {
      date: 15,
      amount: 199,
      type: "Subscription",
      company: "Netflix",
      logo: "/images/netflixLogo.png",
      description: "Monthly Subscription",
      status: "Paid",
      logoSize: "40px",
    },
    {
      date: 20,
      amount: 2000,
      type: "Subscription",
      company: "ChatGPT",
      logo: "/images/chatgptLogo.png",
      description: "Annual Subscription",
      status: "Pending",
      logoSize: "40px",
    },
    {
      date: 25,
      amount: 5000,
      type: "Travel",
      company: "MakeMyTrip",
      logo: "/images/makemytripLogo.png",
      description: "Flight Booking",
      status: "Pending",
      savings: 600,
      logoSize: "40px",
    },
    {
      date: 28,
      amount: 1500,
      type: "Food",
      company: "Zomato",
      logo: "/images/zomatoLogo.png",
      description: "Food Delivery",
      status: "Pending",
      savings: 300,
      logoSize: "40px",
    },
  ];
  return data;
};


// Animated background component with floating financial symbols
const FloatingBackground = () => {
    const [elements, setElements] = useState([]);
  
    useEffect(() => {
      const symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '$', '₹', '%', '', '£', '¥', '$', '₹', '%','$', '₹', '%',];
      const newElements = [];
  
      for (let i = 0; i < 60; i++) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const left = `${Math.random() * 100}%`;
        const delay = Math.random() * 20;
        const duration = 15 + Math.random() * 20;
        const fontSize = 14 + Math.random() * 20;
  
        newElements.push(
          <motion.div
            key={i}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ 
              y: '-100vh',
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              left: left,
              fontSize: `${fontSize}px`,
              color: 'rgba(255, 255, 255, 0.5)',
              pointerEvents: 'none',
            }}
          >
            {symbol}
          </motion.div>
        );
      }
  
      setElements(newElements);
    }, []);
  
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {elements}
      </div>
    );
  };


// Generate data for the tax savings graph with actual values
const generateGraphData = (month: Date) => {
  const data = [
    { name: "Apr '24", totalAvailable: 14250, totalUtilised: 7250 },
    { name: "May '24", totalAvailable: 54250, totalUtilised: 41250 },
    { name: "Jun '24", totalAvailable: 34250, totalUtilised: 22250 },
    { name: "Jul '24", totalAvailable: 14250, totalUtilised: 11250 },
    { name: "Aug '24", totalAvailable: 17250, totalUtilised: 12250 },
    { name: "Sep '24", totalAvailable: 14250, totalUtilised: 8250 },
    { name: "Oct '24", totalAvailable: 19250, totalUtilised: 16250 },
    { name: "Nov '24", totalAvailable: 56250, totalUtilised: 40250 },
    { name: "Dec '24", totalAvailable: 28750, totalUtilised: 0 },
    { name: "Jan '25", totalAvailable: 28750, totalUtilised: 0 },
    { name: "Feb '25", totalAvailable: 28750, totalUtilised: 0 },
    { name: "Mar '25", totalAvailable: 28750, totalUtilised: 0 }
  ];

  // Get current month abbreviated
  const currentMonth = format(month, 'MMM');

  // Add a bold property to identify current month
  return data.map(item => ({
    ...item,
    isCurrent: item.name === currentMonth
  }));
};


const incomeSourcesData = [
    {
      name: "Salary",
      company: "Tata Consultancy Services",
      logo: "/images/tcs-logo.png",
      amount: 149708,
      suggestion: "Save ₹12,140 by submitting tax exemptions",
    },
    {
      name: "Business",
      company: "View suggestions for alternate income",
      logo: "/images/ruppee.png",
      amount: 0,
      suggestion: "Make ₹20,000 by offering consulting services",
    },
    {
      name: "Capital Gains",
      company: "View suggestions for withdrawal plan",
      logo: "/images/ruppee.png",
      amount: 0,
      suggestion: "Withdraw funds with low returns at 0% tax",
    },
    {
      name: "Other Sources",
      company: "2 sources",
      logo: "/images/icici-logo.png",
      amount: 430,
      suggestion: "Get ₹500 more with a new savings account",
    },
  ];


// Animation variants for staggered animations using Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function Dashboard() {
  // State management for calendar, graph, and UI interactions
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9, 1));
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [savingsData, setSavingsData] = useState(generateSavingsData(currentMonth));
  const [graphData, setGraphData] = useState(generateGraphData(currentMonth));
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [eventStatus, setEventStatus] = useState({});
  const tooltipRef = useRef(null);
  const [allExpanded, setAllExpanded] = useState(false);
  const [viewMode, setViewMode] = useState('monthly');

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Handle calendar event hover interactions and tooltip positioning
  const handleEventHover = (e, event, date) => {
    // Calculate tooltip position relative to calendar wrapper
    const targetElement = e.currentTarget;
    const rect = targetElement.getBoundingClientRect();
    const calendarWrapper = targetElement.closest('.calendar-wrapper');
    const calendarRect = calendarWrapper.getBoundingClientRect();
  
    setHoveredEvent({
      ...event,
      date,
      position: {
        left: rect.left - calendarRect.left,
        top: rect.bottom - calendarRect.top,
      },
    });
  };
  
  const handleEventLeave = (date) => {
    setTimeout(() => {
      setHoveredEvent((prev) => (prev && prev.date === date ? null : prev));
    }, 3000);
  };

  const handleSubmit = (event) => {
    setEventStatus(prevStatus => ({
      ...prevStatus,
      [event.date]: 'Submitted'
    }));
  };

  const EventTooltip = ({ event }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      className="absolute z-50 bg-gray-800 p-4 rounded-2xl shadow-xl max-w-sm w-64 border border-gray-700"
      style={{
        left: event.position.left,
        top: event.position.top,
      }}
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 relative rounded-lg overflow-hidden">
          <div className="absolute inset-0" />
          <Image 
            src={event.logo} 
            alt={event.company} 
            fill
            sizes="40px"
            className="object-contain relative z-10"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-100">{event.company}</h3>
          <p className="text-sm text-gray-300">{event.description}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-200">Amount: ₹{event.amount.toLocaleString()}</p>
        <p className="text-gray-200">Date: {format(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), event.date), 'MMMM d, yyyy')}</p>
      </div>
      
      {event.type !== 'Income' && (
        <div className="flex flex-col items-center space-y-3">
          {(event.status === 'Pending' && !eventStatus[event.date]) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSubmit(event)}
              className="w-full px-4 py-2.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors font-semibold text-center"
            >
              Submit
            </motion.button>
          )}
          
          {event.savings && (
            <div className="text-emerald-400 font-medium">
              Save ₹{event.savings.toLocaleString()}
            </div>
          )}
          
          <div className="text-gray-400">
            Status: {eventStatus[event.date] || event.status}
          </div>
          
          {eventStatus[event.date] === 'Submitted' && (
            <span className="text-yellow-400">Approval Pending</span>
          )}
        </div>
      )}
    </motion.div>
  );

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleMonthChange = (action: 'prev' | 'next') => {
    const newMonth = action === 'prev' ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    setSavingsData(generateSavingsData(newMonth));
    setGraphData(generateGraphData(newMonth));
  };



  // Render calendar grid with events and hover interactions
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const days = [];
  
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 rounded-2xl bg-gray-800 h-22"></div>);
    }
  
    for (let i = 1; i <= daysInMonth; i++) {
      const event = savingsData.find(e => e.date === i);
      const dayClass = event?.type === 'Income' ? 'bg-gray-700' : (event ? 'bg-emerald-500' : 'bg-gray-700');
      days.push(
        <motion.div
          key={i}
          className={`p-2 rounded-2xl ${dayClass} flex flex-col items-center justify-between cursor-pointer transition-all duration-300 hover:bg-opacity-80 h-22 relative`}
          onMouseEnter={(e) => event && handleEventHover(e, event, i)}
          onMouseLeave={() => handleEventLeave(i)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          ref={(el) => {
            if (el && event) {
              el.dataset.date = i.toString();
            }
          }}
        >
          <span className="text-lg font-bold">{i}</span>
          {event && (
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 relative mx-auto mb-1 rounded-lg overflow-hidden">
                {/* Removed the background div since we want the logo directly on the calendar background */}
                
                <Image 
                  src={event.logo} 
                  alt={event.company} 
                  fill
                  sizes={event.logoSize}
                  className="object-contain relative z-10"
                />
              </div>
              <div className={`text-xs text-center font-bold ${event.status !== 'Received' ? 'text-white' : ''}`}>
              
                {event.status !== 'Received' ? 'Save ' : ''}
                <span>₹{event.amount.toLocaleString()}</span>
              </div>
            </div>
          )}
        </motion.div>
      );
    }
  
    return days;
  };

  // Wrapper component for consistent section styling
  const SectionWrapper = ({ title, children }) => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
    >
      <h2 className="text-2xl font-bold mb-4 text-emerald-400">{title}</h2>
      {children}
    </motion.div>
  );

  return (
    // Main dashboard layout with floating background and content sections
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      {SHOW_FLOATING_BACKGROUND && <FloatingBackground />}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="p-[24px] mx-auto relative"
        style={{ width: '76%', zIndex: 1 }}
      >
        <motion.div 
          variants={itemVariants}
          className="flex justify-between items-center mb-10"
        >
          <div className="w-[20%]" />
          <div className="w-[60%]">
            <Search className="bg-gray-800 text-gray-100" placeholder="Ask AI" />
          </div>
          <div className="w-[20%] flex justify-end">
            <UserNav />
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mb-2 flex items-center justify-between space-y-2 mt-[20px]"
        >
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </motion.div>
        
        <Tabs defaultValue="income" className="space-y-12 py-[0px]">
          <TabsList className="py-[30px] w-full bg-gray-800 border border-gray-700 rounded-2xl">
            {['income', 'expense', 'assets', 'liabilities'].map((tab) => (
              <TabsTrigger 
                key={tab}
                className="px-[100px] py-[15px] data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-xl transition-all duration-300 text-white text-[16px]" 
                value={tab}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="income" className="space-y-8">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
            >
              <motion.div 
                variants={itemVariants}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleMonthChange('prev')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    &lt; Prev
                  </motion.button>
                  <h2 className="text-xl font-semibold text-gray-100">{format(currentMonth, 'MMMM yyyy')}</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleMonthChange('next')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Next &gt;
                  </motion.button>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-emerald-500/20 px-4 py-2 rounded-full backdrop-blur-sm"
                >
                  <span className="text-emerald-400 font-medium">Monthly Savings: ₹10,120</span>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="calendar-wrapper bg-gray-900 rounded-2xl p-4 border border-gray-700 relative mb-16"
              >
                <div className="grid grid-cols-7 gap-2">
                  {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <div key={day} className="text-center font-bold text-gray-400">{day}</div>
                  ))}
                  {renderCalendar()}
                </div>
                <AnimatePresence>
                  {hoveredEvent && (
                    <EventTooltip event={hoveredEvent} />
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="mt-8"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-100">Tax Savings Overview</h3>
                <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700" style={{ height: '400px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={graphData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#9CA3AF"
                        tick={({ x, y, payload }) => (
                          <text
                            x={x}
                            y={y}
                            dy={16}
                            textAnchor="middle"
                            fill="#9CA3AF"
                            style={{
                              fontWeight: payload.value === format(currentMonth, 'MMM') ? 'bold' : 'normal'
                            }}
                          >
                            {payload.value}
                          </text>
                        )}
                      />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '1rem'
                        }}
                        labelStyle={{ color: '#E5E7EB' }}
                        itemStyle={{ color: '#10B981' }}
                      />
                      <Legend 
                        verticalAlign="top" 
                        height={36}
                        wrapperStyle={{
                          paddingBottom: "20px",
                          fontSize: "14px"
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="totalAvailable"
                        stackId="1"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.2}
                        name="Total Available"
                      >
                        <LabelList
                          dataKey="totalAvailable"
                          position="top"
                          content={({ x, y, value }) => (
                            <text
                              x={x}
                              y={y}
                              dy={-4}
                              fill="#10B981"
                              fontSize={12}
                              textAnchor="middle"
                            >
                              ₹{value?.toLocaleString()}
                            </text>
                          )}
                        />
                      </Area>
                      <Area
                        type="monotone"
                        dataKey="totalUtilised"
                        stackId="2"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.2}
                        name="Total Utilised"
                      >
                        <LabelList
                          dataKey="totalUtilised"
                          position="top"
                          content={({ x, y, value }) => (
                            <text
                              x={x}
                              y={y}
                              dy={-4}
                              fill="#3B82F6"
                              fontSize={12}
                              textAnchor="middle"
                            >
                              ₹{value?.toLocaleString()}
                            </text>
                          )}
                        />
                      </Area>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-8">
                <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl font-bold text-gray-100">
                      Total Income
                    </h3>
                    <div className="flex flex-col items-end gap-6">
                      <div className="flex bg-gray-700 rounded-lg p-1">
                        <button
                          onClick={() => setViewMode('monthly')}
                          className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                            viewMode === 'monthly' 
                              ? 'bg-emerald-500 text-white' 
                              : 'text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          Monthly
                        </button>
                        <button
                          onClick={() => setViewMode('annually')}
                          className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                            viewMode === 'annually' 
                              ? 'bg-emerald-500 text-white' 
                              : 'text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          Annually
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setAllExpanded(!allExpanded)}
                          className="text-sm px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300"
                        >
                          {allExpanded ? "Close All" : "Expand All"}
                        </button>
                        <button
                          onClick={() => handleMonthChange('prev')}
                          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                        >
                          <ChevronLeftIcon className="h-5 w-5 text-gray-300" />
                        </button>
                        <span className="px-4 py-2 bg-gray-700 rounded-lg text-gray-100">
                          {format(currentMonth, 'MMM yyyy')}
                        </span>
                        <button
                          onClick={() => handleMonthChange('next')}
                          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                        >
                          <ChevronRightIcon className="h-5 w-5 text-gray-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-100 mb-8">
                    ₹{incomeData.totalIncome.toLocaleString()}
                  </div>
                  <div className="space-y-2">
                    <ColumnHeaders />
                    {incomeData.entities.map((entity, index) => (
                      <IncomeDropdown 
                        key={index} 
                        data={entity} 
                        isAllExpanded={allExpanded}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="expense" className="space-y-4">
            <ExpenseSection />
          </TabsContent>

          <TabsContent value="assets" className="space-y-4">
            <AssetsSection />
          </TabsContent>

          <TabsContent value="liabilities" className="space-y-4">
            <LiabilitiesSection />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
