"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AssetsGraphs from '@/app/dashboard/components/assetsGraphs';
import { ChevronRightIcon as ChevronClosedIcon } from '@heroicons/react/solid';

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

const assetsData = {
  totalAssets: 3176883,
  entities: [
    {
      name: "Short term liquidity",
      amount: 496893,
      percentage: "15.6%",
      components: [
        {
          name: "Savings accounts",
          amount: 496893,
          percentage: "15.6%",
          description1: ">6 months of expenses in savings accounts",
          description2: "Invest in high interest instruments",
          subComponents: [
            {
              name: "ICICI Bank",
              amount: 355463,
              percentage: "11.2%"
            },
            {
              name: "Axis Bank",
              amount: 128550,
              percentage: "4.0%"
            },
            {
              name: "SBI Bank",
              amount: 12880,
              percentage: "0.4%"
            },
            {
              name: "Utkarsh Small Finance Bank",
              amount: 0,
              percentage: "0%",
              description1: "Recommended due to high interest returns for",
              description2: "savings account",
              ctaText: "Apply"
            }
          ]
        }
      ]
    },
    {
      name: "Long term wealth",
      amount: 2181990,
      percentage: "68.7%",
      components: [
        {
          name: "Equity Investments",
          amount: 1538990,
          percentage: "48.4%",
          subComponents: [
            {
              name: "Axis ELSS",
              amount: 780990,
              percentage: "24.6%",
              description1: "Outperforming market benchmark with good",
              description2: "future"
            },
            {
              name: "UTI Nifty Next 50 Index Fund",
              amount: 445000,
              percentage: "14.0%"
            },
            {
              name: "ICICI Prudential Bluechip Fund",
              amount: 235000,
              percentage: "7.4%",
              description1: "Funds you should avoid"
            },
            {
              name: "Mirae Asset Large Cap Fund",
              amount: 78000,
              percentage: "2.5%",
              description1: "12k in missed gains since this fund",
              description2: "underperformed market benchmark"
            }
          ]
        },
        {
          name: "Debt Investments",
          amount: 0,
          percentage: "0%",
          subComponents: [
            {
              name: "Fixed Instrument (5 year)",
              amount: 0,
              description1: "Low risk instrument to diversify risk",
              ctaText: "Recommended"
            }
          ]
        }
      ]
    },
    {
      name: "Assets for Security",
      amount: 50000,
      percentage: "1.6%",
      components: [
        {
          name: "House",
          amount: 10000000,
          description1: "Future goal in 10 years.",
          description2: "Not counted in your Current Assets",
          ctaText: "Future Goal",
          isGoal: true,
          subComponents: [
            {
              name: "Option 1 - SIP",
              description1: "✅ Lower cost of purchase",
              description2: "❌ Waiting period of 10 years",
              ctaText: "Start SIP"
            },
            {
              name: "Option 2 - Loan",
              description1: "✅ Immediate ownership & tax benefits",
              description2: "❌ Higher cost of purchase",
              ctaText: "Take Loan"
            }
          ]
        }
      ]
    },
    {
      name: "Family & Receivables",
      amount: 523000,
      percentage: "16.4%",
      components: [
        {
          name: "Family",
          amount: 20000,
          percentage: "0.6%"
        },
        {
          name: "Friends",
          amount: 3000,
          percentage: "0.1%"
        },
        {
          name: "Marriage",
          amount: 500000,
          description1: "Future goal in 2 years",
          ctaText: "Future Goal"
        }
      ]
    },
    {
      name: "Others",
      amount: 425000,
      percentage: "13.4%",
      components: [
        {
          name: "Rental Deposit",
          amount: 125000,
          percentage: "3.9%"
        },
        {
          name: "Vehicle",
          amount: 300000,
          percentage: "9.4%"
        },
        {
          name: "Insurance",
          amount: 0,
          percentage: "0%",
          subComponents: [
            {
              name: "Health",
              amount: 0,
              description1: "50 lacs worth of cover for hospitalization"
            }
          ]
        },
        {
          name: "Vacation",
          amount: 0,
          description1: "Future goal in 1 year",
          ctaText: "Start SIP"
        }
      ]
    }
  ]
};

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

const ColumnHeaders = () => (
  <div className="grid grid-cols-3 gap-4 text-base font-semibold text-gray-400 mb-4 px-4">
    <div>Details</div>
    <div className="text-center">% Contribution</div>
    <div className="text-right">Amount</div>
  </div>
);

const AssetsDropdown = ({ data, level = 0, isAllExpanded = false }) => {
  const [isOpen, setIsOpen] = useState(level === 0);

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
      <div className="flex flex-col">
        <div className="flex items-center">
          {level < 2 && (
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="mr-2"
            >
              <ChevronClosedIcon className="h-4 w-4 text-gray-400" />
            </motion.div>
          )}
          <span className={`font-medium ${level === 0 ? 'text-gray-100' : 'text-gray-300'}`}>
            {name}
          </span>
        </div>
        {(desc1 || desc2) && (
          <div className={`text-sm text-emerald-500 mt-0.5 ${level === 1 ? 'ml-6' : ''}`}>
            {desc1 && <div className="leading-tight">{desc1}</div>}
            {desc2 && <div className="leading-tight">{desc2}</div>}
          </div>
        )}
      </div>
    </div>
  );

  return (
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
        onClick={level < 2 ? toggleOpen : undefined}
        whileHover={{ scale: level < 2 ? 1.005 : 1 }}
        whileTap={{ scale: level < 2 ? 0.995 : 1 }}
      >
        <div className="grid grid-cols-3 gap-4 w-full items-start">
          {renderHeaderWithDescription(data.name, data.description1, data.description2)}
          <div className="text-center">
            {data.percentage && (
              <UtilizationBar percentage={parseFloat(data.percentage)} />
            )}
          </div>
          <div className="flex justify-end items-center space-x-4">
            <span className={`${level === 0 ? 'text-gray-100' : 'text-gray-300'}`}>
              ₹{data.amount?.toLocaleString()}
            </span>
            {data.ctaText && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm"
              >
                {data.ctaText}
              </motion.button>
            )}
          </div>
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
                    <AssetsDropdown 
                      data={component} 
                      level={level + 1} 
                      isAllExpanded={isAllExpanded}
                    />
                  </div>
                ))}
                {data.subComponents?.map((subComponent, index) => (
                  <div key={index} className="border border-gray-700/30 rounded-xl hover:border-emerald-500/20 transition-colors duration-200">
                    <AssetsDropdown 
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
  );
};

export default function AssetsSection() {
  const [allExpanded, setAllExpanded] = useState(false);
  const [viewMode, setViewMode] = useState('monthly');
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9, 1));

  const handleMonthChange = (action: 'prev' | 'next') => {
    const newMonth = action === 'prev' ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className='space-y-4 text-gray-100'
    >
      <motion.div variants={itemVariants} className='grid gap-4 sm:grid-cols-1 lg:grid-cols-1 mt-[20px]'>
        <Carousel className="w-full mb-[40px]">
          <CarouselContent>
            <CarouselItem className="w-full">
              <AssetsGraphs />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-100">
            Total Assets
          </h3>
          <div className="flex items-center gap-4">
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
            <button
              onClick={() => setAllExpanded(!allExpanded)}
              className="text-sm px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300"
            >
              {allExpanded ? "Close All" : "Expand All"}
            </button>
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-100 mb-8">
          ₹{assetsData.totalAssets.toLocaleString()}
        </div>
        <div className="space-y-2">
          <ColumnHeaders />
          {assetsData.entities.map((entity, index) => (
            <AssetsDropdown 
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