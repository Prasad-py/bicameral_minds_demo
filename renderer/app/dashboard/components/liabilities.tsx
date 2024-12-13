"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const liabilitiesData = {
  totalLiabilities: 41630,
  entities: [
    {
      name: "Credit Cards",
      amount: 29630,
      percentage: "71.2%",
      borrowingLimit: 1168000,
      components: [
        {
          name: "ICICI Bank",
          amount: 23450,
          percentage: "56.3%",
          borrowingLimit: 618000,
          ctaText: "Pay Now"
        },
        {
          name: "Axis Bank",
          amount: 4950,
          percentage: "11.9%",
          borrowingLimit: 430000,
          ctaText: "Pay Now"
        },
        {
          name: "SBI Bank",
          amount: 1230,
          percentage: "3.0%",
          borrowingLimit: 120000,
          ctaText: "Pay Now"
        }
      ]
    },
    {
      name: "Loans",
      amount: 0,
      percentage: "0%",
	  borrowingLimit: 13000000,
      components: [
        {
          name: "Home Loan",
          amount: 0,
          percentage: "0%",
          description1: "Own a house with tax benefits",
          borrowingLimit: 10000000,
          ctaText: "Take Loan"
        },
        {
          name: "Personal Loan",
          amount: 0,
          percentage: "0%",
          description1: "You have marriage lined up. Take a loan to have a stress free marriage",
          borrowingLimit: 1000000,
          ctaText: "Take Loan"
        },
        {
          name: "Vehicle Loan",
          amount: 0,
          percentage: "0%",
          description1: "Your current car is >15 yrs old. Take a car loan to buy a new car",
          borrowingLimit: 2000000,
          ctaText: "Take Loan"
        }
      ]
    },
    {
      name: "Payables",
      amount: 12000,
      percentage: "28.8%",
      components: [
        {
          name: "Family",
          amount: 10000,
          percentage: "24.0%",
          description1: "Relative Marriage"
        },
        {
          name: "Friends",
          amount: 2000,
          percentage: "4.8%",
          description1: "Friend Group 2"
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
  <div className="grid grid-cols-4 gap-4 text-base font-semibold text-gray-400 mb-4 px-4">
    <div>Details</div>
    <div className="text-center">% Utilization</div>
    <div className="text-right">Limit</div>
    <div className="text-right">Amount</div>
  </div>
);

const LiabilitiesDropdown = ({ data, level = 0, isAllExpanded = false }) => {
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

  // Add this helper function to check if item has nested components
  const hasNestedComponents = (data) => {
    return (data.components?.length > 0 || data.subComponents?.length > 0);
  };

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
          flex items-center ${level < 2 && hasNestedComponents(data) ? 'cursor-pointer' : ''} py-4 px-4
          ${level === 0 ? 'hover:bg-gray-700' : 'hover:bg-gray-700/50'}
          transition-all duration-200 rounded-xl
          border-b border-gray-700/50
          backdrop-blur-sm
        `}
        onClick={level < 2 && hasNestedComponents(data) ? toggleOpen : undefined}
        whileHover={{ scale: level < 2 && hasNestedComponents(data) ? 1.005 : 1 }}
        whileTap={{ scale: level < 2 && hasNestedComponents(data) ? 0.995 : 1 }}
      >
        <div className="grid grid-cols-4 gap-4 w-full items-center">
          <div className="flex items-center space-x-2">
            {level < 2 && hasNestedComponents(data) && (
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronClosedIcon className="h-4 w-4 text-gray-400" />
              </motion.div>
            )}
            <div className="flex flex-col">
              <span className={`font-medium ${level === 0 ? 'text-gray-100' : 'text-gray-300'}`}>
                {data.name}
              </span>
              {data.description1 && (
                <span className="text-sm text-emerald-400">{data.description1}</span>
              )}
            </div>
          </div>
          <div className="text-center">
            {data.percentage && (
              <div className="w-36 mx-auto">
                <UtilizationBar percentage={parseFloat(data.percentage)} />
              </div>
            )}
          </div>
          <div className="text-right text-gray-300">
            {data.borrowingLimit ? `₹${data.borrowingLimit?.toLocaleString()}` : '-'}
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

      {level < 2 && hasNestedComponents(data) && (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden bg-gray-800/20 p-3"
            >
              <div className="space-y-3">
                {data.components?.map((component, index) => (
                  <div key={index} className="border border-gray-700/30 rounded-xl hover:border-emerald-500/20 transition-colors duration-200">
                    <LiabilitiesDropdown 
                      data={component} 
                      level={level + 1} 
                      isAllExpanded={isAllExpanded}
                    />
                  </div>
                ))}
                {data.subComponents?.map((subComponent, index) => (
                  <div key={index} className="border border-gray-700/30 rounded-xl hover:border-emerald-500/20 transition-colors duration-200">
                    <LiabilitiesDropdown 
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

export default function LiabilitiesSection() {
  const [allExpanded, setAllExpanded] = useState(false);
  const [viewMode, setViewMode] = useState('monthly');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className='space-y-4 text-gray-100'
    >
      <motion.div variants={itemVariants} className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-100">
            Total Liabilities
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
          ₹{liabilitiesData.totalLiabilities.toLocaleString()}
        </div>
        <div className="space-y-2">
          <ColumnHeaders />
          {liabilitiesData.entities.map((entity, index) => (
            <LiabilitiesDropdown 
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