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
import { Progress } from "@/components/ui/progress";
import ExpenseClaimSheet from '@/app/dashboard/components/expenseClaimSheet';

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

export default function ExpenseSection() {
  const [progress, setProgress] = useState(13);
  const [expenseTransactions, setExpenseTransactions] = useState([
    {
      header: "Home",
      subheader: "1 transactions",
      amount: "₹28,000.00",
      missingSaving: "₹2,000.00",
      details: [
        {
          header: "Rent",
          amount: "₹28,000",
          date: "Oct 1, 2024"
        },
      ]
    },
    {
      header: "Food",
      amount: "₹40,300.83",
      subheader: "25 transactions",
      details: [
        {
          header: "Zomato",
          amount: "₹258",
          date: "Oct 1, 2024"
        },
        {
          header: "Swiggy",
          amount: "₹658",
          date: "Oct 2, 2024"
        },
        {
          header: "Truffle",
          amount: "₹1100",
          date: "Oct 3, 2024"
        },
      ]
    },
    {
      header: "Clothing, Grooming & Personal Care",
      amount: "₹10,000.00",
      subheader: "7 transactions",
    },
    {
      header: "Healthcare",
      amount: "₹10,000.00",
      subheader: "7 transactions",
    }
  ]);
  const [suggestions, setSuggestions] = useState([
    [
      {
        status: "pending",
        amount: '₹20,000',
        message: "Save ₹ 20,000 by submitting expenses for tax exemptions",
        cta: "Claim and Save"
      },
      {
        status: "pending",
        amount: '₹5,000',
        message: "Save ₹ 5,000 by cutting back discretionary spends",
        cta: "Claim and Save"
      },
      {
        status: "pending",
        amount: '₹2,000',
        message: "Save ₹ 2,000 on discounts by spending through X credit card",
        cta: "Claim and Save"
      }
    ],
    [
      {
        status: "pending",
        amount: '₹20,000',
        message: "Save ₹ 20,000 by submitting expenses for tax exemptions",
        cta: "Claim and Save"
      },
      {
        status: "completed",
        amount: '₹5,000',
        message: "Save ₹ 5,000 by cutting back discretionary spends",
        cta: "Check Status"
      },
      {
        status: "completed",
        amount: '₹2,000',
        message: "Save ₹ 2,000 on discounts by spending through X credit card",
        cta: "Check Status"
      }
    ]
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className='space-y-4 text-gray-100'
    >
      <div>
        <motion.div variants={itemVariants} className='flex justify-between mb-[40px]'>
          <div className='w-[30%]'></div>
          <div className='w-[40%] flex justify-center'>
            <Select>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-gray-100">
                <SelectValue placeholder="October'24" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectGroup>
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                    <SelectItem key={month} value={month} className="text-gray-100">{month}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='w-[30%] flex justify-end'></div>
        </motion.div>
        <motion.div variants={itemVariants} className='grid gap-4 sm:grid-cols-1 lg:grid-cols-1 mt-[20px]'>
          <Carousel className="w-full">
            <CarouselContent>
              {suggestions.map((suggestionArray, index) => (
                <CarouselItem key={index} className="w-full">
                  <div className='flex justify-between w-full gap-4'>
                    {suggestionArray.map((suggestion, idx) => (
                      <Card key={idx} className={`w-full ${suggestion.status === "pending" ? "bg-gray-800" : "bg-gray-700"} border-gray-600`}>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                          <CardTitle className='text-sm font-medium text-gray-300'>
                            {suggestion.status}
                          </CardTitle>
                          <span>
                            {suggestion.status === "pending" ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" id="warning">
                                <g>
                                  <path fill="#ffd54f" d="M29.764,23.453,18.576,5.52a3.027,3.027,0,0,0-5.146-.009L2.224,23.474A3.027,3.027,0,0,0,4.807,28H27.193A3.028,3.028,0,0,0,29.764,23.453Z"></path>
                                  <path fill="#596c76" d="M15.087,18.624l-.266-3.976c-.052-.8-.325-2.093.286-2.743.465-.5,1.566-.586,1.9.107a4.873,4.873,0,0,1,.182,2.536l-.356,4.093a3.221,3.221,0,0,1-.249,1.12.708.708,0,0,1-1.254.013A3.763,3.763,0,0,1,15.087,18.624Zm.921,5.463a1.24,1.24,0,0,1-.142-2.471A1.24,1.24,0,1,1,16.008,24.087Z"></path>
                                </g>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64" id="tick">
                                <switch>
                                  <g>
                                    <g fill="#0AC5AB">
                                      <path d="M60.433 17.323c-2.391 1.07-4.689 2.487-6.849 4.175A23.908 23.908 0 0 1 56 32c0 13.255-10.745 24-24 24S8 45.255 8 32 18.745 8 32 8c3.822 0 7.433.897 10.64 2.487a53.12 53.12 0 0 1 7.222-5.041A31.852 31.852 0 0 0 32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32a31.86 31.86 0 0 0-3.567-14.677z"></path>
                                      <path d="M29.5 35.721c-2.883-3.493-6.381-6.346-10.691-8.559a3.873 3.873 0 0 0-1.778-.451c-3.431 0-5.699 5.032-2.007 6.928 5.945 3.052 9.706 7.212 12.713 13.141.618 1.22 1.939 1.812 3.261 1.812 1.652 0 3.307-.925 3.594-2.707 2.263-14.068 12.724-28.14 26.38-33.103 4.051-1.473 2.89-7.477-.693-7.477-.404 0-.839.076-1.301.244C45.616 10.404 34.406 22.203 29.5 35.721z"></path>
                                    </g>
                                  </g>
                                </switch>
                              </svg>
                            )}
                          </span>
                        </CardHeader>
                        <CardContent>
                          <div className='flex flex-col justify-between h-[150px]'>
                            <div className='text-2xl font-bold text-emerald-400'>{suggestion.amount}</div>
                            <p className='text-[14px] text-gray-300'>
                              {suggestion.message}
                            </p>
                            <div>
                              <ExpenseClaimSheet btnName={suggestion.cta} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>
        <motion.div variants={itemVariants} className='grid grid-cols-1 gap-4 mt-[20px]'>
          <Card className='col-span-1 lg:col-span-4 bg-gray-800 border-gray-700'>
            <CardHeader>
              <CardTitle className="text-emerald-400">
                Expenses
              </CardTitle>
            </CardHeader>
            <CardContent className='px-[40px] mt-[20px]'>
              <AnimatePresence>
                {expenseTransactions.map((transaction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className='px-[30px] items-center p-4 rounded-[10px] cursor-pointer bg-gray-700 mb-[20px] border-gray-600'>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" className='border-[0px]'>
                          <AccordionTrigger>
                            <div className='flex justify-between w-[95%] items-center'>
                              <div className='w-1/2'>
                                <h1 className='mb-2 text-left font-medium text-[16px] text-gray-100'>
                                  {transaction.header}
                                </h1>
                                <p className='mb-2 text-left font-light text-[14px] text-gray-300'>
                                  {transaction.subheader}
                                </p>
                                {transaction.progressBar && (<Progress value={transaction.progressBar.length} className="w-full" />)}
                              </div>
                              <div className='w-1/2 text-right font-medium text-[16px] text-emerald-400'>
                                <span>{transaction.amount}</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <div className='w-full px-[20px]'>
                            <AccordionContent>
                              {transaction.details && transaction.details.map((dt, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className='flex justify-between px-[30px] items-center p-4 bg-gray-600 rounded-[10px] mt-[20px]'
                                >
                                  <div className='w-1/2'>
                                    <h1 className='mb-2 text-gray-100'>
                                      {dt.header}
                                    </h1>
                                    {dt.progressBar && (<Progress value={dt.progressBar.length} className="w-full" />)}
                                  </div>
                                  <div className='w-1/2 text-right text-emerald-400'>{dt.amount}</div>
                                </motion.div>
                              ))}
                            </AccordionContent>
                          </div>
                        </AccordionItem>
                      </Accordion>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}