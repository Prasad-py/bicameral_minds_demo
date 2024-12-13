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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from 'recharts';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronRightIcon as ChevronClosedIcon } from '@heroicons/react/solid';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

// Animation variants
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

// Generate mock savings data for the calendar view
const generateSavingsData = (month: Date) => {
  const data = [
    {
      date: 1,
      amount: 28000,
      type: "Expense",
      company: "Rented House",
      logo: "/images/hraLogo.png",
      description: "Monthly Rent",
      status: "Paid",
      recurring: true
    },
    {
      date: 5,
      amount: 199,
      type: "Expense",
      company: "Netflix",
      logo: "/images/netflixLogo.png",
      description: "Monthly Subscription",
      status: "Paid",
      recurring: true
    },
    {
      date: 10,
      amount: 2000,
      type: "Expense",
      company: "ChatGPT",
      logo: "/images/chatgptLogo.png",
      description: "Annual Subscription",
      status: "Paid",
      recurring: false
    },
    {
      date: 15,
      amount: 500,
      type: "Expense",
      company: "Swiggy",
      logo: "/images/swiggyLogo.png",
      description: "Food Delivery",
      status: "Paid",
      recurring: false
    },
    {
      date: 20,
      amount: 600,
      type: "Expense",
      company: "Zomato",
      logo: "/images/zomatoLogo.png",
      description: "Food Delivery",
      status: "Paid",
      recurring: false
    },
    {
      date: 25,
      amount: 149,
      type: "Expense",
      company: "Twitter",
      logo: "/images/twitterLogo.png",
      description: "Monthly Subscription",
      status: "Paid",
      recurring: true
    },
    {
      date: 28,
      amount: 119,
      type: "Expense",
      company: "Spotify",
      logo: "/images/spotifyLogo.png",
      description: "Monthly Subscription",
      status: "Paid",
      recurring: true
    },
  ];
  return data;
};

// Generate data for the expense graph with actual values
const generateGraphData = (month: Date) => {
  const data = [
    { name: "Apr '24", nonEssential: 40000, total: 110000 },
    { name: "May '24", nonEssential: 57000, total: 132000 },
    { name: "Jun '24", nonEssential: 23000, total: 104000 },
    { name: "Jul '24", nonEssential: 14000, total: 97000 },
    { name: "Aug '24", nonEssential: 21000, total: 96000 },
    { name: "Sep '24", nonEssential: 18000, total: 95000 },
    { name: "Oct '24", nonEssential: 17000, total: 95000 },
    { name: "Nov '24", nonEssential: 25000, total: 110000 },
    { name: "Dec '24", nonEssential: 0, total: 80000 },
    { name: "Jan '25", nonEssential: 0, total: 80000 },
    { name: "Feb '25", nonEssential: 0, total: 80000 },
    { name: "Mar '25", nonEssential: 0, total: 80000 }
  ];

  // Get current month abbreviated
  const currentMonth = format(month, 'MMM');

  // Add a bold property to identify current month
  return data.map(item => ({
    ...item,
    isCurrent: item.name === currentMonth
  }));
};

// Expense data structure
const expenseData = {
  totalExpense: 98002,
  entities: [
    {
      name: "Body & health",
      amount: 7602,
      percentage: "7.8%",
      components: [
        {
          name: "Cooking & Nutrition",
          amount: 3802,
          percentage: "3.9%",
          subComponents: [
            {
              name: "Drinking Water",
              amount: 399,
              percentage: "0.4%",
              description1: "Bisleri",
              description2: "3 transactions"
            },
            {
              name: "Cooking Gas",
              amount: 403,
              percentage: "0.4%",
              description1: "Indane",
              description2: "1 transaction"
            },
            {
              name: "Online Groceries",
              amount: 1500,
              percentage: "1.5%",
              description1: "Blinkit",
              description2: "5 transactions"
            },
            {
              name: "Online Groceries",
              amount: 1000,
              percentage: "1.0%",
              description1: "Zepto",
              description2: "3 transactions"
            },
            {
              name: "Offline Groceries",
              amount: 500,
              percentage: "0.5%",
              description1: "D-Mart",
              description2: "2 transactions"
            }
          ]
        },
        {
          name: "Prepared Food",
          amount: 2500,
          percentage: "2.6%",
          subComponents: [
            {
              name: "Food Delivery",
              amount: 1200,
              percentage: "1.2%",
              description1: "Zomato",
              description2: "4 transactions"
            },
            {
              name: "Food Delivery",
              amount: 800,
              percentage: "0.8%",
              description1: "Swiggy",
              description2: "4 transactions"
            },
            {
              name: "Restaurant",
              amount: 500,
              percentage: "0.5%",
              description1: "KFC",
              description2: "1 transaction"
            }
          ]
        },
        {
          name: "Healthcare",
          amount: 1300,
          percentage: "1.3%",
          subComponents: [
            {
              name: "Medicine",
              amount: 500,
              percentage: "0.5%",
              description1: "Apollo Pharmacy",
              description2: "2 transactions"
            },
            {
              name: "Doctor",
              amount: 800,
              percentage: "0.8%",
              description1: "Manipal Hospital",
              description2: "1 transaction"
            }
          ]
        }
      ]
    },
    {
      name: "Shelter & living",
      amount: 34000,
      percentage: "34.7%"
    },
    {
      name: "Appearance & grooming",
      amount: 2000,
      percentage: "2.0%"
    },
    {
      name: "People & community",
      amount: 10000,
      percentage: "10.2%"
    },
    {
      name: "Learning & growth",
      amount: 3000,
      percentage: "3.1%"
    },
    {
      name: "Mobility",
      amount: 4900,
      percentage: "5.0%"
    },
    {
      name: "Connectivity & digital",
      amount: 3500,
      percentage: "3.6%"
    },
    {
      name: "Rest & recreation",
      amount: 3000,
      percentage: "3.1%"
    },
    {
      name: "Finances",
      amount: 30000,
      percentage: "30.6%"
    }
  ]
};

// Component to display column headers for the expense breakdown table
const ColumnHeaders = () => (
  <div className="grid grid-cols-3 gap-4 text-base font-semibold text-gray-400 mb-4 px-4">
    <div>Details</div>
    <div className="text-center">% Contribution</div>
    <div className="text-right">Amount</div>
  </div>
);

// Add the UtilizationBar component
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

// Add emoji mapping
const categoryEmojis = {
  'Body & health': '💪',
  'Cooking & Nutrition': '🥗',
  'Drinking Water': '💧',
  'Cooking Gas': '🔥',
  'Online Groceries': '🛒',
  'Offline Groceries': '🏪',
  'Prepared Food': '🍽️',
  'Food Delivery': '🛵',
  'Restaurant': '🍴',
  'Healthcare': '⚕️',
  'Medicine': '💊',
  'Doctor': '👨‍⚕️',
  'Treadmill': '🏃',
  'Shelter & living': '🏠',
  'Appearance & grooming': '💇',
  'People & community': '👥',
  'Learning & growth': '📚',
  'Mobility': '🚗',
  'Connectivity & digital': '📱',
  'Rest & recreation': '🎮',
  'Finances': '💰'
};

// Add this interface for the drawer props
interface DrinkingWaterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Add the drawer component
const DrinkingWaterDrawer = ({ open, onOpenChange }: DrinkingWaterDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right"
        className="w-[40vw] max-w-[40vw] sm:max-w-[40vw] bg-gray-800 border-l border-gray-700 overflow-y-auto"
        style={{ width: '40vw' }}
      >
        <SheetHeader className="border-b border-gray-700 pb-4">
          <SheetTitle className="text-2xl font-bold text-gray-100">
            Drinking water
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6 pb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total lifetime spends</span>
              <span className="text-gray-100">₹36,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total spends in current month</span>
              <span className="text-gray-100">₹400</span>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-gray-100 mb-4">You can reduce your drinking water expenses by taking Bisleri subscription</h3>
            <div className="bg-gray-700/50 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 relative">
                  <Image
                    src="/images/bisleri.png"
                    alt="Bisleri"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-gray-100 font-medium">Bisleri subscription</p>
                  <p className="text-gray-300">10% off</p>
                </div>
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600">
                Avail 10% off
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-gray-100 mb-4">You can avail alternate options for drinking water</h3>
            <div className="bg-gray-700/50 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-white p-1">
                  <Image
                    src="/images/livpure.png"
                    alt="Livpure"
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-gray-100 font-medium">Livpure subscription</p>
                  <p className="text-gray-300">Save 400 per month</p>
                </div>
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600">
                Save 400 monthly
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Oct 2024</h3>
            {[
              { date: "Oct 21, 2024", amount: 150 },
              { date: "Oct 11, 2024", amount: 150 },
              { date: "Oct 1, 2024", amount: 100 }
            ].map((transaction, index) => (
              <div key={index} className="bg-gray-700/50 p-4 rounded-lg flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-white p-1">
                    <Image
                      src="/images/bisleri.png"
                      alt="Bisleri"
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="text-gray-100 font-medium">Water cans</p>
                    <p className="text-gray-300">Bisleri</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-100">₹{transaction.amount}</p>
                  <p className="text-gray-400 text-sm">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Recursive component to render nested expense information with expandable sections
const ExpenseDropdown = ({ data, level = 0, isAllExpanded = false }) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isAllExpanded);
  }, [isAllExpanded]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const getBgColor = (level) => {
    switch (level) {
      case 0: return 'bg-gray-800';
      case 1: return 'bg-gray-800/90';
      case 2: return 'bg-gray-800/80';
      default: return 'bg-gray-800/70';
    }
  };

  const renderHeaderWithDescription = (name, desc1, desc2) => (
    <div className="flex-1">
      <div className="flex items-center space-x-2">
        {level < 2 && (
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronClosedIcon className="h-4 w-4 text-gray-400" />
          </motion.div>
        )}
        <div className="flex-1">
          <div className="flex items-center">
            {categoryEmojis[name] && (
              <span className="mr-2">{categoryEmojis[name]}</span>
            )}
            <span className={`font-medium ${level === 0 ? 'text-gray-100' : 'text-gray-300'}`}>
              {name}
            </span>
          </div>
          {(desc1 || desc2) && (
            <div className="text-sm text-gray-400 mt-0.5 ml-6">
              {desc1 && <div className="leading-tight">{desc1}</div>}
              {desc2 && <div className="leading-tight">{desc2}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const handleClick = (componentName) => {
    if (componentName === "Drinking Water") {
      setDrawerOpen(true);
    }
  };

  return (
    <>
      <motion.div 
        className={`
          ${level === 0 ? 'mb-2' : 'mb-2'} 
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
            flex items-center ${level < 2 ? 'cursor-pointer' : ''} py-2.5 px-4
            ${level === 0 ? 'hover:bg-gray-700' : 'hover:bg-gray-700/50'}
            transition-all duration-200 rounded-xl
            border-b border-gray-700/50
            backdrop-blur-sm
          `}
          onClick={() => {
            if (level < 2) {
              toggleOpen();
            } else {
              handleClick(data.name);
            }
          }}
          whileHover={{ scale: level < 2 ? 1.005 : 1 }}
          whileTap={{ scale: level < 2 ? 0.995 : 1 }}
        >
          <div className="grid grid-cols-3 gap-4 w-full items-start">
            {renderHeaderWithDescription(data.name, data.description1, data.description2)}
            <div className="text-center">
              {data.percentage ? (
                <UtilizationBar percentage={parseFloat(data.percentage)} />
              ) : (
                <span className="text-gray-300">-</span>
              )}
            </div>
            <span className={`${level === 0 ? 'text-gray-100' : 'text-gray-300'} text-right`}>
              {data.amount?.toLocaleString()}
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
                className="overflow-hidden bg-gray-800/20 p-2"
              >
                <div className={`space-y-2`}>
                  {data.components?.map((component, index) => (
                    <div key={index} className="border border-gray-700/30 rounded-xl hover:border-emerald-500/20 transition-colors duration-200">
                      <ExpenseDropdown 
                        data={component} 
                        level={level + 1} 
                        isAllExpanded={isAllExpanded}
                      />
                    </div>
                  ))}
                  {data.subComponents?.map((subComponent, index) => (
                    <div key={index} className="border border-gray-700/30 rounded-xl hover:border-emerald-500/20 transition-colors duration-200">
                      <ExpenseDropdown 
                        data={subComponent} 
                        level={level + 1}
                        isAllExpanded={isAllExpanded}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
      <DrinkingWaterDrawer 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen}
      />
    </>
  );
};

export default function ExpenseSection() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9, 1));
  const [savingsData, setSavingsData] = useState(generateSavingsData(currentMonth));
  const [graphData, setGraphData] = useState(generateGraphData(currentMonth));
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [eventStatus, setEventStatus] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);
  const [viewMode, setViewMode] = useState('monthly');

  const handleMonthChange = (action: 'prev' | 'next') => {
    const newMonth = action === 'prev' ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    setSavingsData(generateSavingsData(newMonth));
    setGraphData(generateGraphData(newMonth));
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleEventHover = (e, event, date) => {
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
      
      {event.recurring && (
        <div className="text-sm text-gray-400 mb-4">
          Recurring payment
        </div>
      )}
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full px-4 py-2.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors font-semibold text-center"
      >
        Pay now
      </motion.button>
    </motion.div>
  );

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const days = [];
  
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 rounded-2xl bg-gray-800 h-22"></div>);
    }
  
    for (let i = 1; i <= daysInMonth; i++) {
      const event = savingsData.find(e => e.date === i);
      const dayClass = event ? 'bg-emerald-500' : 'bg-gray-700';
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
                <Image 
                  src={event.logo} 
                  alt={event.company} 
                  fill
                  sizes="40px"
                  className="object-contain relative z-10"
                />
              </div>
              <span className="text-xs text-center font-bold">
                ₹{event.amount.toLocaleString()}
              </span>
            </div>
          )}
        </motion.div>
      );
    }
  
    return days;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 text-gray-100"
    >
      <motion.div variants={itemVariants} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
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
          <Select>
            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-gray-100">
              <SelectValue placeholder="October 2024" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectGroup>
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                  <SelectItem key={month} value={month} className="text-gray-100">{month}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="calendar-wrapper bg-gray-900 rounded-2xl p-4 border border-gray-700 relative mb-16">
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
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">Expense Overview</h3>
          <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700" style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={graphData}
                margin={{ top: 10, right: 30, left: 50, bottom: 0 }}
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
                <YAxis 
                  stroke="#9CA3AF"
                  tickFormatter={(value) => `₹${(value/1000)}k`}
                  width={10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '1rem'
                  }}
                  labelStyle={{ color: '#E5E7EB' }}
                  itemStyle={{ color: '#10B981' }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, undefined]}
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
                  dataKey="nonEssential"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.2}
                  name="Non-essential Expenses"
                >
                  <LabelList
                    dataKey="nonEssential"
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
                  dataKey="total"
                  stackId="2"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.2}
                  name="Total Expenses"
                >
                  <LabelList
                    dataKey="total"
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
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl font-bold text-gray-100">
            Total Expense
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
          ₹{expenseData.totalExpense.toLocaleString()}
        </div>
        <div className="space-y-2">
          <ColumnHeaders />
          {expenseData.entities.map((entity, index) => (
            <ExpenseDropdown 
              key={index} 
              data={entity} 
              isAllExpanded={allExpanded}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}