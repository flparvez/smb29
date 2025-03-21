"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowBigRight } from 'lucide-react';
import Link from "next/link";


const Deposits = () => {
    const [deposit, setDeposit] = useState("");
    const [withdraw, setWithdraw] = useState("");
    const { data: session } = useSession();
     // Fetch deposit user data by session ID
     const fetchUserData = useCallback(async () => {
      
 
  
          const { data } = await axios.get(`/api/deposit`);
          if (Array.isArray(data)) {
            setDeposit(data.filter((d) => d?.user?._id === session?.user?.id));
          }

        //   filter deposit data by user id
        


     },[session])
    
      useEffect(() => {
        fetchUserData();
      }, [fetchUserData]);
 
     // Fetch withdraw data  by session ID
     const fetchWithdrawData = useCallback(async () => {
      
 
  
          const { data } = await axios.get(`/api/withdraw`);
        
          if (Array.isArray(data)) {
            setWithdraw(data?.filter((d) => d.user?._id === session?.user?.id));
          }

        //   filter deposit data by user id
        


     },[session])
    
      useEffect(() => {
        fetchWithdrawData();
      }, [fetchWithdrawData]);
 

  return (
<div>


<Link href="/user/dashboard" className="h-14 w-full bg-[#0c0ce8] pl-4 gap-5 shadow text-white flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-7 font-bold cursor-pointer w-7"
      >
        <path
          fillRule="evenodd"
          d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
          clipRule="evenodd"
        ></path>
      </svg>
      <h2 className="text-xl font-bold">Transaction History</h2>
    </Link>
<div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4"> Your Deposits</h1>
    {deposit && deposit.length > 0 ? (
      deposit.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center gap-4"
        >
          {/* Left Side */}
          <div className="flex items-start gap-3">
            {/* Green Arrow Icon */}
            <Link href="/user/dashboard">
              <ArrowBigRight className="text-green-500 w-10 h-10 cursor-pointer" />
            </Link>

            <div>
              {/* Pending/Approved Button */}
              <span
                className={`${
                  item?.approved
                    ? "bg-green-500"
                    : "bg-yellow-500"
                } text-white text-xs px-2 py-1 rounded-md`}
              >
                {item?.approved ? "Approved" : "Pending"}
              </span>

              {/* Transaction ID */}
              <p className="text-gray-500 text-sm mt-2">TRX ID: {item?.trx}</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="text-right">
            {/* Amount */}
            <p className="text-lg font-semibold text-gray-900">{item?.amount} Taka</p>

            {/* Date */}
            <p className="text-gray-500 text-sm">
              {new Date(item?.createdAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No deposit data available.</p>
    )}
  </div>


<div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4"> Your Withdrawal List</h1>
    {withdraw && withdraw.length > 0 ? (
      withdraw.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center gap-4"
        >
          {/* Left Side */}
          <div className="flex items-start gap-3">
            {/* Green Arrow Icon */}
            <Link href="/user/dashboard">
              <ArrowBigRight className="text-green-500 w-10 h-10 cursor-pointer" />
            </Link>

            <div>
              {/* Pending/Approved Button */}
              <span
                className={`${
                  item?.approved
                    ? "bg-green-500"
                    : "bg-yellow-500"
                } text-white text-xs px-2 py-1 rounded-md`}
              >
                {item?.approved ? "Approved" : "Pending"}
              </span>

              {/* Transaction ID */}
              <p className="text-gray-500 text-sm mt-2">Withdrawal Number: {item?.number}</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="text-right">
            {/* Amount */}
            <p className="text-lg font-semibold text-gray-900">{item?.amount} Taka</p>
            <p className="text-lg font-semibold text-gray-900">Method : {item?.pmethod} </p>

            {/* Date */}
            <p className="text-gray-500 text-sm">
              {new Date(item?.createdAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No deposit data available.</p>
    )}
  </div>
</div>
   
  ) }


export default Deposits
