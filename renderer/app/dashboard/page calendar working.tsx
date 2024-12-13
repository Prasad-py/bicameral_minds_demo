"use client";
import React, { useState, useRef } from "react";
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
} from 'recharts';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ExpenseSection from '@/app/dashboard/components/expense';
import AssetsSection from '@/app/dashboard/components/assets';
import LiabilitiesSection from '@/app/dashboard/components/liabilities';

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
    },
    {
      date: 4,
      amount: 1000,
      type: "Expense",
      company: "Airtel",
      logo: "/images/airtel-logo.png",
      description: "Mobile Bill",
      status: "Pending",
      savings: 300,
    },
    {
      date: 7,
      amount: 4300,
      type: "Investment",
      company: "Acko Insurance",
      logo: "/images/acko-insurance-logo.png",
      description: "Insurance Premium",
      status: "Pending",
      savings: 1200,
    },
    {
      date: 15,
      amount: 199,
      type: "Subscription",
      company: "Netflix",
      logo: "/images/netflix-logo.png",
      description: "Monthly Subscription",
      status: "Paid",
    },
    {
      date: 20,
      amount: 2000,
      type: "Subscription",
      company: "ChatGPT",
      logo: "/images/chatgpt-logo.png",
      description: "Annual Subscription",
      status: "Pending",
    },
    {
      date: 25,
      amount: 5000,
      type: "Travel",
      company: "MakeMyTrip",
      logo: "/images/makemytrip.png",
      description: "Flight Booking",
      status: "Pending",
      savings: 600,
    },
    {
      date: 28,
      amount: 1500,
      type: "Food",
      company: "Zomato",
      logo: "/images/zomato.png",
      description: "Food Delivery",
      status: "Pending",
      savings: 300,
    },
  ];
  return data;
};

const generateGraphData = (month: Date) => {
  const data = [];
  for (let i = 0; i < 7; i++) {
    const currentMonth = addMonths(month, -6 + i);
    data.push({
      name: format(currentMonth, "MMMM"),
      utilised: Math.floor(Math.random() * 50000) + 10000,
      total: Math.floor(Math.random() * 30000) + 60000,
    });
  }
  return data;
};

const incomeSourcesData = [
  {
    name: "Tata Consultancy Services",
    logo: "/images/tcs-logo.png",
    amount: 139000,
    date: "Oct 1, 2024",
    savings: "Save ₹12,140 by submitting tax exemptions",
    verified: true,
  },
  {
    name: "Business",
    logo: "/images/business-logo.png",
    suggestion: "View suggestions for alternate income",
    potential: "Make ₹20,000 by offering consulting services",
  },
  {
    name: "Capital Gains",
    logo: "/images/dsp-logo.png",
    tax: "0%",
    suggestion: "Take ₹1,00,000 from funds with bleak future",
  },
  {
    name: "Other Sources",
    logo: "/images/icici-logo.png",
    type: "Interest from ICICI Savings account",
    potential: "Get ₹500 more with high interest savings account",
    verified: true,
  },
];

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
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9, 1));
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [savingsData, setSavingsData] = useState(generateSavingsData(currentMonth));
  const [graphData, setGraphData] = useState(generateGraphData(currentMonth));
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [eventStatus, setEventStatus] = useState({});
  const tooltipRef = useRef(null);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleMonthChange = (action: 'prev' | 'next') => {
    const newMonth = action === 'prev' ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    setSavingsData(generateSavingsData(newMonth));
    setGraphData(generateGraphData(newMonth));
  };

  const handleEventHover = (e, event) => {
    setHoveredEvent(event);
    if (tooltipRef.current) {
      const rect = e.target.getBoundingClientRect();
      tooltipRef.current.style.left = `${rect.right + 10}px`;
      tooltipRef.current.style.top = `${rect.top}px`;
    }
  };

  const handleSubmit = (event) => {
    setEventStatus(prevStatus => ({
      ...prevStatus,
      [event.date]: 'Submitted'
    }));
  };

  const EventTooltip = ({ event }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute z-50 bg-gray-800 p-4 rounded-2xl shadow-xl max-w-sm w-full border border-gray-700"
    >
      <div className="flex items-center mb-4">
        <Image src={event.logo} alt={event.company} width={40} height={40} className="mr-4 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold text-gray-100">{event.company}</h3>
          <p className="text-sm text-gray-300">{event.description}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-200">Amount: ₹{event.amount.toLocaleString()}</p>
        <p className="text-gray-200">Date: {format(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), event.date), 'MMMM d, yyyy')}</p>
        {event.savings && (
          <p className="text-emerald-400">Save ₹{event.savings.toLocaleString()}</p>
        )}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-200">Status: {eventStatus[event.date] || event.status}</p>
        {(event.status === 'Pending' || !eventStatus[event.date]) && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSubmit(event)}
            className="px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
          >
            Submit
          </motion.button>
        )}
        {eventStatus[event.date] === 'Submitted' && (
          <span className="text-yellow-400">Approval Pending</span>
        )}
      </div>
    </motion.div>
  );

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 rounded-2xl bg-gray-800"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const event = savingsData.find(e => e.date === i);
      const dayClass = event ? 'bg-emerald-500' : 'bg-gray-700';
      days.push(
        <motion.div
          key={i}
          className={`p-2 rounded-2xl ${dayClass} flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-opacity-80`}
          onMouseEnter={(e) => event && handleEventHover(e, event)}
          onMouseLeave={() => setHoveredEvent(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg font-bold">{i}</span>
          {event && (
            <div className="flex flex-col items-center">
              <Image src={event.logo} alt={event.company} width={40} height={40} className="rounded-full" />
              <span className="text-xs mt-1">₹{event.amount.toLocaleString()}</span>
            </div>
          )}
        </motion.div>
      );
    }

    return days;
  };

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
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="p-[24px] px-[80px]"
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
                className="px-[100px] py-[15px] data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-xl transition-all duration-300" 
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
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-bold text-gray-400">{day}</div>
                  ))}
                  {renderCalendar()}
                </div>
                <AnimatePresence>
                  {hoveredEvent && (
                    <div ref={tooltipRef}>
                      <EventTooltip event={hoveredEvent} />
                    </div>
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
                      <XAxis dataKey="name" stroke="#9CA3AF" />
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
                      <Area
                        type="monotone"
                        dataKey="utilised"
                        stackId="1"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.2}
                        name="Utilised"
                      />
                      <Area
                        type="monotone"
                        dataKey="total"
                        stackId="2"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.2}
                        name="Total Possible"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="mt-8"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-100">Income Sources</h3>
                  <Select value={timeFrame} onValueChange={setTimeFrame}>
                    <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-gray-100 rounded-full">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600 rounded-xl">
                      <SelectGroup>
                        <SelectItem value="monthly" className="text-gray-100">Monthly</SelectItem>
                        <SelectItem value="annually" className="text-gray-100">Annually</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {incomeSourcesData.map((source, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-gray-800 p-4 rounded-2xl border border-gray-700 flex items-center justify-between hover:bg-gray-700 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative bg-gray-700 rounded-full p-2">
                          <Image
                            src={source.logo}
                            alt={source.name}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-100">{source.name}</h4>
                            {source.verified && (
                              <svg
                                className="w-4 h-4 text-emerald-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          {source.amount && (
                            <div className="text-lg font-bold mt-1 text-emerald-400">
                              ₹{source.amount.toLocaleString()}
                            </div>
                          )}
                          {source.date && (
                            <div className="text-sm text-gray-400">{source.date}</div>
                          )}
                          {source.savings && (
                            <div className="text-sm text-emerald-400 mt-1">
                              {source.savings}
                            </div>
                          )}
                          {source.suggestion && (
                            <div className="text-sm text-gray-300 mt-1">
                              {source.suggestion}
                            </div>
                          )}
                          {source.potential && (
                            <div className="text-sm text-emerald-400 mt-1">
                              {source.potential}
                            </div>
                          )}
                          {source.tax && (
                            <div className="text-sm text-gray-300 mt-1">
                              Tax - {source.tax}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {source.amount && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full hover:bg-emerald-500/30 transition-colors"
                          >
                            View Details
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
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