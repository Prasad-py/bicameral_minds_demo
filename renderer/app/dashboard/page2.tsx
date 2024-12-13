"use client";
import React, { useState, useRef } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import "react-big-calendar/lib/css/react-big-calendar.css";
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
import ExpenseSection from '@/app/dashboard/components/expense';
import AssetsSection from '@/app/dashboard/components/assets';
import LiabilitiesSection from '@/app/dashboard/components/liabilities';
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
import { motion } from "framer-motion";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const generateSavingsData = (month: Date) => {
  const data = [
    {
      date: format(new Date(month.getFullYear(), month.getMonth(), 1), "yyyy-MM-dd"),
      amount: 139000,
      type: "Income",
      icon: "💼",
      company: "TCS",
      logo: "/images/tcs-logo.png",
      description: "Monthly Salary",
      status: "Received",
    },
    {
      date: format(new Date(month.getFullYear(), month.getMonth(), 4), "yyyy-MM-dd"),
      amount: 1000,
      type: "Expense",
      icon: "📱",
      company: "Airtel",
      logo: "/images/airtel-logo.png",
      description: "Mobile Bill",
      status: "Pending",
      savings: 300,
    },
    {
      date: format(new Date(month.getFullYear(), month.getMonth(), 7), "yyyy-MM-dd"),
      amount: 4300,
      type: "Investment",
      icon: "💰",
      company: "Acko Insurance",
      logo: "/images/acko-insurance-logo.png",
      description: "Insurance Premium",
      status: "Pending",
      savings: 1200,
    },
    {
      date: format(new Date(month.getFullYear(), month.getMonth(), 15), "yyyy-MM-dd"),
      amount: 199,
      type: "Subscription",
      icon: "🎬",
      company: "Netflix",
      logo: "/images/netflix-logo.png",
      description: "Monthly Subscription",
      status: "Paid",
    },
    {
      date: format(new Date(month.getFullYear(), month.getMonth(), 20), "yyyy-MM-dd"),
      amount: 2000,
      type: "Subscription",
      icon: "🤖",
      company: "ChatGPT",
      logo: "/images/chatgpt-logo.png",
      description: "Annual Subscription",
      status: "Pending",
    },
    {
      date: format(new Date(month.getFullYear(), month.getMonth(), 25), "yyyy-MM-dd"),
      amount: 5000,
      type: "Travel",
      icon: "✈️",
      company: "MakeMyTrip",
      logo: "/images/makemytrip.png",
      description: "Flight Booking",
      status: "Pending",
      savings: 600,
    },
    {
      date: format(new Date(month.getFullYear(), month.getMonth(), 28), "yyyy-MM-dd"),
      amount: 1500,
      type: "Food",
      icon: "🍔",
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
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9, 1)); // October 2024
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [savingsData, setSavingsData] = useState(generateSavingsData(currentMonth));
  const [graphData, setGraphData] = useState(generateGraphData(currentMonth));
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [eventStatus, setEventStatus] = useState({});
  const tooltipRef = useRef(null);

  const CustomCalendarEvent = ({ event }) => (
    <div 
      className="flex items-center gap-2 p-2 bg-emerald-500/20 rounded-md backdrop-blur-sm cursor-pointer"
      onMouseEnter={(e) => handleEventHover(e, event)}
      onMouseLeave={() => setHoveredEvent(null)}
    >
      <span>{event.icon}</span>
      <div>
        <div className="font-medium text-emerald-400">₹{event.amount.toLocaleString()}</div>
        <div className="text-sm text-emerald-300">{event.type}</div>
      </div>
    </div>
  );

  const calendarEvents = savingsData.map(saving => ({
    title: saving.type,
    start: new Date(saving.date),
    end: new Date(saving.date),
    icon: saving.icon,
    amount: saving.amount,
    company: saving.company,
    logo: saving.logo,
    description: saving.description,
    status: saving.status,
    savings: saving.savings,
  }));

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
      [event.start]: 'Submitted'
    }));
  };

  const EventTooltip = ({ event }) => (
    <div className="absolute z-50 bg-gray-800 p-4 rounded-lg shadow-xl max-w-sm w-full border border-gray-700">
      <div className="flex items-center mb-4">
        <Image src={event.logo} alt={event.company} width={40} height={40} className="mr-4" />
        <div>
          <h3 className="text-lg font-semibold text-gray-100">{event.company}</h3>
          <p className="text-sm text-gray-300">{event.description}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-200">Amount: ₹{event.amount.toLocaleString()}</p>
        <p className="text-gray-200">Date: {format(event.start, 'MMMM d, yyyy')}</p>
        {event.savings && (
          <p className="text-emerald-400">Save ₹{event.savings.toLocaleString()}</p>
        )}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-200">Status: {eventStatus[event.start] || event.status}</p>
        {(event.status === 'Pending' || !eventStatus[event.start]) && (
          <button
            onClick={() => handleSubmit(event)}
            className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
          >
            Submit
          </button>
        )}
        {eventStatus[event.start] === 'Submitted' && (
          <span className="text-yellow-400">Approval Pending</span>
        )}
      </div>
    </div>
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
          <TabsList className="py-[30px] w-full bg-gray-800 border border-gray-700">
            <TabsTrigger 
              className="px-[100px] py-[15px] data-[state=active]:bg-emerald-500 data-[state=active]:text-white" 
              value="income"
            >
              Income
            </TabsTrigger>
            <TabsTrigger 
              className="px-[100px] py-[15px] data-[state=active]:bg-emerald-500 data-[state=active]:text-white" 
              value="expense"
            >
              Expense
            </TabsTrigger>
            <TabsTrigger 
              className="px-[100px] py-[15px] data-[state=active]:bg-emerald-500 data-[state=active]:text-white" 
              value="assets"
            >
              Assets
            </TabsTrigger>
            <TabsTrigger 
              className="px-[100px] py-[15px] data-[state=active]:bg-emerald-500 data-[state=active]:text-white" 
              value="liabilities"
            >
              Liabilities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="income" className="space-y-8">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <motion.div 
                variants={itemVariants}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center gap-4">
                  <button onClick={() => handleMonthChange('prev')} className="text-gray-400 hover:text-white">
                    &lt; Prev
                  </button>
                  <h2 className="text-xl font-semibold text-gray-100">{format(currentMonth, 'MMMM yyyy')}</h2>
                  <button onClick={() => handleMonthChange('next')} className="text-gray-400 hover:text-white">
                    Next &gt;
                  </button>
                </div>
                <div className="bg-emerald-500/20 px-4 py-2 rounded-md backdrop-blur-sm">
                  <span className="text-emerald-400 font-medium">Monthly Savings: ₹10,120</span>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="calendar-wrapper bg-gray-800 rounded-lg p-4 border border-gray-700 relative"
              >
                <Calendar
                  localizer={localizer}
                  events={calendarEvents}
                  startAccessor="start"
                  endAccessor="end"
                  components={{
                    event: CustomCalendarEvent
                  }}
                  className="custom-calendar"
                  style={{ height: 500 }}
                  date={currentMonth}
                  onNavigate={(date) => setCurrentMonth(date)}
                />
                {hoveredEvent && (
                  <div ref={tooltipRef}>
                    <EventTooltip event={hoveredEvent} />
                  </div>
                )}
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="mt-8"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-100">Tax Savings Overview</h3>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700" style={{ height: '400px' }}>
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
                          borderRadius: '0.5rem'
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
                    <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-gray-100">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
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
                      className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-center justify-between hover:bg-gray-700 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative bg-gray-700 rounded-lg p-2">
                          <Image
                            src={source.logo}
                            alt={source.name}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-md"
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
                          <button className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-md hover:bg-emerald-500/30 transition-colors">
                            View Details
                          </button>
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

      <style jsx global>{`
        .custom-calendar {
          background: #1F2937;
          border-radius: 8px;
          padding: 16px;
          font-family: system-ui, -apple-system, sans-serif;
          color: #E5E7EB;
        }

        .custom-calendar .rbc-header {
          padding: 12px;
          font-weight: 500;
          text-transform: uppercase;
          font-size: 0.875rem;
          color: #9CA3AF;
          border-bottom: 1px solid #374151;
        }

        .custom-calendar .rbc-today {
          background-color: #374151;
        }

        .custom-calendar .rbc-event {
          background: none;
          border: none;
          padding: 0;
        }

        .custom-calendar .rbc-day-bg {
          transition: all 0.2s;
        }

        .custom-calendar .rbc-day-bg:hover {
          background-color: #374151;
        }

        .custom-calendar .rbc-off-range-bg {
          background-color: #111827;
        }

        .custom-calendar .rbc-date-cell {
          padding: 8px;
          font-weight: 500;
          color: #D1D5DB;
        }

        .custom-calendar .rbc-month-view {
          border: 1px solid #374151;
          border-radius: 8px;
        }

        .custom-calendar .rbc-month-row {
          border-top: 1px solid #374151;
        }

        .custom-calendar .rbc-day-bg + .rbc-day-bg {
          border-left: 1px solid #374151;
        }

        .custom-calendar .rbc-toolbar button {
          color: #FFFFFF;
        }

        .custom-calendar .rbc-toolbar button:hover {
          background-color: #374151;
        }

        .custom-calendar .rbc-toolbar button.rbc-active {
          background-color: #4B5563;
        }

        .recharts-default-tooltip {
          background-color: #1F2937 !important;
          border: 1px solid #374151 !important;
          border-radius: 6px;
          padding: 12px !important;
        }

        .recharts-tooltip-label {
          color: #E5E7EB !important;
          margin-bottom: 4px !important;
        }

        .recharts-tooltip-item {
          color: #10B981 !important;
        }

        .recharts-tooltip-cursor {
          fill: rgba(255, 255, 255, 0.1) !important;
        }

        .recharts-cartesian-grid-horizontal line,
        .recharts-cartesian-grid-vertical line {
          stroke: #374151 !important;
        }

        .recharts-xAxis .recharts-cartesian-axis-tick-value,
        .recharts-yAxis .recharts-cartesian-axis-tick-value {
          fill: #9CA3AF;
          font-size: 12px;
        }

        input[type="search"] {
          background-color: #374151;
          color: #FFFFFF;
          border: 1px solid #4B5563;
        }

        input[type="search"]::placeholder {
          color: #9CA3AF;
        }
      `}</style>
    </div>
  );
}